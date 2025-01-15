<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const settings = useSettings()
const navigation = useNavigation()
const mainNavLinks = navigation?.value?.data.mainNavLinks;
const mainNavCta = navigation?.value?.data.mainNavCtaLink;

const scrolled = ref(false);
const headerRef = ref(null);

const onScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <header
    class="sticky top-1 bg-white z-50 border-2 border-gray-500 px-4 transition-all duration-300 ease-in-out"
    :class="{'m-5 py-2 shadow-md ': scrolled, 'm-5 py-4 ': !scrolled}"
    ref="headerRef"
  >
    <div
      class="flex items-center justify-between gap-x-6"
    >
      <!-- Logo and Site Title -->
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-gray-900"
      >
        {{ settings?.data.siteTitle }}
      </NuxtLink>

      <!-- Navigation Links -->
      <nav class="ml-auto">
        <ul class="flex items-center space-x-4">
          <li v-for="link in mainNavLinks" :key="link.key">
            <PrismicLink
              :field="link"
              class="text-sm font-medium text-gray-700 hover:text-gray-900"
            />
          </li>
        </ul>
      </nav>

      <!-- Call to Action Button -->
      <PrismicLink
        v-for="link in mainNavCta"
        :key="link.key"
        :field="link"
        class="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
      />
    </div>
  </header>
</template>

<style scoped>
.sticky {
  position: sticky;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.z-50 {
  z-index: 50;
}

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: ease-in-out;
}

.text-gray-700 {
  color: #374151;
}

.hover\:text-gray-600:hover {
  color: #4b5563;
}

.text-gray-900 {
  color: #111827;
}

.hover\:text-gray-900:hover {
  color: #1f2937;
}

.bg-gray-800 {
  background-color: #1f2937;
}

.hover\:bg-gray-900:hover {
  background-color: #111827;
}
</style>
