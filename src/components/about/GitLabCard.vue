<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ExternalLink } from "@lucide/vue";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { fetchGitLabContributions } from "@/service/timelineGitlab";
import type { GitLabProfile } from "@/service/timelineGitlab";

// GitLab config
const gitlabUsername = ref("Flidoang");
const gitlabProfile = ref<GitLabProfile | null>(null);
const gitlabContributions = ref<number[]>([]);
const gitlabTotalCommits = ref(0);
const gitlabMaxStreak = ref(0);
const gitlabMonthLabels = ref<{ name: string; colIndex: number }[]>([]);
const isLoadingGitLab = ref(false);

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

onMounted(() => {
  loadGitLabData();
});
</script>

<template>
  <!-- Box 3: GitLab Contribution Calendar (col-span-3, row-span-1) -->
  <BentoGridItem class="md:col-span-3 md:row-span-1 bg-transparent dark:bg-transparent border border-border/60 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,108,35,0.15)] hover:border-[#fc6d26]/40 group flex flex-col justify-between overflow-hidden">
    <template #header>
      <div class="flex flex-col justify-between h-full w-full gap-4">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <!-- Custom GitLab SVG Logo -->
            <svg class="size-4 fill-current text-[#fc6d26] animate-pulse" viewBox="0 0 24 24">
              <path d="M23.955 13.587l-1.342-4.135L22.61 9.45c-.015-.044-.028-.088-.046-.13l-2.036-6.262c-.08-.248-.25-.456-.474-.582a1.077 1.077 0 0 0-1.12.035c-.212.152-.352.39-.387.653l-1.127 3.473H6.586L5.459 3.164a1.077 1.077 0 0 0-.387-.653 1.077 1.077 0 0 0-1.12-.035c-.224.126-.395.334-.474.582L1.442 9.32a.987.987 0 0 0-.045.13l-.004.004L.045 13.59a.959.959 0 0 0 .348 1.073l11.607 8.441 11.607-8.441a.959.959 0 0 0 .348-1.076z" />
            </svg>
            <span>GitLab Calendar • @{{ gitlabUsername }}</span>
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
</template>
