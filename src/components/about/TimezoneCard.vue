<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { MapPin, Sun, CloudRain, Cloud, Coffee, Moon, Monitor, BookOpen } from "@lucide/vue";
import { BentoGridItem } from "@/components/ui/bento-grid";

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
    statusText.value = "Awake & Coding";
    isAwake.value = true;
  } else {
    statusText.value = "Sleeping or Offline";
    isAwake.value = false;
  }
};

let clockInterval: any = null;

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval);
});

// Weather Mock Info ( Bandung )
const weatherInfo = computed(() => {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const localHour = (utcHours + 7) % 24;
  
  if (localHour >= 6 && localHour < 12) {
    return { temp: "22°C", text: "Morning", icon: Sun };
  } else if (localHour >= 12 && localHour < 17) {
    return { temp: "28°C", text: "Warm Afternoon", icon: Sun };
  } else if (localHour >= 17 && localHour < 20) {
    return { temp: "24°C", text: "Cool Evening", icon: Cloud };
  } else {
    return { temp: "21°C", text: "Chilly Night", icon: CloudRain };
  }
});

// Dynamic daily activities
const currentActivity = computed(() => {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const localHour = (utcHours + 7) % 24;
  
  if (localHour >= 0 && localHour < 7) {
    return {
      icon: Moon,
      title: "Resting",
      desc: "Recharging energy for the next day."
    };
  } else if (localHour >= 7 && localHour < 12) {
    return {
      icon: BookOpen,
      title: "Learning / College",
      desc: "Attending college sessions & research."
    };
  } else if (localHour >= 12 && localHour < 13) {
    return {
      icon: Coffee,
      title: "Lunch Break",
      desc: "Offline for food & refreshments."
    };
  } else if (localHour >= 13 && localHour < 18) {
    return {
      icon: Monitor,
      title: "Fullstack Development",
      desc: "Designing backend systems & frontend interfaces."
    };
  } else if (localHour >= 18 && localHour < 20) {
    return {
      icon: Coffee,
      title: "Dinner & Relaxing",
      desc: "Spending downtime offline."
    };
  } else {
    return {
      icon: Monitor,
      title: "Side Projects & Labs",
      desc: "Testing APIs & experimenting with web tech."
    };
  }
});
</script>

<template>
  <!-- Box 2: Timezone Clock (col-span-1, row-span-1) -->
  <BentoGridItem class="md:col-span-1 md:row-span-1 bg-transparent dark:bg-transparent border border-[#917FB3]/40 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,190,236,0.15)] hover:border-[#E5BEEC]/60 group flex flex-col justify-between relative overflow-hidden">
    <template #header>
      <div class="flex flex-col justify-between h-full w-full gap-4">
        <!-- Geometric background radar pattern -->
        <div class="absolute -right-8 -bottom-8 opacity-15 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <svg class="size-40 text-[#917FB3]" viewBox="0 0 100 100">
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

        <!-- Top Row: Location & Weather -->
        <div class="flex items-center justify-between w-full">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-[#917FB3] uppercase tracking-widest">
              <MapPin class="size-3.5 text-[#E5BEEC]" /> Location
            </div>
            <p class="text-sm font-semibold text-foreground/90 leading-tight">Bandung, IDN</p>
          </div>
          
          <!-- Mini Weather Box -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2A2F4F]/40 border border-[#917FB3]/20 text-xs">
            <component :is="weatherInfo.icon" class="size-3.5 text-[#E5BEEC]" />
            <span class="font-mono text-[#FDE2F3] font-bold">{{ weatherInfo.temp }}</span>
          </div>
        </div>

        <!-- Middle Row: Clock & Date -->
        <div class="flex flex-col my-1">
          <span class="text-3xl font-extrabold text-[#FDE2F3] font-mono tracking-wider leading-none">{{ timeString || "00:00:00" }}</span>
          <span class="text-[10px] font-semibold text-[#917FB3] uppercase tracking-wider mt-1.5">{{ dateString || "Today" }}</span>
        </div>

        <!-- Bottom Row: Dynamic Status and Current Activity -->
        <div class="flex flex-col gap-2 pt-2 border-t border-[#917FB3]/20">
          <div class="flex items-center justify-between">
            <span class="text-[9px] uppercase tracking-widest text-[#917FB3] font-bold">Current Status</span>
            
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold border" 
              :class="isAwake ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'">
              <span class="size-1.5 rounded-full bg-current" :class="isAwake ? 'animate-pulse' : ''"></span>
              {{ statusText }}
            </div>
          </div>
          
          <!-- Activity details block to fill the visual space -->
          <div class="flex gap-2.5 items-start bg-[#2A2F4F]/30 border border-[#917FB3]/10 rounded-xl p-2.5">
            <component :is="currentActivity.icon" class="size-4 text-[#E5BEEC] shrink-0 mt-0.5" />
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] font-bold text-[#FDE2F3] leading-none">{{ currentActivity.title }}</span>
              <span class="text-[9px] text-[#FDE2F3]/80 leading-normal mt-1.5 select-text">{{ currentActivity.desc }}</span>
            </div>
          </div>
        </div>

      </div>
    </template>
  </BentoGridItem>
</template>
