<script setup lang="ts">
import {
  type Content,
  type HTMLRichTextMapSerializer,
} from "@prismicio/client";
import {
  Pagination as CarouselPagination,
  Navigation as CarouselNavigation,
} from "vue3-carousel";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
const prismic = usePrismic();

const serializer: HTMLRichTextMapSerializer = {
  ...prismic.options.richTextSerializer,
  heading1: ({ children }) =>
    /* html */ `<h2 class="font-semibold leading-tight tracking-tight md:leading-tight text-5xl md:text-7xl mb-4 mt-12 first:mt-0 last:mb-0">${children}</h2>`,
};

const backgroundImages = props.slice.primary.backgrounds.map(
  (background) => background?.image
);
const carouselConfig = {
  wrapAround: true,
  autoplay: 4000,
  height: "100%",
  transition: 600
}
</script>

<template>
  <section class="relative bg-slate-900 text-white">
    <figure class="absolute inset-0 z-10 h-full w-full overflow-hidden">
      <Carousel
        v-bind="carouselConfig"
      >
        <Slide
          v-for="(background, index) in backgroundImages"
          :key="index"
        >
        <div class="carousel__item brightness-50 bg-slate-900 h-full w-full">
            <PrismicImage
            :field="background"
            class="object-cover h-full w-full"
            />
        </div>
        </Slide>
        <template #addons>
          <CarouselPagination />
        </template>
      </Carousel>
    </figure>
    <Bounded
      y-padding="lg"
      class="relative"
    >
      <div class="grid justify-items-center gap-8">
        <PrismicRichText
          :field="slice.primary.text"
          :html-serializer="serializer"
          class="max-w-2xl text-center z-20"
          wrapper="div"
        />
        <PrismicLink
          v-if="
            slice.primary.buttonLink &&
              ('id' in slice.primary.buttonLink ||
                'url' in slice.primary.buttonLink)
          "
          :field="slice.primary.buttonLink"
          class="rounded bg-white px-5 py-3 font-medium text-slate-800"
        >
          {{ slice.primary.buttonText || "Learn More" }}
        </PrismicLink>
      </div>
    </Bounded>
  </section>
</template>

<style scoped>
.carousel-pagination {
  cursor: pointer;
}
</style>
