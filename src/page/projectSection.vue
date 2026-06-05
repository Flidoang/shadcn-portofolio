<script lang="ts" setup>
import { ref, watch, onUnmounted } from "vue";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "@lucide/vue";
import CardContainer from "@/components/ui/card-3d/CardContainer.vue";
import CardBody from "@/components/ui/card-3d/CardBody.vue";
import CardItem from "@/components/ui/card-3d/CardItem.vue";
import SafariMockup from "@/components/ui/safari-mockup/SafariMockup.vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import TextGlitch from "@/components/ui/text-glitch/TextGlitch.vue";

// Project assets
import p1_1 from "@/assets/project1_1.png";
import p1_2 from "@/assets/project1_2.png";
import p2_1 from "@/assets/project2_1.png";
import p2_2 from "@/assets/project2_2.png";
import p3_1 from "@/assets/project3_1.png";
import p3_2 from "@/assets/project3_2.png";

interface Project {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  url: string;
  tags: string[];
  screenshots: string[];
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: "Zenith Analytics",
    description: "SaaS dashboard with real-time financial tracking and modern glassmorphism charts.",
    extendedDescription: "Zenith Analytics is an enterprise-grade SaaS intelligence dashboard built to visualize complex business datasets in real-time. It features custom-built charts with smooth CSS animations, dark-mode styling with glowing borders, and collaborative workspace widgets. Implemented with Vue 3, Pinia, and ECharts.",
    url: "zenith.io/dashboard",
    tags: ["Vue 3", "Tailwind CSS", "ECharts", "TypeScript", "SaaS"],
    screenshots: [p1_1, p1_2],
  },
  {
    id: 2,
    title: "Nova E-Commerce",
    description: "Minimalist fashion store UI with responsive cart systems and smooth flow.",
    extendedDescription: "Nova is a head-turning headless e-commerce frontend designed for premium lifestyle brands. Incorporating editorial aesthetics, smooth custom page transitions, state-managed shopping cart logic, and modular product catalog widgets. It is optimized for sub-second page loads and mobile conversions.",
    url: "nova-store.design",
    tags: ["Vue 3", "Vite", "Tailwind CSS", "State Management", "Stripe"],
    screenshots: [p2_1, p2_2],
  },
  {
    id: 3,
    title: "Chrono Task Space",
    description: "Agile management tool with collaborative Kanban boards and calendars.",
    extendedDescription: "Chrono is a highly interactive workspace app for modern agile squads. It features a custom drag-and-drop Kanban board, a team schedule calendar, and gantt chart timelines. It leverages WebSockets for instantaneous real-time updates across multiple team members.",
    url: "chrono-workspace.net",
    tags: ["Vue 3", "WebSockets", "Tailwind CSS", "Kanban", "Collaboration"],
    screenshots: [p3_1, p3_2],
  },
]);

const selectedProject = ref<Project | null>(null);
const isModalOpen = ref(false);
const currentIndex = ref(0);

