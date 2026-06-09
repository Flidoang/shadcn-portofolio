<script lang="ts" setup>
import CardSpotlight from "@/components/ui/card-spotlight/CardSpotlight.vue";
import SparklesText from "@/components/ui/sparkles-text/SparklesText.vue";
import FlipWords from "@/components/ui/flip-words/FlipWords.vue";
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue";
import photoUrl from "@/assets/photo.png";
</script>

<template>
  <!-- Box 1: Profile & Bio (col-span-2, row-span-1) -->
  <CardSpotlight
    class="md:col-span-2 md:row-span-1 bg-transparent dark:bg-transparent border border-[#917FB3]/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,190,236,0.15)] hover:border-[#E5BEEC]/60 group flex flex-col justify-between select-none cursor-pointer"
    gradient-color="rgba(229, 190, 236, 0.15)"
    :gradient-size="250"
    :gradient-opacity="0.8"
  >
    <div class="flex flex-col md:flex-row justify-between h-full gap-6 w-full items-center md:items-start">
      <div class="flex flex-col gap-3 justify-center h-full max-w-xl">
        <div class="flex items-center gap-2 text-xs font-semibold text-[#E5BEEC] uppercase tracking-widest">
          Profile & Bio
        </div>
        
        <h4 class="text-xl md:text-2xl font-extrabold text-foreground leading-snug flex flex-wrap items-center gap-x-2 gap-y-1">
          Halo, saya 
          <SparklesText 
            text="Rafli Hendarsyah" 
            :sparkles-count="3"
            class="text-xl md:text-2xl font-extrabold inline-block [&>span]:bg-linear-to-r [&>span]:from-[#FDE2F3] [&>span]:to-[#E5BEEC] [&>span]:bg-clip-text [&>span]:text-transparent"
            :colors="{ first: '#FDE2F3', second: '#E5BEEC' }"
          />
        </h4>
        
        <p class="text-muted-foreground text-xs md:text-sm leading-relaxed">
          Hai! Saya seorang mahasiswa sekaligus fullstack developer yang hobi membangun aplikasi web (end-to-end). 
          Fokus utama saya saat ini adalah membangun sistem backend yang andal dan antarmuka frontend yang 
          <FlipWords :words="['skalabel', 'aman', 'interaktif', 'modern']" class="text-[#E5BEEC] font-semibold" /> 
          menggunakan ekosistem Node.js, Vue.js, PostgreSQL, dan TypeScript.
        </p>
        
        <div class="flex flex-wrap gap-1.5 mt-2">
          <ShimmerButton
            v-for="skill in ['Vue.js', 'Node.js', 'NestJS/Express', 'PostgreSQL', 'TypeScript', 'Git']"
            :key="skill"
            class="px-2.5 py-0.5 text-[10px] font-semibold rounded-lg border border-[#917FB3]/50 text-[#E5BEEC] dark:text-[#E5BEEC] hover:text-white transition-all duration-300 cursor-default"
            background="rgba(42, 47, 79, 0.4)"
            shimmer-color="#E5BEEC"
            shimmer-size="0.04em"
            shimmer-duration="4s"
          >
            {{ skill }}
          </ShimmerButton>
        </div>
      </div>
      
      <!-- Photo inside glowing frame -->
      <div class="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden border border-[#917FB3]/40 bg-[#2A2F4F]/30 shadow-lg group-hover:scale-[1.03] transition-transform duration-500 self-center md:self-end">
        <img :src="photoUrl" class="w-full h-full object-cover" alt="Profile avatar" />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div class="absolute bottom-1.5 left-2 right-2 text-white flex flex-col pointer-events-none">
          <span class="text-[9px] font-semibold tracking-wider uppercase opacity-90">IDN 🇮🇩</span>
        </div>
      </div>
    </div>
  </CardSpotlight>
</template>
