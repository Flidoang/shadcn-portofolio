export interface GitHubContributionDay {
    date: string;
    count: number;
    color: string;
    intensity: number; // 0 represents no contributions, 1-4 represent contribution levels
}

export interface GitHubContributionsResponse {
    total: {
        [year: string]: number;
        lastYear: number;
    };
    contributions: GitHubContributionDay[];
}

/**
 * METODE 1: Mengambil data langsung (Direct) dari API resmi GitHub (api.github.com).
 * Membutuhkan Personal Access Token (PAT) GitHub untuk autentikasi.
 *
 * @param username Username GitHub Anda
 * @param token Personal Access Token (PAT) GitHub klasik Anda
 */
export async function fetchGitHubContributionsDirect(username: string, token: string): Promise<GitHubContributionsResponse> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                color
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables: { username }
        })
    });

    if (!response.ok) {
        throw new Error(`Gagal mengambil data dari API GraphQL GitHub: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.errors) {
        throw new Error(`GraphQL Error: ${result.errors[0].message}`);
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;
    const contributions: GitHubContributionDay[] = [];

    // Lakukan pemetaan dari weeks structure milik GraphQL GitHub ke flat array
    for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
            // Tentukan level intensitas kontribusi (0 - 4)
            let intensity = 0;
            if (day.contributionCount > 0) {
                if (day.contributionCount === 1) intensity = 1;
                else if (day.contributionCount <= 3) intensity = 2;
                else if (day.contributionCount <= 6) intensity = 3;
                else intensity = 4;
            }
            contributions.push({
                date: day.date,
                count: day.contributionCount,
                color: day.color,
                intensity
            });
        }
    }

    return {
        total: {
            lastYear: calendar.totalContributions
        },
        contributions
    };
}

/**
 * METODE 2: Mengambil data kontribusi GitHub melalui proxy Deno (github-contributions-api.deno.dev).
 * Mengambil data asli real-time dari profil publik Anda tanpa membutuhkan Token API.
 *
 * @param username Username GitHub yang ingin diambil datanya
 */
export async function fetchGitHubContributions(username: string): Promise<GitHubContributionsResponse> {
    const response = await fetch(`https://github-contributions-api.deno.dev/v1/${username}`);
    if (!response.ok) {
        throw new Error(`Gagal mengambil data kontribusi GitHub via Proxy: ${response.statusText}`);
    }
    return response.json();
}
