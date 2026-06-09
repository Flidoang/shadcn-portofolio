<script lang="ts" setup>
import { Timeline, TimelineCard } from "@/components/ui/timeline";
import { Briefcase, GraduationCap } from "@lucide/vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";

const timelineItems = [
  { id: "senior-frontend", label: "2024 - Pres" },
  { id: "frontend-designer", label: "2022 - 2024" },
  { id: "college-cs", label: "2018 - 2022" },
];
</script>

<template>
  <section
    id="experience"
    class="w-full py-12 md:py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <Timeline :items="timelineItems">
      <!-- Custom Header Slot dengan BlurReveal -->
      <template #header>
        <div class="max-w-2xl px-2">
          <BlurReveal :delay="0.1" :duration="0.8">
            <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Career & Education
            </h2>
            <p class="mt-4 text-muted-foreground text-base sm:text-lg">
              Berikut adalah rekam jejak karir profesional dan akademis saya selama beberapa tahun terakhir, di mana saya fokus pada pengembangan web modern dan UI/UX design.
            </p>
          </BlurReveal>
        </div>
      </template>

      <!-- Slot 1: Senior Frontend Engineer -->
      <template #senior-frontend="{ isActive }">
        <TimelineCard :isActive="isActive">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div
                class="p-2 rounded-lg transition-colors duration-500"
                :class="isActive 
                  ? 'bg-[#E5BEEC]/20 text-[#917FB3] dark:text-[#E5BEEC] drop-shadow-[0_0_8px_rgba(229,190,236,0.3)]' 
                  : 'bg-neutral-200 dark:bg-[#2A2F4F] text-neutral-500 dark:text-[#917FB3]/60'"
              >
                <Briefcase class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-lg md:text-xl font-bold text-foreground">Senior Frontend Engineer</h4>
                <p class="text-xs md:text-sm font-semibold text-[#917FB3] dark:text-[#E5BEEC]">TechCorp</p>
              </div>
            </div>
            
            <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Memimpin tim frontend developer dalam membangun aplikasi SaaS berkinerja tinggi. Merancang arsitektur sistem desain baru dan memigrasi kode lama ke Vue 3 & Vite untuk peningkatan kecepatan development serta performa rendering.
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Vue 3</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">TypeScript</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Pinia</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">SaaS Architecture</span>
            </div>
          </div>
        </TimelineCard>
      </template>

      <!-- Slot 2: Frontend Developer & UI/UX Designer -->
      <template #frontend-designer="{ isActive }">
        <TimelineCard :isActive="isActive">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div
                class="p-2 rounded-lg transition-colors duration-500"
                :class="isActive 
                  ? 'bg-[#E5BEEC]/20 text-[#917FB3] dark:text-[#E5BEEC] drop-shadow-[0_0_8px_rgba(229,190,236,0.3)]' 
                  : 'bg-neutral-200 dark:bg-[#2A2F4F] text-neutral-500 dark:text-[#917FB3]/60'"
              >
                <Briefcase class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-lg md:text-xl font-bold text-foreground">Frontend Developer & UI/UX Designer</h4>
                <p class="text-xs md:text-sm font-semibold text-[#917FB3] dark:text-[#E5BEEC]">Creative Studio</p>
              </div>
            </div>
            
            <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Merancang dan mengembangkan website klien, toko e-commerce, dan platform pemasaran interaktif. Bekerja di titik temu antara desain dan kode untuk menciptakan pengalaman digital yang imersif, cepat, dan responsif.
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Figma</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Vue 3</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">GSAP Animations</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">UI/UX Design</span>
            </div>
          </div>
        </TimelineCard>
      </template>

      <!-- Slot 3: Bachelor of Computer Science -->
      <template #college-cs="{ isActive }">
        <TimelineCard :isActive="isActive">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div
                class="p-2 rounded-lg transition-colors duration-500"
                :class="isActive 
                  ? 'bg-[#E5BEEC]/20 text-[#917FB3] dark:text-[#E5BEEC] drop-shadow-[0_0_8px_rgba(229,190,236,0.3)]' 
                  : 'bg-neutral-200 dark:bg-[#2A2F4F] text-neutral-500 dark:text-[#917FB3]/60'"
              >
                <GraduationCap class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-lg md:text-xl font-bold text-foreground">Bachelor of Computer Science</h4>
                <p class="text-xs md:text-sm font-semibold text-[#917FB3] dark:text-[#E5BEEC]">University of Technology</p>
              </div>
            </div>
            
            <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Lulus dengan predikat sangat memuaskan (Honors), mengambil spesialisasi Software Engineering. Memiliki pemahaman kuat dalam sistem komputer, algoritma, manajemen database, dan interaksi manusia-komputer (HCI).
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Algorithms</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Software Engineering</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">HCI</span>
              <span class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">Web Accessibility</span>
            </div>
          </div>
        </TimelineCard>
      </template>
    </Timeline>
  </section>
</template>
