<script lang="ts" setup>
import { AnimateGrid } from "@/components/ui/animate-grid";
import HyperText from "@/components/ui/hyper-text/HyperText.vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";

interface Props {
  textGlowStartColor?: string;
  perspective?: number;
  textGlowEndColor?: string;
  rotateX?: number;
  rotateY?: number;
}

const props = defineProps<Props>();

// Import semua SVG dari folder assets secara dinamis
const svgModules = import.meta.glob<string>("../assets/logo/*.svg", {
  eager: true,
  import: "default",
});

const cards = Object.values(svgModules).map((url) => ({
  logo: url,
}));
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-4 py-24 gap-12">
    <!-- Header Section -->
    <div class="text-center max-w-2xl z-10 flex flex-col items-center">
      <BlurReveal :delay="0.1" :duration="0.8">
        <HyperText
          text="Tools & Technologies"
          :animate-on-load="true"
          class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl justify-center"
        />
        <p class="mt-4 mb-8 text-muted-foreground text-base sm:text-lg">
          Berikut adalah bahasa pemrograman, framework, database, dan tools yang biasa saya gunakan untuk membangun aplikasi web modern yang interaktif dan responsif.
        </p>
      </BlurReveal>
    </div>
    <!-- Animated Grid -->
    <AnimateGrid
      :cards
      
      v-bind="props"
    >
      <template #logo="{ logo }">
        <img
          class="logo mx-auto h-12 md:h-14 w-auto transition-transform duration-300 hover:scale-110 object-contain"
          :src="logo"
        />
      </template>
    </AnimateGrid>
  </div>
</template>

