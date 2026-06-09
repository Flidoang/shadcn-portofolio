<script setup lang="ts">
import { ref, computed } from "vue";
import { useMouse, useWindowSize } from "@vueuse/core";
import { MapPin, CheckCircle, Code } from "@lucide/vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import FlipWords from "@/components/ui/flip-words/FlipWords.vue";
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue";
import SparklesText from "@/components/ui/sparkles-text/SparklesText.vue";
import CardSpotlight from "@/components/ui/card-spotlight/CardSpotlight.vue";
import photoUrl from "@/assets/photo.png";

const activeTab = ref("workspace");

const { x: mouseX, y: mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindowSize();

// Parallax calculation for background text
const bgParallaxStyle = computed(() => {
  if (typeof window === "undefined" || windowWidth.value === 0) return {};
  const dx = (mouseX.value - windowWidth.value / 2) / 30;
  const dy = (mouseY.value - windowHeight.value / 2) / 30;
  return {
    transform: `translate3d(${-dx}px, ${-dy}px, 0)`,
  };
});

// Parallax for floating badges (subtle)
const badgeParallax1 = computed(() => {
  if (typeof window === "undefined" || windowWidth.value === 0) return {};
  const dx = (mouseX.value - windowWidth.value / 2) / 40;
  const dy = (mouseY.value - windowHeight.value / 2) / 40;
  return {
    transform: `translate3d(${dx}px, ${dy}px, 0)`,
  };
});

const badgeParallax2 = computed(() => {
  if (typeof window === "undefined" || windowWidth.value === 0) return {};
  const dx = (mouseX.value - windowWidth.value / 2) / 25;
  const dy = (mouseY.value - windowHeight.value / 2) / 25;
  return {
    transform: `translate3d(${-dx * 0.5}px, ${-dy * 0.5}px, 0)`,
  };
});

const badgeParallax3 = computed(() => {
  if (typeof window === "undefined" || windowWidth.value === 0) return {};
  const dx = (mouseX.value - windowWidth.value / 2) / 50;
  const dy = (mouseY.value - windowHeight.value / 2) / 50;
  return {
    transform: `translate3d(${dx * 0.8}px, ${dy * 0.8}px, 0)`,
  };
});

const isSmallScreen = computed(() => {
  if (typeof window === "undefined") return false;
  return windowWidth.value < 1280;
});
</script>

<template>
  <main class="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 md:py-0 lg:px-16 max-w-7xl mx-auto w-full overflow-hidden select-none">
    
    <!-- Background Large Parallax Text -->
    <div 
      class="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none select-none transition-all duration-500"
      :class="[
        isSmallScreen ? 'animate-slow-drift opacity-[0.06]' : 'opacity-[0.04]'
      ]"
      :style="isSmallScreen ? {} : bgParallaxStyle"
    >
      <span class="text-[12vw] font-black text-[#917FB3] tracking-widest font-mono">RAFLI HENDARSYAH</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
      
      <!-- Left Column: Content (7 cols) -->
      <div class="flex flex-col text-center lg:text-left items-center lg:items-start lg:col-span-7 order-2 lg:order-1">
        <BlurReveal :delay="0.1" :duration="0.8">
          
          <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Hi, I am 
            <SparklesText 
              text="Rafli Hendarsyah" 
              :sparkles-count="4"
              class="inline-block text-xl sm:text-3xl lg:text-5xl font-extrabold bg-linear-to-r from-[#FDE2F3] to-[#E5BEEC] bg-clip-text text-transparent [&>span]:bg-linear-to-r [&>span]:from-[#FDE2F3] [&>span]:to-[#E5BEEC] [&>span]:bg-clip-text [&>span]:text-transparent"
              :colors="{ first: '#FDE2F3', second: '#E5BEEC' }"
            />
          </h1>
          
          <div class="mt-4 text-xl sm:text-2xl font-medium text-muted-foreground flex flex-wrap items-center justify-center lg:justify-start gap-1">
            <span>Building digital products as a</span> 
            <FlipWords :words="['Developer', 'Designer', 'Innovator']" class="text-[#FDE2F3] font-bold" />
          </div>

          <p class="mt-6 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Saya mendesain dan membangun aplikasi web berkinerja tinggi, berestetika premium, serta memiliki interaksi halus menggunakan ekosistem Vue, Tailwind CSS, dan TypeScript.
          </p>

          <!-- Interactive Workspace Sandbox -->
          <div class="mt-8 bg-[#2A2F4F]/40 border border-[#917FB3]/30 rounded-2xl p-4 backdrop-blur-md max-w-xl w-full text-left transition-all duration-300 hover:border-[#E5BEEC]/40 hover:shadow-[0_0_25px_rgba(229,190,236,0.15)]">
            <div class="flex items-center justify-between border-b border-[#917FB3]/20 pb-2 mb-3">
              <div class="flex gap-1.5">
                <div class="size-2.5 rounded-full bg-red-500/80" />
                <div class="size-2.5 rounded-full bg-yellow-500/80" />
                <div class="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <div class="flex gap-2">
                <button 
                  @click="activeTab = 'workspace'" 
                  class="text-[10px] font-bold px-2 py-1 rounded transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                  :class="activeTab === 'workspace' ? 'text-[#FDE2F3] bg-[#E5BEEC]/20 border border-[#E5BEEC]/30' : 'text-muted-foreground hover:text-foreground border border-transparent'"
                >
                  Workspace.vue
                </button>
                <button 
                  @click="activeTab = 'focus'" 
                  class="text-[10px] font-bold px-2 py-1 rounded transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                  :class="activeTab === 'focus' ? 'text-[#FDE2F3] bg-[#E5BEEC]/20 border border-[#E5BEEC]/30' : 'text-muted-foreground hover:text-foreground border border-transparent'"
                >
                  Key Focus
                </button>
              </div>
            </div>
            
            <div class="h-28 font-mono text-[11px] overflow-hidden flex flex-col justify-center">
              <Transition name="fade" mode="out-in">
                <div v-if="activeTab === 'workspace'" class="text-foreground/90 whitespace-pre-wrap leading-relaxed">
