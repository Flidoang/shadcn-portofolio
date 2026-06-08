<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  MapPin,
  Sparkles,
  ExternalLink,
} from "@lucide/vue";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { fetchGitHubContributions, fetchGitHubContributionsDirect } from "@/service/timelineGithub";
import { fetchGitLabContributions } from "@/service/timelineGitlab";
import type { GitLabProfile } from "@/service/timelineGitlab";
import photoUrl from "@/assets/photo.png";

// Timezone Clock Logic (GMT+7)
const timeString = ref("");
const dateString = ref("");
const statusText = ref("");
const isAwake = ref(true);

const updateClock = () => {
  const now = new Date();
  
  // Format Time (HH:MM:SS)
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  timeString.value = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
  
  // Format Date (Day, Month DD, YYYY)
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  dateString.value = new Intl.DateTimeFormat("en-US", dateOptions).format(now);
  
  // Status check: Awake & coding if between 7:00 and 23:59 WIB (GMT+7)
  const utcHours = now.getUTCHours();
  const localHour = (utcHours + 7) % 24;
  if (localHour >= 7 && localHour < 24) {
    statusText.value = "Awake & Coding ⚡";
    isAwake.value = true;
  } else {
    statusText.value = "Sleeping or Offline 😴";
    isAwake.value = false;
  }
};

// Common Date Padding Function (starts on Sunday, ends on Saturday)
interface RawContributionDay {
  date: string;
  intensity: number;
  count?: number;
  color?: string;
}

const processContributions = (days: RawContributionDay[]) => {
  if (days.length === 0) return [];
  
  const padded = [...days];
  
  // Pad start to make sure first day is Sunday (day 0)
  const firstDate = new Date(padded[0].date);
  const firstDayOfWeek = firstDate.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(firstDate);
    d.setDate(firstDate.getDate() - (firstDayOfWeek - i));
    const dateStr = d.toISOString().split("T")[0];
    padded.unshift({
      date: dateStr,
      intensity: 0,
      count: 0,
      color: ""
    });
  }
  
  // Pad end to make sure last day is Saturday (day 6)
  const lastDate = new Date(padded[padded.length - 1].date);
  const lastDayOfWeek = lastDate.getDay();
  for (let i = lastDayOfWeek + 1; i <= 6; i++) {
    const d = new Date(lastDate);
    d.setDate(lastDate.getDate() + (i - lastDayOfWeek));
    const dateStr = d.toISOString().split("T")[0];
    padded.push({
      date: dateStr,
      intensity: 0,
      count: 0,
      color: ""
    });
  }
  
  return padded;
};

// GitLab live integrations
const gitlabUsername = ref("Flidoang");
const gitlabProfile = ref<GitLabProfile | null>(null);
const gitlabContributions = ref<number[]>([]);
const gitlabTotalCommits = ref(0);
const gitlabMaxStreak = ref(0);
const gitlabMonthLabels = ref<{ name: string; colIndex: number }[]>([]);
const isLoadingGitLab = ref(false);

const getGitLabMonthLabel = (colIndex: number) => {
  const match = gitlabMonthLabels.value.find(m => m.colIndex === colIndex);
  return match ? match.name : "";
};

const loadGitLabData = async () => {
  isLoadingGitLab.value = true;
  try {
    const token = import.meta.env.VITE_GITLAB_TOKEN;
    const data = await fetchGitLabContributions(gitlabUsername.value, token);
    gitlabProfile.value = data.profile;
    gitlabTotalCommits.value = data.totalCommits;
    gitlabMaxStreak.value = data.maxStreak;
    
    // Process contributions (starts Sunday, ends Saturday)
    const padded = processContributions(data.contributions);
    
    // Take the last 280 days (40 weeks)
    const last280 = padded.slice(-280);
    gitlabContributions.value = last280.map(day => day.intensity);
    
    // Generate Month Labels aligned to 40 columns
    const labels: { name: string; colIndex: number }[] = [];
    let prevMonth = "";
    const totalWeeks = 40;
    for (let w = 0; w < totalWeeks; w++) {
      const dayData = last280[w * 7];
      if (dayData && dayData.date) {
        const dateObj = new Date(dayData.date);
        const monthName = dateObj.toLocaleString("en-US", { month: "short" });
        if (monthName !== prevMonth) {
          labels.push({ name: monthName, colIndex: w });
          prevMonth = monthName;
        }
      }
    }
    gitlabMonthLabels.value = labels;
  } catch (error) {
    console.error("Failed to load GitLab contributions:", error);
  } finally {
    isLoadingGitLab.value = false;
  }
};

