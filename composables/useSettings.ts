export const useSettings = () => {
  const prismic = usePrismic()
  return useAsyncData('$settings', () => prismic.client.getSingle('settings')).data
}
export const useSocialMediaLinks = () => {
  const settings = useSettings()

  const instagramLink = settings?.value?.data.instagramLink as any;
const facebookLink = settings?.value?.data.facebookLink as any;
const socialLinks = [
    { name: 'Instagram', icon: 'mdi:instagram', url: instagramLink?.url },
    { name: 'Facebook', icon: 'mdi:facebook', url: facebookLink?.url }
].filter(social => social.url);

return socialLinks
}