<span class="text-[#917FB3] font-semibold">&lt;template&gt;</span>
  <span class="text-[#917FB3] font-semibold">&lt;div</span> <span class="text-[#E5BEEC]">class</span>=<span class="text-emerald-400">"dev-lab"</span><span class="text-[#917FB3]">&gt;</span>
    <span class="text-foreground/80 font-sans">    Building clean & responsive web interface.</span>
    <span class="text-foreground/80 font-sans">    Delivering premium interactive layouts.</span>
  <span class="text-[#917FB3] font-semibold">&lt;/div&gt;</span>
<span class="text-[#917FB3] font-semibold">&lt;/template&gt;</span></div>
                <div v-else class="flex flex-col gap-2.5 justify-center h-full">
                  <div v-for="focus in [
                    { label: 'Creative Frontend Development', val: 95 },
                    { label: 'Interactive Animations & UI', val: 90 },
                    { label: 'Clean Code & Refactoring', val: 92 }
                  ]" :key="focus.label" class="flex flex-col gap-1">
                    <div class="flex justify-between text-[10px] text-muted-foreground">
                      <span class="font-sans">{{ focus.label }}</span>
                      <span class="text-[#E5BEEC] font-bold font-mono">{{ focus.val }}%</span>
                    </div>
                    <div class="w-full bg-[#2A2F4F]/40 rounded-full h-1.5 overflow-hidden border border-[#917FB3]/20">
                      <div class="bg-[#E5BEEC] h-full rounded-full transition-all duration-1000" :style="{ width: `${focus.val}%` }" />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <ShimmerButton 
              shimmer-color="#FFFFFF"
              class="px-6 py-3 text-sm font-semibold rounded-xl border border-[#917FB3]/50 text-[#2A2F4F] hover:opacity-90 transition-all duration-300 cursor-pointer"
              background="#FDE2F3"
            >
              View Projects
            </ShimmerButton>
            <button class="px-6 py-3 rounded-xl border border-[#917FB3]/50 bg-transparent text-[#FDE2F3] hover:bg-[#917FB3]/20 hover:border-[#E5BEEC]/60 hover:text-white transition-all duration-300 font-semibold text-sm cursor-pointer">
              Contact Me
            </button>
          </div>
        </BlurReveal>
      </div>

      <!-- Right Column: Image with Orbiting Badges (5 cols) -->
      <div class="flex items-center justify-center lg:col-span-5 order-1 lg:order-2 relative h-[350px] sm:h-[400px] w-full">
        <BlurReveal :delay="0.3" :duration="0.8">
          <div class="relative flex items-center justify-center w-full h-full">
            
            <!-- Floating Badge 1 (Top Left) -->
            <div 
              class="absolute z-30 -left-6 top-8 animate-float-1 bg-[#2A2F4F]/85 backdrop-blur-md border border-[#917FB3]/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg select-none cursor-default hover:border-[#E5BEEC]/60 hover:shadow-[0_0_15px_rgba(229,190,236,0.3)] transition-all duration-300"
              :style="badgeParallax1"
            >
              <MapPin class="size-3.5 text-[#E5BEEC]" />
              <span class="text-[10px] font-bold text-foreground font-sans">Based in Bandung 🇮🇩</span>
            </div>

            <!-- Floating Badge 2 (Right Middle) -->
            <div 
              class="absolute z-30 -right-4 top-1/2 -translate-y-1/2 animate-float-2 bg-[#2A2F4F]/85 backdrop-blur-md border border-[#917FB3]/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg select-none cursor-default hover:border-[#E5BEEC]/60 hover:shadow-[0_0_15px_rgba(229,190,236,0.3)] transition-all duration-300"
              :style="badgeParallax2"
            >
              <CheckCircle class="size-3.5 text-emerald-400 animate-pulse" />
              <span class="text-[10px] font-bold text-foreground font-sans">Available for Work</span>
            </div>

            <!-- Floating Badge 3 (Bottom Left) -->
            <div 
              class="absolute z-30 left-4 bottom-8 animate-float-3 bg-[#2A2F4F]/85 backdrop-blur-md border border-[#917FB3]/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg select-none cursor-default hover:border-[#E5BEEC]/60 hover:shadow-[0_0_15px_rgba(229,190,236,0.3)] transition-all duration-300"
              :style="badgeParallax3"
            >
              <Code class="size-3.5 text-[#E5BEEC]" />
              <span class="text-[10px] font-bold text-foreground font-sans">Learning & Building</span>
            </div>

            <!-- Main Avatar Container using CardSpotlight -->
            <CardSpotlight
              gradient-color="rgba(229, 190, 236, 0.15)"
              :gradient-size="200"
              :gradient-opacity="0.8"
              class="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-[#917FB3]/40 bg-[#2A2F4F]/30 backdrop-blur-xl shadow-2xl cursor-pointer group hover:border-[#E5BEEC]/60 hover:shadow-[0_0_40px_rgba(229,190,236,0.3)] transition-all duration-500"
            >
              <img
                :src="photoUrl"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Profile Photo"
              />
            </CardSpotlight>
          </div>
        </BlurReveal>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Floating animations with varying durations and rotations */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}
@keyframes float-2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-1.5deg); }
}
@keyframes float-3 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(0.5deg); }
}
@keyframes slow-drift {
  0% {
    transform: translate3d(0px, 0px, 0) rotate(0deg);
  }
  25% {
    transform: translate3d(15px, -10px, 0) rotate(0.5deg);
  }
  50% {
    transform: translate3d(-10px, -20px, 0) rotate(-0.5deg);
  }
  75% {
    transform: translate3d(-15px, -5px, 0) rotate(0.2deg);
  }
  100% {
    transform: translate3d(0px, 0px, 0) rotate(0deg);
  }
}

.animate-float-1 {
  animation: float-1 6s ease-in-out infinite;
}
.animate-float-2 {
  animation: float-2 5s ease-in-out infinite;
}
.animate-float-3 {
  animation: float-3 7s ease-in-out infinite;
}
.animate-slow-drift {
  animation: slow-drift 25s ease-in-out infinite;
}

/* Custom fade animation for sandbox tabs */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>