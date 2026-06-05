<script lang="ts" setup>
interface Props {
  isActive?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div
    class="relative w-full rounded-2xl border p-5 md:p-6 bg-neutral-100/50 dark:bg-neutral-900/40 border-neutral-200/60 dark:border-neutral-850/60 backdrop-blur-xs transform-gpu"
    :style="{
      transform: isActive 
        ? 'perspective(1000px) translateZ(35px) scale(1.025)' 
        : 'perspective(1000px) translateZ(0px) scale(0.975)',
      opacity: isActive ? 1.0 : 0.35,
      borderColor: isActive ? 'rgba(168, 85, 247, 0.45)' : '',
      boxShadow: isActive 
        ? '0 15px 40px rgba(168, 85, 247, 0.15), 0 0 25px rgba(59, 130, 246, 0.1)' 
        : 'none',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
    }"
  >
    <!-- Efek Pendar Sinar Pojok (Corner Light Glow) ketika aktif -->
    <div
      class="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
      :class="isActive ? 'opacity-100' : 'opacity-0'"
    />
    <div
      class="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
      :class="isActive ? 'opacity-100' : 'opacity-0'"
    />

    <slot />
  </div>
</template>
