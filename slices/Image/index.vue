<script setup lang="ts">
import { type Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(getSliceComponentProps<Content.ImageSlice>(
  ['slice', 'index', 'slices', 'context']
));

const isFullWidth = props.slice.variation === 'fullWidth';
</script>

<template>
  <div v-if="isFullWidth">
    <PrismicImage
      v-if="slice.primary.image.url"
      :field="slice.primary.image"
      class="w-full h-full"
    />

  </div>
  <Bounded
    as="section"
    class="bg-white"
    v-else
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
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
  </Bounded>
</template>
