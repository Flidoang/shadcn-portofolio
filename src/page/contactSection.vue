<script setup lang="ts">
import { ref } from "vue";
import { Mail, Send, CheckCircle2, Loader2 } from "@lucide/vue";
import SparklesText from "@/components/ui/sparkles-text/SparklesText.vue";
import CardSpotlight from "@/components/ui/card-spotlight/CardSpotlight.vue";
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import { sendEmail, WEB3FORMS_ACCESS_KEY } from "@/service/emailService";

const formStatus = ref<"idle" | "loading" | "success" | "error">("idle");
const errorMessage = ref("");

const formData = ref({
  name: "",
  email: "",
  message: ""
});

const submitForm = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    errorMessage.value = "Semua kolom wajib diisi!";
    formStatus.value = "error";
    setTimeout(() => { formStatus.value = "idle"; errorMessage.value = ""; }, 3000);
    return;
  }

  formStatus.value = "loading";

  try {
    await sendEmail(formData.value);
    
    formStatus.value = "success";
    formData.value = { name: "", email: "", message: "" }; // Reset form
    setTimeout(() => { formStatus.value = "idle"; }, 5000);
  } catch (error: any) {
    formStatus.value = "error";
    errorMessage.value = error.message || "Terjadi kesalahan koneksi.";
    setTimeout(() => { formStatus.value = "idle"; errorMessage.value = ""; }, 4000);
  }
};
</script>

