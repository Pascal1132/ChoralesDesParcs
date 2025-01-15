<script setup lang="ts">
import { type Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(getSliceComponentProps<Content.ImageSlice>(
  ['slice', 'index', 'slices', 'context']
));
</script>

<template>
  <Bounded
    as="section"
    class="bg-white"
    :class="{
      'pt-0 md:pt-0': index === 0
    }"
  >
    <div
      v-if="slice.primary.image.url"
      class="bg-gray-100"
      style="position: relative; overflow: hidden;"
    >
      <PrismicImage 
        :field="slice.primary.image" 
        style="width: 100%; height: 100%; object-fit: cover;" 
      />
    </div>
  </Bounded>
</template>
