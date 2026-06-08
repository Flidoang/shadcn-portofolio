<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  MapPin,
  Music,
  Sparkles,
  Play,
  Pause,
  ExternalLink,
} from "@lucide/vue";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { fetchGitHubContributions, fetchGitHubContributionsDirect } from "@/service/timelineGithub";
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

// GitHub live integrations
const githubUsername = ref("Flidoang");
const githubContributions = ref<number[]>([]);
const totalCommits = ref(0);
const maxStreak = ref(0);
const isLiveGitHub = ref(false);
const monthLabels = ref<{ name: string; colIndex: number }[]>([]);

const getMonthLabel = (colIndex: number) => {
  const match = monthLabels.value.find(m => m.colIndex === colIndex);
  return match ? match.name : "";
};

const initGithubGrid = () => {
  const arr = [];
  const today = new Date();
  const mockDays = [];
  
  // Generate mock dates backwards for 280 days (40 weeks)
  for (let i = 279; i >= 0; i--) {
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
    
    arr.push(intensity);
    mockDays.push({ date: dateStr, intensity });
  }
  
  githubContributions.value = arr;
  totalCommits.value = 430;
  maxStreak.value = 15;
  isLiveGitHub.value = false;
  
  // Generate month labels for mock data
  const labels: { name: string; colIndex: number }[] = [];
  let prevMonth = "";
  const totalWeeks = 40;
  for (let w = 0; w < totalWeeks; w++) {
    const dayData = mockDays[w * 7];
    const dateObj = new Date(dayData.date);
    const monthName = dateObj.toLocaleString("id-ID", { month: "short" });
    if (monthName !== prevMonth) {
      labels.push({ name: monthName, colIndex: w });
      prevMonth = monthName;
    }
  }
  monthLabels.value = labels;
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
    
    // Map contributions to our grid cells (take the last 280 days = 40 weeks)
    const last280 = data.contributions.slice(-280);
    githubContributions.value = last280.map(day => day.intensity);
    
    // Calculate streaks
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

    // Generate Month Labels aligned to columns
    const labels: { name: string; colIndex: number }[] = [];
    let prevMonth = "";
    const totalWeeks = Math.floor(last280.length / 7);
    for (let w = 0; w < totalWeeks; w++) {
      const dayData = last280[w * 7];
      if (dayData && dayData.date) {
        const dateObj = new Date(dayData.date);
        const monthName = dateObj.toLocaleString("id-ID", { month: "short" });
        if (monthName !== prevMonth) {
          labels.push({ name: monthName, colIndex: w });
          prevMonth = monthName;
        }
      }
    }
    monthLabels.value = labels;
  } catch (error) {
    console.error("Failed to load live GitHub contributions, falling back to mock data:", error);
    initGithubGrid();
  }
};

// Spotify player reactive logic
const isPlaying = ref(true);
const currentProgress = ref(84); // Starts at 1:24
const totalDuration = 225; // 3:45 in seconds

const progressPercent = computed(() => (currentProgress.value / totalDuration) * 100);
const formattedProgress = computed(() => {
  const min = Math.floor(currentProgress.value / 60);
  const sec = currentProgress.value % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
});
const formattedDuration = "3:45";

const togglePlayback = () => {
  isPlaying.value = !isPlaying.value;
};

