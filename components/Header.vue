<script setup lang="ts">
import { ref } from 'vue';

const settings = useSettings();
const navigation = useNavigation();
const socialLinks = useSocialMediaLinks();
const mainNavLinks = navigation?.value?.data.mainNavLinks;
const mainNavCta = navigation?.value?.data.mainNavCtaLink?.filter((cta) => cta.text)
const navLogo = settings?.value?.data.navLogo;

const isOpen = ref(false);
</script>

<template>
  <header class="bg-navbar shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Site Title -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-white hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <PrismicImage
            v-if="navLogo"
            class="w-8 h-8 object-cover"
            :field="navLogo"
          />

          {{ settings?.data.siteTitle }}
        </NuxtLink>

        <!-- Navigation Links (Desktop) -->
        <nav class="hidden sm:block">
          <ul class="flex items-center space-x-6">
            <li
              v-for="link in mainNavLinks"
              :key="link.key"
            >
              <PrismicLink
                :field="link"
                class="text-sm font-medium text-white hover:text-yellow-300 transition-colors"
              />
            </li>
            <li
              v-for="link in mainNavCta"
              :key="link.key"
            >
              <BaseButton
                :field="link"
                variant="primary"
                size="sm"
              >
                {{ link.text }}
              </BaseButton>
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="sm:hidden text-white hover:text-yellow-300"
          @click="isOpen = true"
        >
          <Icon
            name="mdi:menu"
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- Sidebar (Mobile) -->
  <USlideover
    v-model="isOpen"
    class="sm:hidden"
  >
    <div class="flex flex-col h-full bg-navbar">
      <div class="p-4 flex-1">
        <div class="flex items-center justify-between mb-6">
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-white hover:opacity-90 transition-opacity"
            @click="isOpen = false"
          >
            {{ settings?.data.siteTitle }}
          </NuxtLink>
          <button
            class="text-white hover:text-yellow-300"
            @click="isOpen = false"
          >
            <Icon
              name="mdi:close"
              class="w-6 h-6"
            />
          </button>
        </div>
        <nav>
          <ul class="space-y-4">
            <li
              v-for="link in mainNavLinks"
              :key="link.key"
            >
              <PrismicLink
                :field="link"
                class="block py-2 text-base text-white hover:text-yellow-300 transition-colors"
                @click="isOpen = false"
              />
            </li>
          </ul>
        </nav>
        <div class="mt-6">
          <BaseButton
            v-for="link in mainNavCta"
            :key="link.key"
            :field="link"
            variant="primary"
            class="w-full"
            @click="isOpen = false"
          >
            {{ link.text }}
          </BaseButton>
        </div>
      </div>
      <!-- Social Media -->
      <div class="border-t border-white p-4">
        <div class="flex justify-center space-x-6">
          <nuxt-link
            v-for="social in socialLinks"
            :key="social.name"
            :to="social?.url || '#'"
            target="_blank"
            class="text-white hover:text-yellow-300 transition-transform transform hover:scale-110"
          >
            <Icon
              :name="social.icon"
              size="28"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </USlideover>
</template>
