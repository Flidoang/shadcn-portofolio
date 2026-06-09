export interface GitLabContributionDay {
  date: string;
  count: number;
  intensity: number;
}

export interface GitLabProfile {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
  web_url: string;
}

export interface GitLabContributionsResponse {
  profile: GitLabProfile;
  totalCommits: number;
  maxStreak: number;
  contributions: GitLabContributionDay[];
}

/**
 * Robust fetch helper that attempts multiple CORS proxies sequentially.
 */
async function fetchWithCorsProxy(targetUrl: string): Promise<any> {
  const proxies = [
    // `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`
  ];

  let lastError: any = null;
  for (const proxyUrl of proxies) {
    try {
      console.log(`Attempting fetch via proxy: ${proxyUrl}`);
      const res = await fetch(proxyUrl);
      if (res.ok) {
        return await res.json();
      }
      console.warn(`Proxy returned status ${res.status}: ${proxyUrl}`);
    } catch (err) {
      lastError = err;
      console.warn(`Proxy failed to fetch: ${proxyUrl}`, err);
    }
  }

  // Final fallback directly to the source (might encounter CORS but acts as final effort)
  try {
    const directRes = await fetch(targetUrl);
    if (directRes.ok) {
      return await directRes.json();
    }
  } catch (err) {
    lastError = err;
  }

  throw lastError || new Error("All CORS proxies failed to fetch target resource");
}

/**
 * Fetches the user's GitLab profile to get basic details.
 */
async function fetchProfile(username: string, token?: string): Promise<GitLabProfile> {
  let searchUrl = `https://gitlab.com/api/v4/users?username=${username}`;
  // Only append token if it is set and is NOT the placeholder string from .env.example
  if (token && token.trim() !== "" && !token.includes("IsiTokenGitLabAndaDisini")) {
    searchUrl += `&private_token=${token}`;
  }

  const users = await fetchWithCorsProxy(searchUrl);
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error(`GitLab user "${username}" not found`);
  }

  const user = users[0];
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar_url: user.avatar_url,
    web_url: user.web_url,
  };
}

/**
 * Fetches user contribution data from the GitLab Events API (which supports private_token auth)
 * and parses it into a standard contribution days array.
 */
export async function fetchGitLabContributions(username: string, token?: string): Promise<GitLabContributionsResponse> {
  try {
    // Only proceed if the token is not the placeholder
    const cleanToken = (token && token.includes("IsiTokenGitLabAndaDisini")) ? undefined : token;

    // 1. Fetch GitLab profile (to obtain user id)
    const profile = await fetchProfile(username, cleanToken);

    // 2. Fetch GitLab Events in parallel (supports token auth for private repository events)
    const afterDate = new Date();
    afterDate.setDate(afterDate.getDate() - 300);
    const afterDateStr = afterDate.toISOString().split("T")[0];

    const pagePromises = [];
    const maxPages = 4; // Fetch up to 400 events in parallel to fill the 300-day calendar window

    for (let page = 1; page <= maxPages; page++) {
      let eventsUrl = `https://gitlab.com/api/v4/users/${profile.id}/events?per_page=100&page=${page}&after=${afterDateStr}`;
      if (cleanToken) {
        eventsUrl += `&private_token=${cleanToken}`;
      }
      pagePromises.push(fetchWithCorsProxy(eventsUrl).catch(err => {
        console.warn(`Failed to fetch page ${page} of GitLab events`, err);
        return [];
      }));
    }

    const pagesResults = await Promise.all(pagePromises);
    const events = pagesResults.flat();

    // Parse the date mappings from events (e.g. {"2026-06-08": 5})
    const calendarData: { [date: string]: number } = {};
    let totalCommits = 0;

    if (Array.isArray(events)) {
      events.forEach((event: any) => {
        if (event && event.created_at) {
          const dateStr = event.created_at.split("T")[0];
          // Count commits if pushed, otherwise count as 1 contribution event
          const count = (event.push_data && event.push_data.commit_count)
            ? event.push_data.commit_count
            : 1;
          calendarData[dateStr] = (calendarData[dateStr] || 0) + count;
          totalCommits += count;
        }
      });
    }

    const contributions: GitLabContributionDay[] = [];
    const today = new Date();

    let maxStreak = 0;
    let currentStreak = 0;

    // Build the list of contributions for the last 300 days
    for (let i = 299; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = calendarData[dateStr] || 0;

      let intensity = 0;
      if (count > 0) {
        currentStreak += 1;
        if (currentStreak > maxStreak) maxStreak = currentStreak;

        if (count === 1) intensity = 1;
        else if (count <= 3) intensity = 2;
        else if (count <= 6) intensity = 3;
        else intensity = 4;
      } else {
        currentStreak = 0;
      }

      contributions.push({
        date: dateStr,
        count,
        intensity
      });
    }

    // If there were no events fetched (e.g., profile has no recent activity),
    // fall back to mock data
    if (totalCommits === 0) {
      console.log("No GitLab events found, returning mock calendar fallback...");
      return getMockGitLabCalendar(username, profile);
    }

    return {
      profile,
      totalCommits,
      maxStreak,
      contributions
    };
  } catch (error) {
    console.warn("Failed to fetch live GitLab calendar, returning mock fallback:", error);
    return getMockGitLabCalendar(username);
  }
}

/**
 * Returns mock calendar data when GitLab profile has no public contributions or is private
 */
function getMockGitLabCalendar(username: string, preFetchedProfile?: GitLabProfile): GitLabContributionsResponse {
  const profile = preFetchedProfile || {
    id: 1234567,
    username: username,
    name: "Rafli Hendarsyah",
    avatar_url: "https://secure.gravatar.com/avatar/793aced582fcd72f256f82c35e17c750ab4a970c852efa782e5fbd245a2f8f77?s=80&d=identicon",
    web_url: `https://gitlab.com/${username}`,
  };

  const contributions: GitLabContributionDay[] = [];
  const today = new Date();

  let totalCommits = 0;
  let currentStreak = 0;
  let maxStreak = 0;

  for (let i = 299; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const rand = Math.random();
    let intensity = 0;
    let count = 0;
    if (rand > 0.65) {
      count = Math.floor(Math.random() * 8) + 1;
      totalCommits += count;
      currentStreak += 1;
      if (currentStreak > maxStreak) maxStreak = currentStreak;

      if (count === 1) intensity = 1;
      else if (count <= 3) intensity = 2;
      else if (count <= 6) intensity = 3;
      else intensity = 4;
    } else {
      currentStreak = 0;
    }

    contributions.push({
      date: dateStr,
      count,
      intensity
    });
  }

  return {
    profile,
    totalCommits: totalCommits || 185,
    maxStreak: maxStreak || 8,
    contributions
  };
}
