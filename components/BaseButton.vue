<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  field?: any; // Pour la compatibilité avec Prismic
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
});

const classes = computed(() => {
  return [
    'inline-flex items-center justify-center font-medium transition-colors cursor-pointer',
    {
      'bg-primary text-white hover:bg-gray-700 rounded-lg': props.variant === 'primary',
      'bg-yellow-500 text-gray-900 rounded-full': props.variant === 'secondary',
      'px-3 py-1 text-sm': props.size === 'sm',
      'px-4 py-2 text-base': props.size === 'md',
      'px-6 py-3 text-lg': props.size === 'lg'
    }
  ];
});

const isExternal = computed(() => props.href && props.href.startsWith('http'));
</script>

<template>
  <component
    :is="field ? 'PrismicLink' : (to ? 'NuxtLink' : 'a')"
    :class="classes"
    :to="to"
    :href="href"
    :field="field"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot></slot>
  </component>
</template>