<script lang="ts" setup>
import AOS from 'aos'
import { appDescription, appName, ogImageUrl } from '~/constants'
import { showEasterEgg } from './utils/easterEgg'

const siteConfig = useSiteConfig()

useSeoMeta({
  description: appDescription,
  ogTitle: appName,
  ogDescription: appDescription,
  ogImage: `${siteConfig.url}${ogImageUrl}`,
  twitterTitle: appName,
  twitterDescription: appDescription,
  twitterImage: `${siteConfig.url}${ogImageUrl}`,
  twitterCard: 'summary_large_image',
})

const { hasShownAnimation } = useLoadingState()
const tagsStore = useTagsStore()

const route = useRoute()
const isHome = computed(() => route.name === 'index')

watch(() => route.path, () => {
  tagsStore.resetTags()
})

showEasterEgg()

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  })
})
</script>

<template>
  <NuxtRouteAnnouncer />

  <Teleport to="body">
    <FirstLoadingAnimation v-if="!hasShownAnimation && isHome" />
    <TilesBackground />
  </Teleport>

  <Body :class="{ 'home-bg': isHome }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<style>
.page-enter-active {
  transition: all 0.5s;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-active {
  transition: all 0.4s;
}
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
