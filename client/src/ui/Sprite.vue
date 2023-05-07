<template>
  <svg
    :class="`svg-icon-${name}`"
  >
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script lang="ts" setup>
import 'virtual:svg-icons-register';

const { name } = defineProps<{
  name: string
}>();
</script>