<template>
  <section id="contact" class="w-full py-20 md:py-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
      
      <!-- Left Column: Content & Socials -->
      <div class="flex flex-col justify-center gap-6 lg:pr-12">
        <BlurReveal :delay="0.1" :duration="0.8">
          <SparklesText 
            text="Let's Build Something Amazing!" 
            class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
            :colors="{ first: '#E5BEEC', second: '#917FB3' }"
          />
        </BlurReveal>

        <BlurReveal :delay="0.2" :duration="0.8">
          <p class="text-lg text-muted-foreground leading-relaxed">
            Punya ide proyek yang menarik atau ingin berkolaborasi? Jangan ragu untuk menyapa! 
            Silakan isi formulir di samping, atau hubungi saya langsung melalui platform di bawah ini.
          </p>
        </BlurReveal>

        <!-- Social Links -->
        <BlurReveal :delay="0.3" :duration="0.8">
          <div class="grid grid-cols-2 gap-4 mt-4 w-full">
            <a href="https://instagram.com/username-anda" target="_blank" rel="noopener noreferrer" class="group block">
              <ShimmerButton 
                shimmerColor="#E5BEEC"
                background="transparent"
                borderRadius="12px"
                class="w-full p-0! transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(229,190,236,0.2)]"
              >
                <div class="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-transparent dark:bg-[#1A1D36]/40 backdrop-blur-sm text-foreground transition-all duration-300 h-full w-full relative z-10 border border-neutral-300 dark:border-[#917FB3]/30">
                  <svg class="w-5 h-5 fill-current text-[#917FB3] group-hover:text-[#E5BEEC] transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span class="font-medium text-sm">Instagram</span>
                </div>
              </ShimmerButton>
            </a>
            <a href="https://linkedin.com/in/username-anda" target="_blank" rel="noopener noreferrer" class="group block">
              <ShimmerButton 
                shimmerColor="#E5BEEC"
                background="transparent"
                borderRadius="12px"
                class="w-full p-0! transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(229,190,236,0.2)]"
              >
                <div class="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-transparent dark:bg-[#1A1D36]/40 backdrop-blur-sm text-foreground transition-all duration-300 h-full w-full relative z-10 border border-neutral-300 dark:border-[#917FB3]/30">
                  <svg class="w-5 h-5 fill-current text-[#917FB3] group-hover:text-[#E5BEEC] transition-colors" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span class="font-medium text-sm">LinkedIn</span>
                </div>
              </ShimmerButton>
            </a>
            <a href="https://github.com/Flidoang" target="_blank" rel="noopener noreferrer" class="group block">
              <ShimmerButton 
                shimmerColor="#E5BEEC"
                background="transparent"
                borderRadius="12px"
                class="w-full p-0! transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(229,190,236,0.2)]"
              >
                <div class="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-transparent dark:bg-[#1A1D36]/40 backdrop-blur-sm text-foreground transition-all duration-300 h-full w-full relative z-10 border border-neutral-300 dark:border-[#917FB3]/30">
                  <svg class="w-5 h-5 fill-current text-[#917FB3] group-hover:text-[#E5BEEC] transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span class="font-medium text-sm">GitHub</span>
                </div>
              </ShimmerButton>
            </a>
            <a href="https://gitlab.com/Flidoang" target="_blank" rel="noopener noreferrer" class="group block">
              <ShimmerButton 
                shimmerColor="#E5BEEC"
                background="transparent"
                borderRadius="12px"
                class="w-full p-0! transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(229,190,236,0.2)]"
              >
                <div class="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-transparent dark:bg-[#1A1D36]/40 backdrop-blur-sm text-foreground transition-all duration-300 h-full w-full relative z-10 border border-neutral-300 dark:border-[#917FB3]/30">
                  <svg class="w-5 h-5 fill-current text-[#917FB3] group-hover:text-[#E5BEEC] transition-colors" viewBox="0 0 24 24">
                    <path d="M23.955 13.587l-1.342-4.135L22.61 9.45c-.015-.044-.028-.088-.046-.13l-2.036-6.262c-.08-.248-.25-.456-.474-.582a1.077 1.077 0 0 0-1.12.035c-.212.152-.352.39-.387.653l-1.127 3.473H6.586L5.459 3.164a1.077 1.077 0 0 0-.387-.653 1.077 1.077 0 0 0-1.12-.035c-.224.126-.395.334-.474.582L1.442 9.32a.987.987 0 0 0-.045.13l-.004.004L.045 13.59a.959.959 0 0 0 .348 1.073l11.607 8.441 11.607-8.441a.959.959 0 0 0 .348-1.076z" />
                  </svg>
                  <span class="font-medium text-sm">GitLab</span>
                </div>
              </ShimmerButton>
            </a>
          </div>
        </BlurReveal>
      </div>

      <!-- Right Column: Contact Form with Card Spotlight -->
      <div class="w-full relative h-full">
        <BlurReveal :delay="0.4" :duration="0.8" class="h-full">
          <CardSpotlight 
            class="p-6 sm:p-8 rounded-2xl bg-neutral-100 dark:bg-[#1A1D36]/80 backdrop-blur-sm border border-neutral-200 dark:border-[#917FB3]/20 shadow-xl overflow-hidden h-full flex flex-col justify-center"
            :gradient-color="'#917FB3'"
          >
            <form @submit.prevent="submitForm" class="relative z-20 flex flex-col gap-5 h-full">
              
              <div class="flex flex-col gap-1.5">
                <label for="name" class="text-sm font-semibold text-foreground/80 pl-1">Name</label>
                <input 
                  id="name"
                  v-model="formData.name"
                  type="text" 
                  placeholder="John Doe"
                  class="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#2A2F4F]/60 border border-neutral-300 dark:border-[#917FB3]/30 focus:border-[#E5BEEC] focus:ring-2 focus:ring-[#E5BEEC]/20 outline-none text-foreground placeholder:text-muted-foreground/60 transition-all"
                  :disabled="formStatus === 'loading' || formStatus === 'success'"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-sm font-semibold text-foreground/80 pl-1">Email</label>
                <input 
                  id="email"
                  v-model="formData.email"
                  type="email" 
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#2A2F4F]/60 border border-neutral-300 dark:border-[#917FB3]/30 focus:border-[#E5BEEC] focus:ring-2 focus:ring-[#E5BEEC]/20 outline-none text-foreground placeholder:text-muted-foreground/60 transition-all"
                  :disabled="formStatus === 'loading' || formStatus === 'success'"
                />
              </div>

              <div class="flex flex-col gap-1.5 flex-1 min-h-[150px]">
                <label for="message" class="text-sm font-semibold text-foreground/80 pl-1">Message</label>
                <textarea 
                  id="message"
                  v-model="formData.message"
                  placeholder="Hello, I'd like to talk about..."
                  class="w-full h-full px-4 py-3 rounded-xl bg-white dark:bg-[#2A2F4F]/60 border border-neutral-300 dark:border-[#917FB3]/30 focus:border-[#E5BEEC] focus:ring-2 focus:ring-[#E5BEEC]/20 outline-none text-foreground placeholder:text-muted-foreground/60 transition-all resize-none"
                  :disabled="formStatus === 'loading' || formStatus === 'success'"
                ></textarea>
              </div>

              <!-- Status Messages -->
              <div v-if="formStatus === 'error'" class="text-red-500 text-sm font-medium pl-1 animate-pulse">
                {{ errorMessage }}
              </div>
              <div v-if="WEB3FORMS_ACCESS_KEY && formStatus === 'error'" class="text-amber-500 text-xs font-medium pl-1">
                Note: Anda belum mengganti WEB3FORMS_ACCESS_KEY di kode!
              </div>

              <!-- Submit Button -->
              <ShimmerButton 
                type="submit"
                :disabled="formStatus === 'loading' || formStatus === 'success'"
                shimmerColor="#E5BEEC"
                background="rgba(42, 47, 79, 1)"
                borderRadius="12px"
                class="w-full py-4 mt-2 transition-transform duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed border border-[#917FB3]/40"
              >
                <span class="z-10 flex items-center justify-center gap-2 font-bold text-[#E5BEEC] w-full tracking-wide">
                  <template v-if="formStatus === 'idle' || formStatus === 'error'">
                    Send Message <Send class="w-4 h-4" />
                  </template>
                  <template v-else-if="formStatus === 'loading'">
                    Sending... <Loader2 class="w-4 h-4 animate-spin" />
                  </template>
                  <template v-else-if="formStatus === 'success'">
                    Message Sent! <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                  </template>
                </span>
              </ShimmerButton>

            </form>
          </CardSpotlight>
        </BlurReveal>
      </div>
      
    </div>
  </section>
</template>