// GitHub live integrations
const githubUsername = ref("Flidoang");
const githubContributions = ref<number[]>([]);
const totalCommits = ref(0);
const maxStreak = ref(0);
const isLiveGitHub = ref(false);
const githubMonthLabels = ref<{ name: string; colIndex: number }[]>([]);

const getGitHubMonthLabel = (colIndex: number) => {
  const match = githubMonthLabels.value.find(m => m.colIndex === colIndex);
  return match ? match.name : "";
};

const initGithubGrid = () => {
  const today = new Date();
  const mockDays: RawContributionDay[] = [];
  
  // Generate mock dates backwards for 300 days to ensure ample data after padding
  for (let i = 299; i >= 0; i--) {
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() - i);
    const dateStr = dateObj.toISOString().split("T")[0];
    
    const rand = Math.random();
    let intensity = 0;
    if (rand < 0.45) intensity = 0;
    else if (rand < 0.75) intensity = 1;
    else if (rand < 0.88) intensity = 2;
    else if (rand < 0.96) intensity = 3;
    else intensity = 4;
    
    mockDays.push({ date: dateStr, intensity, count: intensity * 2 });
  }
  
  const padded = processContributions(mockDays);
  const last280 = padded.slice(-280);
  githubContributions.value = last280.map(day => day.intensity);
  totalCommits.value = 430;
  maxStreak.value = 15;
  isLiveGitHub.value = false;
  
  // Generate month labels (English locale)
  const labels: { name: string; colIndex: number }[] = [];
  let prevMonth = "";
  const totalWeeks = 40;
  for (let w = 0; w < totalWeeks; w++) {
    const dayData = last280[w * 7];
    if (dayData && dayData.date) {
      const dateObj = new Date(dayData.date);
      const monthName = dateObj.toLocaleString("en-US", { month: "short" });
      if (monthName !== prevMonth) {
        labels.push({ name: monthName, colIndex: w });
        prevMonth = monthName;
      }
    }
  }
  githubMonthLabels.value = labels;
};

const loadGitHubData = async () => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    let data;
    if (token) {
      console.log("Fetching GitHub contributions directly from official GitHub GraphQL API...");
      data = await fetchGitHubContributionsDirect(githubUsername.value, token);
    } else {
      console.log("Fetching GitHub contributions from public Deno proxy...");
      data = await fetchGitHubContributions(githubUsername.value);
    }
    
    // Total commits in past 12 months
    totalCommits.value = data.total.lastYear || 0;
    
    // Process and pad contributions list
    const padded = processContributions(data.contributions);
    const last280 = padded.slice(-280);
    githubContributions.value = last280.map(day => day.intensity);
    
    // Calculate streaks from original contributions
    let current = 0;
    let max = 0;
    for (const day of data.contributions) {
      if (day.count > 0) {
        current += 1;
        if (current > max) max = current;
      } else {
        current = 0;
      }
    }
    maxStreak.value = max;
    isLiveGitHub.value = true;

    // Generate Month Labels aligned to columns (en-US locale)
    const labels: { name: string; colIndex: number }[] = [];
    let prevMonth = "";
    const totalWeeks = 40;
    for (let w = 0; w < totalWeeks; w++) {
      const dayData = last280[w * 7];
      if (dayData && dayData.date) {
        const dateObj = new Date(dayData.date);
        const monthName = dateObj.toLocaleString("en-US", { month: "short" });
        if (monthName !== prevMonth) {
          labels.push({ name: monthName, colIndex: w });
          prevMonth = monthName;
        }
      }
    }
    githubMonthLabels.value = labels;
  } catch (error) {
    console.error("Failed to load live GitHub contributions, falling back to mock data:", error);
    initGithubGrid();
  }
};

let clockInterval: any = null;

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
  loadGitHubData();
  loadGitLabData();
});

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval);
});
</script>

