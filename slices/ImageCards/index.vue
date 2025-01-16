<script setup lang="ts">
import { type Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.ImageCardsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <Bounded
    as="section"
    class="py-12"
  >
    <div class="grid gap-12 max-w-6xl mx-auto px-4">
      <Heading
        v-if="$prismic.asText(slice.primary.heading)"
        class="text-center text-5xl font-extrabold text-gray-900 mb-10"
      >
        {{ $prismic.asText(slice.primary.heading) }}
      </Heading>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="card in slice.primary.cards"
          :key="card.image.url ?? undefined"
          class="relative group flex flex-col items-center justify-end rounded-xl overflow-hidden shadow-xl bg-gray-200 h-96 duration-200"
          :style="{ backgroundImage: `url(${card.image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75 transition-opacity duration-100 group-hover:opacity-60" />
          <div class="relative z-10 text-center p-6 bg-gradient-to-t from-black to-transparent w-full text-white">
            <PrismicRichText
              :field="card.text"
              class="leading-relaxed text-lg"
              wrapper="div"
            />
            <div
              v-if="
                card.link.text && card.link.link_type
              "
            >
              <PrismicLink
                :field="card.link"
                class="mt-4 inline-block px-4 py-2 bg-yellow-500 text-gray-900 rounded-full"
              >
                {{ card.link.text }}
              </PrismicLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Bounded>
</template>

<style scoped>
h1 {
  animation: fadeInUp 1s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
