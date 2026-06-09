<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@inspira-ui/plugins";

interface Props {
  name: string;
  class?: HTMLAttributes["class"];
  icon?: string;
  description: string;
  href: string;
  cta: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :key="name"
    :class="
      cn(
        `group relative col-span-3 flex transform-gpu flex-col justify-end overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]`,
        props.class,
      )
    "
  >
    <slot name="background" />

    <div
      class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10"
    >
      <component
        :is="icon"
        v-if="icon"
        class="size-12 origin-left transform-gpu text-[#735F32] transition-all duration-300 ease-in-out group-hover:scale-75"
      />
      <div
        v-else
        class="size-12 origin-left transform-gpu text-[#735F32] transition-all duration-300 ease-in-out group-hover:scale-75"
      />
      <h3 class="text-xl font-semibold text-foreground">
        {{ name }}
      </h3>
      <p class="max-w-lg text-muted-foreground">{{ description }}</p>
    </div>

    <div
      class="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <a
        :href="href"
        class="pointer-events-auto inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-[#C69749] transition-colors hover:bg-[#735F32]/20"
      >
        {{ cta }} →
      </a>
    </div>
    <div
      class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[#735F32]/5 group-hover:dark:bg-[#735F32]/10"
    />
  </div>
</template>
