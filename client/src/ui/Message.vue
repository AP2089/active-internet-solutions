<template>
  <div class="message">{{ text }}</div>
</template>

<script setup lang="ts">
interface IProps {
  text: string;
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
.message {
  font-size: 14px;
  margin-bottom: 15px;
}
</style>