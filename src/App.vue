<script setup lang="ts">
import bgComponent from './components/bgComponent.vue'
import SleekLineCursor from "./components/ui/sleek-line-cursor/SleekLineCursor.vue";
import menubarComponent from "./components/menubarComponent.vue";
import heroSection from "./page/heroSection.vue";
import aboutSection from "./page/aboutSection.vue";
import toolsSection from "./page/toolsSection.vue";
import projectSection from "./page/projectSection.vue";
import timelineSection from "./page/timelineSection.vue";
</script>

<template>
  <bgComponent>
    <!-- 1. Menubar di bagian atas -->
    <menubarComponent class="fixed top-4 left-1/2 -translate-x-1/2 z-50" />

    <!-- 2. Konten Utama Hero Section -->
    <heroSection />

    <!-- 3. about Section -->
    <aboutSection />
    
    <!-- 4. Tools Section -->
    <toolsSection />
    
    <!-- 5. Projects Section -->
    <projectSection />
    
    <!-- 5. Experience Timeline Section -->
    <timelineSection />


    
  </bgComponent>

  <!-- Cursor Efek -->
  <SleekLineCursor />
</template>
