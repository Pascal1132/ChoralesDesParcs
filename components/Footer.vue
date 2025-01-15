<script setup lang="ts">
import { type Content, type HTMLRichTextMapSerializer } from '@prismicio/client'

const settings = useSettings();
const navigation = useNavigation();
const year = new Date().getFullYear();
const footerText = settings?.value?.data.footerText;
const footerLinks = navigation?.value?.data.footerLinks;

const socialLinks = [
    { name: 'Instagram', icon: 'mdi:instagram', url: settings?.value?.data.instagramLink.url },
    { name: 'Facebook', icon: 'mdi:facebook', url: settings?.value?.data.facebookLink?.url }
].filter(social => social.url);

const prismic = usePrismic()

const serializer: HTMLRichTextMapSerializer = {
  ...prismic.options.richTextSerializer,
  heading1: ({ children }) =>
    /* html */ `<h2 class="font-semibold leading-tight tracking-tight md:leading-tight text-5xl md:text-7xl mb-4 mt-12 first:mt-0 last:mb-0">${children}</h2>`,
}
</script>

<template>
  <footer class="footer bg-gradient-to-b from-gray-900 to-black text-white py-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div>
          <PrismicRichText
            :field="footerText"
            :html-serializer="serializer"
            class="max-w-2xl text-center"
            wrapper="div"
          />
        </div>

        <!-- vertical bar -->
        <div class="hidden md:block border-r border-gray-600" />

        <!-- Right Column -->
        <div class="text-left">
          <ul class="space-y-2">
            <li
              v-for="link in footerLinks"
              :key="link.key"
            >
              <PrismicLink
                :field="link"
                class="hover:text-yellow-300 transition duration-300 ease-in-out"
              />
            </li>
          </ul>
          <!-- Social Links Section -->
          <div class="flex flex-wrap mt-4 space-x-4">
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
      </div>
      <!-- Divider Section -->
      <div class="mt-6 border-t border-gray-600 pt-4">
        <p class="text-center text-sm text-gray-400">
          &copy; {{ year }} - Tous droits réservés
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.richtext {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
                Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.richtext h1, .richtext h2, .richtext h3, .richtext h4, .richtext h5 {
        margin: 0.5rem 0;
}

.footer {
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
