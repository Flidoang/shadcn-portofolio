<script setup lang="ts">
import { Mail, ChevronUp } from "@lucide/vue";

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
        <!-- Small Social Icons -->
        <div class="flex items-center gap-3 mr-4">
          <a href="mailto:emailanda@gmail.com" class="p-2 rounded-full bg-neutral-200/50 dark:bg-[#2A2F4F]/50 border border-neutral-300 dark:border-[#917FB3]/30 hover:bg-white dark:hover:bg-[#2A2F4F] hover:border-[#E5BEEC] transition-all text-foreground/70 hover:text-[#E5BEEC]">
            <Mail class="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/username-anda" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-neutral-200/50 dark:bg-[#2A2F4F]/50 border border-neutral-300 dark:border-[#917FB3]/30 hover:bg-white dark:hover:bg-[#2A2F4F] hover:border-[#E5BEEC] transition-all text-foreground/70 hover:text-[#E5BEEC]">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/Flidoang" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-neutral-200/50 dark:bg-[#2A2F4F]/50 border border-neutral-300 dark:border-[#917FB3]/30 hover:bg-white dark:hover:bg-[#2A2F4F] hover:border-[#E5BEEC] transition-all text-foreground/70 hover:text-[#E5BEEC]">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
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
