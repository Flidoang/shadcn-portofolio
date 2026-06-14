<script setup lang="ts">
import { ChevronUp } from "@lucide/vue";
import { socialLinks } from "@/lib/sociallinkData";
import Dock from "@/components/ui/dock/Dock.vue";
import DockIcon from "@/components/ui/dock/DockIcon.vue";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
</script>

<template>
  <footer class="w-full relative z-10 pt-10 pb-6 px-4 sm:px-6 lg:px-8 mt-10">
    <!-- Gradient Divider -->
    <div class="max-w-7xl mx-auto w-full h-px bg-linear-to-r from-transparent via-[#917FB3]/40 to-transparent mb-8"></div>
    
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- Copyright text -->
      <div class="text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
        <p>&copy; {{ new Date().getFullYear() }} Rafli. All rights reserved.</p>
        <p class="mt-1 text-xs opacity-70">Designed & Built with <span class="text-red-500">❤️</span> and Vue</p>
      </div>

      <!-- Socials & Back to Top -->
      <div class="flex items-center gap-5 order-1 md:order-2">
        <!-- Small Social Icons with Dock -->
        <div class="flex items-center gap-3 mr-4 h-[58px]">
          <Dock direction="middle" class="!mt-0 !p-0 !border-none !bg-transparent backdrop-blur-none">
            <DockIcon 
              v-for="(link, index) in socialLinks" 
              :key="index"
            >
              <a 
                :href="link.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center justify-center p-2 rounded-full bg-neutral-200/50 dark:bg-[#2A2F4F]/50 border border-neutral-300 dark:border-[#917FB3]/30 hover:bg-white dark:hover:bg-[#2A2F4F] hover:border-[#E5BEEC] transition-all text-foreground/70 hover:text-[#E5BEEC] w-full h-full"
                :title="link.name"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path :d="link.iconPath" />
                </svg>
              </a>
            </DockIcon>
          </Dock>
        </div>

        <!-- Back to Top Button -->
        <button 
          @click="scrollToTop"
          class="flex items-center justify-center p-2.5 rounded-full bg-[#917FB3]/20 hover:bg-[#917FB3]/40 border border-[#917FB3]/40 hover:border-[#E5BEEC] transition-all duration-300 text-[#917FB3] hover:text-[#E5BEEC] group"
          title="Back to Top"
        >
          <ChevronUp class="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

    </div>
  </footer>
</template>
