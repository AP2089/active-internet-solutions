<template>
  <picture>
    <source type="image/webp" :srcset="srcWebp" />

    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy" 
    />
  </picture>
</template>

<script setup lang="ts">
defineProps<{
  srcWebp?: string;
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}>();
</script>

<style lang="scss" scoped>
img {
  display: block;
}
</style>