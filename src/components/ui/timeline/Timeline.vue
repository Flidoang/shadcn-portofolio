<script setup lang="ts">
import { useScroll, useTransform, Motion } from "motion-v";
import { ref } from "vue";
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
  items?: {
    id: string;
    label: string;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const containerRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 10%", "end 50%"],
});

const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

const itemRefs = ref<HTMLElement[]>([]);

function handleScroll() {
  if (!itemRefs.value.length) return;
  // Titik pemicu (trigger point): sekitar 40% dari atas layar, mendekati posisi sticky dot
  const triggerPoint = window.innerHeight * 0.4;
  
  let newActive = 0;
  for (let i = 0; i < itemRefs.value.length; i++) {
    const el = itemRefs.value[i];
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerPoint) {
        newActive = i;
      }
    }
  }
  activeIndex.value = newActive;
}

import { onMounted, onUnmounted } from "vue";
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Tambahkan sedikit delay untuk memastikan DOM sudah dirender penuh
  setTimeout(handleScroll, 100);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div ref="containerRef" class="w-full bg-transparent font-sans md:px-10">
    <div class="mx-auto max-w-7xl px-4 pt-10 pb-20 md:px-8 lg:px-10">
      <slot name="header" />
    </div>

    <div class="mx-auto max-w-7xl relative pb-20">
      <div v-for="(item, index) in items" :key="index" :ref="(el) => { if(el) itemRefs[index] = el as HTMLElement }" class="flex justify-start pt-10 md:pt-40 md:gap-10">
        <div class="sticky top-40 z-40 flex max-w-xs flex-col items-center md:w-full md:flex-row lg:max-w-sm">
          <div class="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-[#2A2F4F] md:left-3 shadow-sm border border-neutral-200 dark:border-[#917FB3]/30">
            <div 
              class="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 dark:border-[#917FB3]/50 dark:bg-[#2A2F4F] transition-all duration-500" 
              :class="activeIndex === index ? 'bg-[#E5BEEC] border-[#E5BEEC] dark:bg-[#E5BEEC] shadow-[0_0_15px_#E5BEEC]' : ''"
            />
          </div>
          <h3 
            class="hidden text-xl font-bold md:block md:pl-20 md:text-5xl transition-colors duration-500"
            :class="activeIndex === index ? 'text-[#E5BEEC] drop-shadow-[0_0_8px_rgba(229,190,236,0.3)]' : 'text-neutral-500 dark:text-[#917FB3]/60'"
          >
            {{ item.label }}
          </h3>
        </div>

        <div class="relative w-full pr-4 pl-20 md:pl-4">
          <h3 
            class="mb-4 block text-2xl font-bold md:hidden transition-colors duration-500"
            :class="activeIndex === index ? 'text-[#E5BEEC]' : 'text-neutral-500 dark:text-[#917FB3]/60'"
          >
            {{ item.label }}
          </h3>
          <slot :name="item.id" :is-active="activeIndex === index" />
        </div>
      </div>

      <div class="absolute left-8 top-0 w-[2px] h-full bg-neutral-200 dark:bg-[#917FB3]/20"></div>

      <Motion
        as="div"
        :style="{ height: heightTransform, opacity: opacityTransform }"
        class="absolute left-8 top-0 w-[2px] bg-linear-to-t from-[#E5BEEC] via-[#917FB3] to-transparent from-0% via-10% rounded-full"
      />
    </div>
  </div>
</template>