<template>
  <section id="about" class="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 md:py-0 lg:px-16 max-w-7xl mx-auto w-full">
    <div class="w-full flex flex-col gap-12">
      <!-- Section Title -->
      <div class="text-center max-w-2xl mx-auto flex flex-col items-center">
        <h2 class="text-xs font-semibold tracking-widest text-primary uppercase flex items-center gap-1.5 justify-center">
          <Sparkles class="size-3.5" /> About Me
        </h2>
        <h3 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bento Grid Showcase
        </h3>
        <p class="mt-4 text-muted-foreground text-base sm:text-lg">
          Kenali saya lebih dekat lewat kompilasi cuplikan aktivitas, hobi, dan rutinitas harian saya yang disajikan dalam Bento Grid layout.
        </p>
      </div>

      <!-- Bento Grid Container -->
      <BentoGrid class="gap-6 md:auto-rows-[16rem] lg:auto-rows-[18rem] w-full">
        
        <!-- Box 1: Profile & Bio (col-span-2, row-span-1) -->
        <BentoGridItem class="md:col-span-2 md:row-span-1 bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between">
          <template #header>
            <div class="flex flex-col md:flex-row justify-between h-full gap-6 w-full items-center md:items-start">
              <div class="flex flex-col gap-3 justify-center h-full max-w-xl">
                <div class="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest">
                  <Sparkles class="size-3.5" /> Profile & Bio
                </div>
                
                <h4 class="text-xl md:text-2xl font-extrabold text-foreground leading-snug">
                  Halo, saya <span class="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Rafli Hendarsyah</span>.
                </h4>
                
                <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  Mahasiswa dan developer yang sangat menyukai pembuatan produk digital interaktif. Saya fokus pada pengembangan frontend modern dengan estetika visual premium, animasi interaktif yang mulus, dan performa tinggi menggunakan ekosistem Vue, Tailwind CSS, dan TypeScript.
                </p>
                
                <div class="flex flex-wrap gap-1.5 mt-1">
                  <span v-for="skill in ['Vue.js', 'Vite', 'Tailwind CSS', 'TypeScript', 'Git']" :key="skill" 
                    class="px-2 py-0.5 text-[10px] font-medium rounded-lg border border-border/80 bg-muted/20 text-foreground/80 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default">
                    {{ skill }}
                  </span>
                </div>
              </div>
              
              <!-- Photo inside glowing frame -->
              <div class="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden border border-border bg-muted/10 shadow-lg group-hover:scale-[1.03] transition-transform duration-500 self-center md:self-end">
                <img :src="photoUrl" class="w-full h-full object-cover" alt="Profile avatar" />
                <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div class="absolute bottom-1.5 left-2 right-2 text-white flex flex-col pointer-events-none">
                  <span class="text-[9px] font-semibold tracking-wider uppercase opacity-90">IDN 🇮🇩</span>
                </div>
              </div>
            </div>
          </template>
        </BentoGridItem>
 
        <!-- Box 2: Timezone Clock (col-span-1, row-span-1) -->
        <BentoGridItem class="md:col-span-1 md:row-span-1 bg-card/30 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between">
          <template #header>
            <div class="flex flex-col justify-between h-full w-full">
              <!-- Geometric background radar pattern -->
              <div class="absolute -right-8 -bottom-8 opacity-15 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <svg class="size-40 text-primary" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="0.7" stroke-dasharray="3 3" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="0.7" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="0.7" stroke-dasharray="2 2" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" stroke-width="0.5" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="0.5" />
                  <!-- Jakarta pulse coordinates -->
                  <circle cx="70" cy="55" r="3.5" fill="currentColor">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
 
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <MapPin class="size-3.5 text-primary" /> Location & Time
                </div>
                <p class="text-sm font-semibold text-foreground/90">Indonesia (WIB / GMT+7)</p>
              </div>
 
              <div class="flex flex-col my-4">
                <span class="text-3xl font-extrabold text-foreground font-mono tracking-wider">{{ timeString || "00:00:00" }}</span>
                <span class="text-xs text-muted-foreground mt-1">{{ dateString || "Today" }}</span>
              </div>
 
              <div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" 
                  :class="isAwake ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'">
                  <span class="size-2 rounded-full bg-current" :class="isAwake ? 'animate-pulse' : ''"></span>
                  {{ statusText }}
                </div>
              </div>
            </div>
          </template>
        </BentoGridItem>
 
        <!-- Box 3: GitLab Contribution Calendar (col-span-3, row-span-1) -->
        <BentoGridItem class="md:col-span-3 md:row-span-1 bg-card/30 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,108,35,0.15)] hover:border-[#fc6d26]/40 group flex flex-col justify-between overflow-hidden">
          <template #header>
            <div class="flex flex-col justify-between h-full w-full gap-4">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <!-- Custom GitLab SVG Logo -->
                  <svg class="size-4 fill-current text-[#fc6d26] animate-pulse" viewBox="0 0 24 24">
                    <path d="M23.955 13.587l-1.342-4.135L22.61 9.45c-.015-.044-.028-.088-.046-.13l-2.036-6.262c-.08-.248-.25-.456-.474-.582a1.077 1.077 0 0 0-1.12.035c-.212.152-.352.39-.387.653l-1.127 3.473H6.586L5.459 3.164a1.077 1.077 0 0 0-.387-.653 1.077 1.077 0 0 0-1.12-.035c-.224.126-.395.334-.474.582L1.442 9.32a.987.987 0 0 0-.045.13l-.004.004L.045 13.59a.959.959 0 0 0 .348 1.073l11.607 8.441 11.607-8.441a.959.959 0 0 0 .348-1.076z" />
                  </svg>
                  <span>GitLab Calendar</span>
                </div>
                <a :href="gitlabProfile?.web_url || 'https://gitlab.com/' + gitlabUsername" target="_blank" class="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <ExternalLink class="size-3.5" />
                </a>
              </div>
 
              <!-- Loading state -->
              <div v-if="isLoadingGitLab" class="flex flex-col items-center justify-center grow py-6">
                <div class="size-6 border-2 border-primary/20 border-t-[#fc6d26] rounded-full animate-spin"></div>
              </div>
 
              <!-- GitLab Calendar Grid (Full-width 40 columns) -->
              <div v-else class="my-1 w-full flex flex-col overflow-x-auto select-none pb-1 scrollbar-thin scrollbar-thumb-muted">
                <!-- Month Row (Aligned to Grid Columns) -->
                <div class="relative text-[9px] text-muted-foreground mb-1.5 h-3 min-w-[560px] ml-7">
                  <div v-for="label in gitlabMonthLabels" :key="label.colIndex" 
                       class="absolute font-sans leading-none"
                       :style="{ left: `${(label.colIndex / 40) * 100}%` }">
                    {{ label.name }}
                  </div>
                </div>
 
                <div class="flex items-center min-w-[560px] h-[84px]">
                  <!-- Weekday Labels (Pixel-perfect align) -->
                  <div class="grid grid-rows-7 gap-0.5 md:gap-1 h-full text-[9px] text-muted-foreground pr-2 font-sans select-none shrink-0 w-7 py-0.5">
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Mon</div>
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Wed</div>
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Fri</div>
                    <div class="flex items-center h-full"></div>
                  </div>
 
                  <!-- Contributions Grid (40 Columns x 7 Rows = 280 cells) -->
                  <div class="grid grid-rows-7 grid-flow-col gap-0.5 md:gap-1 h-full justify-between grow">
                    <div v-for="(level, idx) in gitlabContributions" :key="idx" 
                      class="size-2.5 rounded-xs transition-all duration-200 hover:scale-125 hover:shadow-[0_0_8px_currentColor]"
                      :class="[
                        level === 0 ? 'bg-[#ebedf0] dark:bg-[#161b22] border border-black/5 dark:border-white/5 text-transparent' : '',
                        level === 1 ? 'bg-[#ffd8c5] dark:bg-[#2d1b15] text-[#2d1b15]' : '',
                        level === 2 ? 'bg-[#ffb38a] dark:bg-[#4d2d22] text-[#4d2d22]' : '',
                        level === 3 ? 'bg-[#ff7d44] dark:bg-[#7d412b] text-[#7d412b]' : '',
                        level === 4 ? 'bg-[#fc6d26] dark:bg-[#e24329] text-[#e24329] shadow-[0_0_6px_rgba(252,109,38,0.3)]' : ''
                      ]"
                    ></div>
                  </div>
                </div>
 
                <!-- Footer under graph: Learn link and Legend -->
                <div class="flex items-center justify-between text-[9px] text-muted-foreground mt-3 pl-7 pr-0.5">
                  <a href="https://docs.gitlab.com/ee/user/profile/index.html#view-contributions-on-your-profile-page" 
                    target="_blank" class="hover:text-[#fc6d26] hover:underline transition-colors duration-200 font-sans">
                    Learn how GitLab counts contributions
                  </a>
                  
                  <div class="flex items-center gap-1 font-sans">
                    <span>Less</span>
                    <span class="size-2 rounded-xs bg-[#ebedf0] dark:bg-[#161b22] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#ffd8c5] dark:bg-[#2d1b15] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#ffb38a] dark:bg-[#4d2d22] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#ff7d44] dark:bg-[#7d412b] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#fc6d26] dark:bg-[#e24329] border border-black/5 dark:border-white/5"></span>
                    <span>More</span>
                  </div>
                </div>
              </div>
 
              <!-- Stats footer -->
              <div class="flex items-center justify-between border-t border-border/30 pt-3 text-xs w-full">
                <div class="flex flex-col">
                  <span class="font-bold text-foreground font-mono">{{ gitlabTotalCommits }} Commits</span>
                  <span class="text-[10px] text-muted-foreground">Past 10 months</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="font-bold text-foreground font-mono">{{ gitlabMaxStreak }} Days</span>
                  <span class="text-[10px] text-muted-foreground">Max streak</span>
                </div>
              </div>
            </div>
          </template>
        </BentoGridItem>

        <!-- Box 4: GitHub contribution graph (col-span-3, row-span-1) - Swapped & Wide -->
        <BentoGridItem class="md:col-span-3 md:row-span-1 bg-card/30 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between">
          <template #header>
            <div class="flex flex-col justify-between h-full w-full gap-4">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <!-- Custom SVG GitHub Logo -->
                  <svg class="size-4 fill-current text-primary" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span>GitHub Activity Calendar</span>
                </div>
                <a :href="'https://github.com/' + githubUsername" target="_blank" class="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <ExternalLink class="size-3.5" />
                </a>
              </div>

              <!-- Real calendar layout with month and weekday labels -->
              <div class="my-1 w-full flex flex-col overflow-x-auto select-none pb-1 scrollbar-thin scrollbar-thumb-muted">
                <!-- Month Row (Aligned to Grid Columns) -->
                <div class="relative text-[9px] text-muted-foreground mb-1.5 h-3 min-w-[560px] ml-7">
                  <div v-for="label in githubMonthLabels" :key="label.colIndex" 
                       class="absolute font-sans leading-none"
                       :style="{ left: `${(label.colIndex / 40) * 100}%` }">
                    {{ label.name }}
                  </div>
                </div>

                <div class="flex items-center min-w-[560px] h-[84px]">
                  <!-- Weekday Labels (Pixel-perfect align) -->
                  <div class="grid grid-rows-7 gap-0.5 md:gap-1 h-full text-[9px] text-muted-foreground pr-2 font-sans select-none shrink-0 w-7 py-0.5">
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Mon</div>
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Wed</div>
                    <div class="flex items-center h-full"></div>
                    <div class="flex items-center h-full">Fri</div>
                    <div class="flex items-center h-full"></div>
                  </div>

                  <!-- Contributions Grid (40 Columns x 7 Rows = 280 cells) -->
                  <div class="grid grid-rows-7 grid-flow-col gap-0.5 md:gap-1 h-full justify-between grow">
                    <div v-for="(level, idx) in githubContributions" :key="idx" 
                      class="size-2.5 rounded-xs transition-all duration-200 hover:scale-125 hover:shadow-[0_0_8px_currentColor]"
                      :class="[
                        level === 0 ? 'bg-[#ebedf0] dark:bg-[#161b22] border border-black/5 dark:border-white/5 text-transparent' : '',
                        level === 1 ? 'bg-[#9be9a8] dark:bg-[#0e4429] text-[#0e4429]' : '',
                        level === 2 ? 'bg-[#40c463] dark:bg-[#006d32] text-[#006d32]' : '',
                        level === 3 ? 'bg-[#30a14e] dark:bg-[#26a641] text-[#26a641]' : '',
                        level === 4 ? 'bg-[#216e39] dark:bg-[#39d353] text-[#39d353] shadow-[0_0_6px_rgba(57,211,83,0.3)]' : ''
                      ]"
                    ></div>
                  </div>
                </div>

                <!-- Footer under graph: Learn link and Legend -->
                <div class="flex items-center justify-between text-[9px] text-muted-foreground mt-3 pl-7 pr-0.5">
                  <a href="https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/managing-contribution-graphs-on-your-profile" 
                    target="_blank" class="hover:text-primary hover:underline transition-colors duration-200 font-sans">
                    Learn how we count contributions
                  </a>
                  
                  <div class="flex items-center gap-1 font-sans">
                    <span>Less</span>
                    <span class="size-2 rounded-xs bg-[#ebedf0] dark:bg-[#161b22] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#9be9a8] dark:bg-[#0e4429] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#40c463] dark:bg-[#006d32] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#30a14e] dark:bg-[#26a641] border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#216e39] dark:bg-[#39d353] border border-black/5 dark:border-white/5"></span>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <!-- Dynamic Commit Stats footer -->
              <div class="flex items-center justify-between border-t border-border/30 pt-3 text-xs w-full">
                <div class="flex flex-col">
                  <span class="font-bold text-foreground font-mono">{{ totalCommits }} Commits</span>
                  <span class="text-[10px] text-muted-foreground">Past 12 months</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="font-bold text-foreground font-mono">{{ maxStreak }} Days</span>
                  <span class="text-[10px] text-muted-foreground">Max streak</span>
                </div>
              </div>
            </div>
          </template>
        </BentoGridItem>

      </BentoGrid>
    </div>
  </section>
</template>

<style scoped>
</style>