let clockInterval: any = null;
let spotifyInterval: any = null;

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
  loadGitHubData();
  
  spotifyInterval = setInterval(() => {
    if (isPlaying.value) {
      currentProgress.value += 1;
      if (currentProgress.value >= totalDuration) {
        currentProgress.value = 0;
      }
    }
  }, 1000);
});

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval);
  if (spotifyInterval) clearInterval(spotifyInterval);
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
        
        <!-- Box 1: Profile & Bio (col-span-2, row-span-2) -->
        <BentoGridItem class="md:col-span-2 md:row-span-2 bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between gap-6">
          <template #header>
            <div class="flex flex-col justify-between h-full gap-6 w-full">
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest">
                  <Sparkles class="size-3.5" /> Profile & Bio
                </div>
                
                <h4 class="text-2xl md:text-3xl font-extrabold text-foreground leading-snug">
                  Halo, saya <span class="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Rafli Hendarsyah</span>.
                </h4>
                
                <p class="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                  Mahasiswa dan developer yang sangat menyukai pembuatan produk digital interaktif. Saya fokus pada pengembangan frontend modern dengan estetika visual premium, animasi interaktif yang mulus, dan performa tinggi menggunakan ekosistem Vue, Tailwind CSS, dan TypeScript.
                </p>
              </div>

              <!-- Tech stack tags / visual footer -->
              <div class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end w-full">
                <div class="flex flex-wrap gap-2 max-w-md">
                  <span v-for="skill in ['Vue.js', 'Vite', 'Tailwind CSS', 'TypeScript', 'Motion-V', 'UI/UX Design', 'Git']" :key="skill" 
                    class="px-3 py-1.5 text-xs font-medium rounded-xl border border-border/80 bg-muted/20 text-foreground/80 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default">
                    {{ skill }}
                  </span>
                </div>
                
                <!-- Photo inside glowing frame -->
                <div class="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden border border-border bg-muted/10 shadow-lg group-hover:scale-[1.03] transition-transform duration-500 self-end">
                  <img :src="photoUrl" class="w-full h-full object-cover" alt="Profile avatar" />
                  <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div class="absolute bottom-2 left-2 right-2 text-white flex flex-col pointer-events-none">
                    <span class="text-[10px] font-semibold tracking-wider uppercase opacity-90">IDN 🇮🇩</span>
                  </div>
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

        <!-- Box 3: Spotify player (col-span-1, row-span-1) - Swapped & Compact -->
        <BentoGridItem class="md:col-span-1 md:row-span-1 bg-card/30 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between">
          <template #header>
            <div class="flex flex-col justify-between h-full w-full gap-2">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <Music class="size-3.5 text-primary animate-pulse" /> Spotify
                </div>
                <div class="flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-primary font-medium bg-primary/10 border border-primary/20 rounded-full">
                  <span class="size-1 rounded-full bg-primary" :class="isPlaying ? 'animate-ping' : ''"></span>
                  Live
                </div>
              </div>

              <!-- Song Details & Vinyl -->
              <div class="flex items-center gap-3 my-1 w-full">
                <!-- Vinyl record overlay or lofi cover -->
                <div class="relative size-12 shrink-0 rounded-xl bg-linear-to-tr from-pink-500 via-purple-600 to-indigo-600 shadow-md flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <div class="absolute inset-0 bg-black/20" />
                  <Music class="size-6 text-white/90" :class="isPlaying ? 'animate-spin' : ''" style="animation-duration: 8s" />
                  <div class="absolute size-2 rounded-full bg-black/90 border border-white/20" />
                </div>

                <div class="flex flex-col min-w-0">
                  <span class="font-bold text-foreground text-xs truncate max-w-[140px]">Lofi Coding Session ☕</span>
                  <span class="text-[10px] text-muted-foreground truncate">Chillhop Beats</span>
                </div>
              </div>

              <!-- Compact Tracker & Audio Wave -->
              <div class="flex flex-col gap-2 border-t border-border/30 pt-2 w-full">
                <div class="flex items-center justify-between">
                  <!-- Bouncing bars -->
                  <div class="flex items-end gap-0.5 h-5 shrink-0 bg-muted/10 px-2 py-1 rounded-lg border border-border/10">
                    <span v-for="i in 6" :key="i" 
                      class="w-0.5 bg-primary/80 rounded-full transition-all duration-300"
                      :class="isPlaying ? 'animate-bounce-bar' : 'h-1'"
                      :style="isPlaying ? { 
                        animationDelay: `${i * 0.08}s`, 
                        animationDuration: `${0.5 + (i % 3) * 0.15}s` 
                      } : {}"
                    ></span>
                  </div>
                  <!-- Controls -->
                  <div class="flex items-center gap-2">
                    <button @click="togglePlayback" class="size-5 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                      <Play v-if="!isPlaying" class="size-2.5 fill-current ml-0.5" />
                      <Pause v-else class="size-2.5 fill-current" />
                    </button>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono">{{ formattedProgress }} / {{ formattedDuration }}</span>
                </div>

                <!-- Progress Line -->
                <div class="relative w-full h-1 bg-muted rounded-full overflow-hidden cursor-pointer" @click="currentProgress = Math.floor(($event.offsetX / ($event.currentTarget as HTMLElement).clientWidth) * totalDuration)">
                  <div class="absolute top-0 left-0 h-full bg-primary transition-all duration-100" :style="{ width: `${progressPercent}%` }" />
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
                <div class="grid grid-flow-col grid-cols-[repeat(40,minmax(0,1fr))] text-[9px] text-muted-foreground mb-1 pl-7 pr-0.5 leading-none h-3 min-w-[560px]">
                  <div v-for="col in 40" :key="col" class="text-left font-sans">
                    {{ getMonthLabel(col - 1) }}
                  </div>
                </div>

                <div class="flex items-center min-w-[560px] h-[84px]">
                  <!-- Weekday Labels -->
                  <div class="grid grid-rows-7 h-full text-[9px] text-muted-foreground pr-2 font-sans select-none justify-between leading-[11px] shrink-0 w-7 py-0.5">
                    <div></div>
                    <div>Mon</div>
                    <div></div>
                    <div>Wed</div>
                    <div></div>
                    <div>Fri</div>
                    <div></div>
                  </div>

                  <!-- Contributions Grid (40 Columns x 7 Rows = 280 cells) -->
                  <div class="grid grid-rows-7 grid-flow-col gap-0.5 md:gap-1 h-full justify-between grow">
                    <div v-for="(level, idx) in githubContributions" :key="idx" 
                      class="size-2.5 rounded-xs transition-all duration-200 hover:scale-125 hover:shadow-[0_0_8px_currentColor]"
                      :class="[
                        level === 0 ? 'bg-neutral-100 dark:bg-neutral-900 text-transparent' : '',
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
                    <span class="size-2 rounded-xs bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5"></span>
                    <span class="size-2 rounded-xs bg-[#9be9a8] dark:bg-[#0e4429]"></span>
                    <span class="size-2 rounded-xs bg-[#40c463] dark:bg-[#006d32]"></span>
                    <span class="size-2 rounded-xs bg-[#30a14e] dark:bg-[#26a641]"></span>
                    <span class="size-2 rounded-xs bg-[#216e39] dark:bg-[#39d353]"></span>
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
@keyframes bounce-bar {
  0%, 100% {
    height: 6px;
  }
  50% {
    height: 24px;
  }
}

.animate-bounce-bar {
  animation: bounce-bar 1s ease-in-out infinite;
}
</style>
