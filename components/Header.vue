<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const settings = useSettings();
const navigation = useNavigation();
const socialLinks = useSocialMediaLinks();
const mainNavLinks = navigation?.value?.data.mainNavLinks;
const mainNavCta = navigation?.value?.data.mainNavCtaLink;

const scrolled = ref(false);
const headerRef = ref(null);
const isOpen = ref(false);

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
  <div class="py-2" />
  <header
    ref="headerRef"
    class="sticky bg-white z-50 border-2 py-4 border-gray-500 px-4 transition-all duration-300 ease-in-out"
    :class="{'m-5 py-2 top-1 shadow-md ': scrolled, 'mx-3 ': !scrolled}"
  >
    <div class="flex items-center justify-between gap-x-6">
      <!-- Logo and Site Title -->
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-gray-900"
      >
        {{ settings?.data.siteTitle }}
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button
        class="block sm:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-900 flex items-center justify-center"
        @click="isOpen = true"
      >
        <Icon
          name="mdi:menu"
          class="w-6 h-6 text-white"
        />
      </button>

      <!-- Navigation Links (Desktop) -->
      <nav class="ml-auto hidden sm:block">
        <ul class="flex items-center space-x-4">
          <li
            v-for="link in mainNavLinks"
            :key="link.key"
          >
            <PrismicLink
              :field="link"
              class="text-sm font-medium text-gray-700 hover:text-gray-900"
            />
          </li>
        </ul>
      </nav>

      <!-- Call to Action Button (Desktop) -->
      <PrismicLink
        v-for="link in mainNavCta"
        :key="link.key"
        :field="link"
        class="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
      />
    </div>
  </header>
  <div class="py-2" />
  

  <!-- Sidebar (Mobile) -->
  <USlideover v-model="isOpen">
    <div class="p-4 flex-1">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex sm:hidden absolute end-5 top-2 z-10"
        square
        padded
        @click="isOpen = false"
      />
      <!-- Site Title -->
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-gray-900 mb-4 block"
      >
        {{ settings?.data.siteTitle }}
      </NuxtLink>
      <nav>
        <ul class="flex flex-col space-y-4">
          <li
            v-for="link in mainNavLinks"
            :key="link.key"
            class="bg-gray-50 hover:bg-gray-100 p-2"
          >
            <PrismicLink
              :field="link"
              class="text-base font-medium text-gray-700 hover:text-gray-900"
            />
          </li>
        </ul>
      </nav>
      <div class="mt-4">
        <PrismicLink
          v-for="link in mainNavCta"
          :key="link.key"
          :field="link"
          class="block px-4 py-2 text-base font-medium text-white bg-gray-800 hover:bg-gray-900"
        />
      </div>
    </div>
    <!-- Social Media -->
    <div class="bg-gray-50 p-4 mt-4">
      <div class="flex space-x-4">
        <nuxt-link
          v-for="social in socialLinks"
          :key="social.name"
          :to="social?.url || '#'"
          target="_blank"
          class="hover:text-yellow-300 transition duration-300 ease-in-out"
        >
          <Icon
            :name="social.icon"
            size="24"
          />
        </nuxt-link>
      </div>
    </div>
  </USlideover>
</template>

<style scoped>
</style>
