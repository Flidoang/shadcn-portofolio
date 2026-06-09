<script lang="ts" setup>
import { BentoGrid } from "@/components/ui/bento-grid";
import ProfileCard from "@/components/about/ProfileCard.vue";
import TimezoneCard from "@/components/about/TimezoneCard.vue";
import GitLabCard from "@/components/about/GitLabCard.vue";
import GitHubCard from "@/components/about/GitHubCard.vue";
</script>

<template>
  <section id="about" class="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 md:py-0 lg:px-16 max-w-7xl mx-auto w-full">
    <div class="w-full flex flex-col gap-12">
      <!-- Section Title -->
      <div class="text-center max-w-2xl mx-auto flex flex-col items-center">
        <h3 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bento Grid Showcase
        </h3>
        <p class="mt-4 text-muted-foreground text-base sm:text-lg">
          Kenali saya lebih dekat lewat kompilasi cuplikan aktivitas, hobi, dan rutinitas harian saya yang disajikan dalam Bento Grid layout.
        </p>
      </div>

      <!-- Bento Grid Container -->
      <BentoGrid class="gap-6 md:auto-rows-[16rem] lg:auto-rows-[18rem] w-full">
        <!-- Box 1: Profile & Bio (col-span-2, row-span-1) -->
        <ProfileCard />

        <!-- Box 2: Timezone Clock (col-span-1, row-span-1) -->
        <TimezoneCard />

        <!-- Box 3: GitLab Contribution Calendar (col-span-3, row-span-1) -->
        <GitLabCard />

        <!-- Box 4: GitHub contribution graph (col-span-3, row-span-1) -->
        <GitHubCard />
      </BentoGrid>
    </div>
  </section>
</template>