<script setup lang="ts">
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue"
import FlipWords from "@/components/ui/flip-words/FlipWords.vue"
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue"
import SparklesText from "@/components/ui/sparkles-text/SparklesText.vue"
import CardSpotlight from "@/components/ui/card-spotlight/CardSpotlight.vue"
import photoUrl from "@/assets/photo.png"
</script>

<template>
  <main class="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 md:py-0 lg:px-16 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
      
      <!-- Left Column: Content -->
      <div class="flex flex-col text-center md:text-left items-center md:items-start order-2 md:order-1">
        <BlurReveal :delay="0.1" :duration="0.8">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Welcome to my Space
          </h2>
          
          <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Hi, I am <SparklesText text="Rafli Hendarsyah" class="inline-block text-primary" />
          </h1>
          
          <div class="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground">
            Building digital products as a 
            <FlipWords :words="['Developer', 'Designer', 'Student']" class="text-primary font-semibold" />
          </div>

          <p class="mt-6 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            I design and build beautiful, modern, and high-performance web applications using Vue, Tailwind, Shadcn and Inspira.
          </p>

          <div class="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
            <ShimmerButton shimmer-color="#ffffff">
              View Projects
            </ShimmerButton>
            <button class="px-6 py-3 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200">
              Contact Me
            </button>
          </div>
        </BlurReveal>
      </div>

      <!-- Right Column: Image with CardSpotlight -->
      <div class="flex items-center justify-center order-1 md:order-2">
        <BlurReveal :delay="0.3" :duration="0.8">
          <CardSpotlight
            gradient-color="#38ef7d20"
            :gradient-size="200"
            class="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-border/80 bg-card shadow-2xl cursor-pointer group"
          >
            <img
              :src="photoUrl"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Profile Photo"
            />
          </CardSpotlight>
        </BlurReveal>
      </div>

    </div>
  </main>
</template>