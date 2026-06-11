<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";
import { ParticlesBg } from "@/components/ui/particles-bg";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
</script>

<template>
  <div
    class="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden"
  >
    <ParticlesBg
      :key="isDark.toString()"
      class="fixed inset-0 z-0 pointer-events-none"
      :quantity="100"
      :ease="100"
      :color="isDark ? '#FFF' : '#000'"
      :staticity="10"
      refresh
    />
    <slot />
  </div>
</template>

