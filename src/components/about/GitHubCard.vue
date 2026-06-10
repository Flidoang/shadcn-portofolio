<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ExternalLink } from "@lucide/vue";
import { BentoGridItem } from "@/components/ui/bento-grid";
import { fetchGitHubContributions, fetchGitHubContributionsDirect } from "@/service/timelineGithub";

// GitHub live integrations
const githubUsername = ref("Flidoang");
const githubContributions = ref<number[]>([]);
const totalCommits = ref(0);
const maxStreak = ref(0);
const isLiveGitHub = ref(false);
const githubMonthLabels = ref<{ name: string; colIndex: number }[]>([]);

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

const initGithubGrid = () => {
  const today = new Date();
  const mockDays: RawContributionDay[] = [];
  
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
    
    totalCommits.value = data.total.lastYear || 0;
    
    const padded = processContributions(data.contributions);
    const last280 = padded.slice(-280);
    githubContributions.value = last280.map(day => day.intensity);
    
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

onMounted(() => {
  loadGitHubData();
});
</script>

<template>
  <!-- Box 4: GitHub contribution graph (col-span-3, row-span-1) -->
  <BentoGridItem class="md:col-span-3 md:row-span-1 bg-transparent dark:bg-transparent border border-border/60 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-primary/40 group flex flex-col justify-between">
    <template #header>
      <div class="flex flex-col justify-between h-full w-full gap-4">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <!-- Custom SVG GitHub Logo -->
            <svg class="size-4 fill-current text-primary" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span>GitHub Calendar • @{{ githubUsername }}</span>
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
</template>