function openProjectDetails(project: Project) {
  selectedProject.value = project;
  currentIndex.value = 0;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function nextSlide() {
  if (!selectedProject.value) return;
  currentIndex.value = (currentIndex.value + 1) % selectedProject.value.screenshots.length;
}

function prevSlide() {
  if (!selectedProject.value) return;
  currentIndex.value =
    (currentIndex.value - 1 + selectedProject.value.screenshots.length) %
    selectedProject.value.screenshots.length;
}

function goToSlide(index: number) {
  currentIndex.value = index;
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
}

watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
  } else {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section id="projects" class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 max-w-7xl mx-auto w-full gap-12">
    <!-- Header Section -->
    <div class="text-center max-w-2xl z-10 flex flex-col items-center">
      <BlurReveal :delay="0.1" :duration="0.8">
        <TextGlitch
          :speed="1"
          :enable-shadows="true"
          text="Featured Projects"
        />
        <p class="mt-4 text-muted-foreground text-base sm:text-lg">
          Kumpulan project terbaik yang pernah saya kerjakan, memadukan fungsionalitas tingkat tinggi dengan desain antarmuka yang bersih dan interaktif.
        </p>
      </BlurReveal>
    </div>

    <!-- Project Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
      <CardContainer 
        v-for="project in projects" 
        :key="project.id"
        class="w-full"
      >
        <CardBody class="bg-card text-card-foreground relative group/card hover:shadow-2xl hover:shadow-primary/5 border border-border/80 w-full h-[460px] rounded-2xl p-6 flex flex-col justify-between transition-colors duration-300 hover:border-primary/30">
          
          <div style="transform-style: preserve-3d;">
            <!-- Title -->
            <CardItem :translate-z="40" class="text-xl font-bold tracking-tight text-foreground group-hover/card:text-primary transition-colors">
              {{ project.title }}
            </CardItem>
            
            <!-- Description -->
            <CardItem :translate-z="30" class="text-muted-foreground text-sm mt-3 leading-relaxed">
              {{ project.description }}
            </CardItem>
          </div>
          
          <!-- Image Representing the project -->
          <CardItem :translate-z="60" class="w-full mt-6 h-48 rounded-xl overflow-hidden border border-border/50 bg-muted/40 relative">
            <img 
              :src="project.screenshots[0]" 
              class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out" 
              :alt="project.title"
            />
          </CardItem>
          
          <!-- Tags and Action Button -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-border/40" style="transform-style: preserve-3d;">
            <CardItem :translate-z="30" class="flex gap-1.5 flex-wrap max-w-[200px]">
              <span 
                v-for="tag in project.tags.slice(0, 2)" 
                :key="tag" 
                class="px-2.5 py-1 text-[11px] font-medium bg-secondary text-secondary-foreground border border-border rounded-md shadow-sm"
              >
                {{ tag }}
              </span>
              <span v-if="project.tags.length > 2" class="px-1.5 py-1 text-[11px] text-muted-foreground font-medium">
                +{{ project.tags.length - 2 }}
              </span>
            </CardItem>
            
            <CardItem 
              :translate-z="50" 
              as="button" 
              @click="openProjectDetails(project)" 
              class="px-4 py-2 rounded-xl bg-foreground text-background dark:bg-white dark:text-black hover:opacity-90 active:scale-95 transition-all text-xs font-semibold shadow-md flex items-center gap-1 cursor-pointer"
            >
              Get Started
            </CardItem>
          </div>
          
        </CardBody>
      </CardContainer>
    </div>

    <!-- Modal Detail Project (Teleport to Body) -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen && selectedProject" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        >
          <!-- Backdrop Blur -->
          <div 
            class="absolute inset-0 bg-black/80 backdrop-blur-md" 
            @click="closeModal" 
          />
          
          <!-- Modal Card Container -->
          <div class="modal-content relative w-full max-w-4xl bg-card border border-border rounded-2xl p-4 md:p-6 flex flex-col gap-6 shadow-2xl z-10 overflow-hidden">
            
            <!-- Header: Title, Link & Close -->
            <div class="flex justify-between items-start gap-4">
              <div class="min-w-0">
                <div class="flex items-center gap-3">
                  <h3 class="text-2xl font-bold text-foreground truncate">
                    {{ selectedProject.title }}
                  </h3>
                  <a 
                    :href="'https://' + selectedProject.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <span class="hidden sm:inline">{{ selectedProject.url }}</span>
                    <ExternalLink class="w-4 h-4 shrink-0" />
                  </a>
                </div>
                
                <!-- Full tech stack tags -->
                <div class="flex flex-wrap gap-2 mt-2">
                  <span 
                    v-for="tag in selectedProject.tags" 
                    :key="tag" 
                    class="px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- Close Button -->
              <button 
                @click="closeModal" 
                class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/80 transition-colors shrink-0"
                aria-label="Close details"
              >
                <X class="w-6 h-6" />
              </button>
            </div>
            
            <!-- Browser Mockup Window -->
            <div class="w-full relative rounded-lg overflow-hidden border border-border bg-muted/20">
              <SafariMockup 
                :url="selectedProject.url" 
                class="w-full h-auto aspect-1203/753"
              >
                <!-- Carousel inside Mockup -->
                <div class="relative w-full h-full overflow-hidden group">
                  
                  <!-- Sliding Container -->
                  <div 
                    class="absolute inset-0 flex transition-transform duration-500 ease-out" 
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                  >
                    <div 
                      v-for="(img, idx) in selectedProject.screenshots" 
                      :key="idx" 
                      class="w-full h-full shrink-0 bg-secondary"
                    >
                      <img 
                        :src="img" 
                        class="w-full h-full object-cover select-none pointer-events-none" 
                        alt="Project screenshot"
                      />
                    </div>
                  </div>
                  
                  <!-- Prev Arrow Button -->
                  <button 
                    @click="prevSlide" 
                    class="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center border border-white/10 shadow-lg cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft class="w-5 h-5" />
                  </button>
                  
                  <!-- Next Arrow Button -->
                  <button 
                    @click="nextSlide" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center border border-white/10 shadow-lg cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight class="w-5 h-5" />
                  </button>
                  
                </div>
              </SafariMockup>
            </div>
            
            <!-- Footer: Description & Slide dots -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {{ selectedProject.extendedDescription }}
              </p>
              
              <!-- Slide counter & Dot Indicators -->
              <div class="flex flex-col items-end gap-2 shrink-0 self-end sm:self-center">
                <span class="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                  Slide {{ currentIndex + 1 }} / {{ selectedProject.screenshots.length }}
                </span>
                <div class="flex gap-1.5">
                  <button 
                    v-for="(_img, idx) in selectedProject.screenshots" 
                    :key="idx" 
                    @click="goToSlide(idx)" 
                    class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer" 
                    :class="idx === currentIndex ? 'bg-primary w-4' : 'bg-muted-foreground/35 hover:bg-muted-foreground/60'"
                    :aria-label="'Go to slide ' + (idx + 1)"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}
</style>
