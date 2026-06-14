<script setup lang="ts">
import { ref } from "vue";
import { Send, CheckCircle2, Loader2 } from "@lucide/vue";
import SparklesText from "@/components/ui/sparkles-text/SparklesText.vue";
import CardSpotlight from "@/components/ui/card-spotlight/CardSpotlight.vue";
import ShimmerButton from "@/components/ui/shimmer-button/ShimmerButton.vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import { sendEmail, WEB3FORMS_ACCESS_KEY } from "@/service/emailService";
import { socialLinks } from "@/lib/sociallinkData";

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
            <a 
              v-for="(link, index) in socialLinks" 
              :key="index"
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="group block"
            >
              <ShimmerButton 
                shimmerColor="#E5BEEC"
                background="transparent"
                borderRadius="12px"
                class="w-full p-0! transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgba(229,190,236,0.2)]"
              >
                <div class="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-transparent dark:bg-[#1A1D36]/40 backdrop-blur-sm text-foreground transition-all duration-300 h-full w-full relative z-10 border border-neutral-300 dark:border-[#917FB3]/30">
                  <svg class="w-5 h-5 fill-current text-[#917FB3] group-hover:text-[#E5BEEC] transition-colors" viewBox="0 0 24 24">
                    <path :d="link.iconPath" />
                  </svg>
                  <span class="font-medium text-sm">{{ link.name }}</span>
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
