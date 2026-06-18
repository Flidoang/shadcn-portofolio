<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import { LiquidGlass } from "@/components/ui/liquid-glass";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};


</script>

<template>
  <LiquidGlass class="p-2 flex items-center justify-center">
    <NavigationMenu :viewport="false">
      <NavigationMenuList>
        <!-- PROFILE MENU -->
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <NavigationMenuLink as-child>
                  <a
                    class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md cursor-pointer"
                    @click.prevent="scrollToSection('about')"
                  >
                    <div class="mt-4 mb-2 text-lg font-medium">About Me</div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Mengenal lebih dekat siapa saya, perjalanan karir, dan passion saya dalam pengembangan web.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    @click.prevent="scrollToSection('tools')"
                  >
                    <div class="text-sm font-medium leading-none">Tools & Tech</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Teknologi yang biasa saya gunakan.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    @click.prevent="scrollToSection('experience')"
                  >
                    <div class="text-sm font-medium leading-none">Experience</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Perjalanan edukasi dan pengalaman saya.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <!-- WORKS MENU -->
        <NavigationMenuItem>
          <NavigationMenuTrigger>Works</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <NavigationMenuLink as-child>
                  <a
                    class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md cursor-pointer"
                    @click.prevent="scrollToSection('projects')"
                  >
                    <div class="mt-4 mb-2 text-lg font-medium">Projects</div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Lihat berbagai proyek menarik yang telah saya kerjakan dari awal hingga selesai.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    href="https://github.com/Flidoang" target="_blank" rel="noopener noreferrer"
                  >
                    <div class="text-sm font-medium leading-none">GitHub</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Repositori proyek open source saya.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    href="https://gitlab.com/Flidoang" target="_blank" rel="noopener noreferrer"
                  >
                    <div class="text-sm font-medium leading-none">GitLab</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Repositori proyek lainnya di GitLab.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <!-- CONTACT MENU -->
        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <NavigationMenuLink as-child>
                  <a
                    class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md cursor-pointer"
                    @click.prevent="scrollToSection('contact')"
                  >
                    <div class="mt-4 mb-2 text-lg font-medium">Hire Me</div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Punya ide brilian atau proyek menantang? Jangan ragu untuk menghubungi saya!
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    href="https://www.linkedin.com/in/raflihendarsyah" target="_blank" rel="noopener noreferrer"
                  >
                    <div class="text-sm font-medium leading-none">LinkedIn</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Mari terhubung secara profesional.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink as-child>
                  <a
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    href="https://www.instagram.com/fli_rafli22/" target="_blank" rel="noopener noreferrer"
                  >
                    <div class="text-sm font-medium leading-none">Instagram</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Aktivitas harian dan momen berharga saya.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </LiquidGlass>
</template>
