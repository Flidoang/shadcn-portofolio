<script lang="ts" setup>
import { ref } from "vue";
import { Timeline, TimelineCard } from "@/components/ui/timeline";
import { Briefcase, GraduationCap } from "@lucide/vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import AnimatedTestimonials from "@/components/ui/animated-testimonials/AnimatedTestimonials.vue";
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue";

import { timelineData } from "@/lib/timelineData";

const expandedGalleries = ref<Record<string, boolean>>({});

const toggleGallery = (id: string) => {
  expandedGalleries.value[id] = !expandedGalleries.value[id];
};
</script>

<template>
  <section
    id="experience"
    class="w-full py-12 md:py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <Timeline :items="timelineData">
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

      <!-- Dynamic Slots for Timeline Items -->
      <template v-for="item in timelineData" :key="item.id" #[item.id]="{ isActive }">
        <TimelineCard :isActive="isActive">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div
                class="p-2 rounded-lg transition-colors duration-500"
                :class="isActive 
                  ? 'bg-[#E5BEEC]/20 text-[#917FB3] dark:text-[#E5BEEC] drop-shadow-[0_0_8px_rgba(229,190,236,0.3)]' 
                  : 'bg-neutral-200 dark:bg-[#2A2F4F] text-neutral-500 dark:text-[#917FB3]/60'"
              >
                <Briefcase v-if="item.type === 'job'" class="w-5 h-5" />
                <GraduationCap v-else-if="item.type === 'education'" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-lg md:text-xl font-bold text-foreground">{{ item.title }}</h4>
                <p class="text-xs md:text-sm font-semibold text-[#917FB3] dark:text-[#E5BEEC]">{{ item.company }}</p>
              </div>
            </div>
            
            <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="tag in item.tags" :key="tag" class="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-neutral-200/80 dark:bg-[#2A2F4F] border border-neutral-300/50 dark:border-[#917FB3]/30 text-neutral-700 dark:text-neutral-300">{{ tag }}</span>
            </div>

            <!-- View Gallery Button -->
            <div class="mt-4" v-if="item.testimonials && item.testimonials.length > 0">
              <ShimmerButton 
                @click="toggleGallery(item.id)"
                shimmerColor="#E5BEEC"
                shimmerSize="0.05em"
                background="rgba(42, 47, 79, 0.4)"
                borderRadius="8px"
                class="px-4 py-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 border-none shadow-[0_0_15px_rgba(229,190,236,0.1)]"
              >
                <span class="text-[#E5BEEC] z-10 flex items-center gap-2 text-xs font-semibold">
                  <span>{{ expandedGalleries[item.id] ? 'Tutup Galeri' : 'Lihat Galeri Pengalaman' }}</span>
                </span>
              </ShimmerButton>
            </div>

            <!-- Animated Testimonials Container (Collapsible) -->
            <div 
              class="grid transition-[grid-template-rows] duration-500 ease-in-out"
              :class="expandedGalleries[item.id] ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <AnimatedTestimonials 
                  v-if="item.testimonials"
                  :testimonials="item.testimonials" 
                  class="pt-4 pb-2"
                />
              </div>
            </div>
          </div>
        </TimelineCard>
      </template>
    </Timeline>
  </section>
</template>
