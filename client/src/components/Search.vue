<template>
  <div class="search">
    <Sprite
      name="loupe"
      class="search__icon"
    />

    <input
      type="text"
      class="search__input"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts" setup>
import Sprite from '@/ui/Sprite.vue';

defineProps<{
  modelValue: string;
  placeholder?: string;
}>()
</script>

<style lang="scss" scoped>
.search {
  position: relative;

  &__icon {
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 34px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    fill: $color-base;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 0 10px 0 100px;
    height: 38px;
    border: 1px solid $color-service;
    background-color: transparent;
    color: $color-global;
    outline: none;
    font-size: 14px;
    transition: border-color .5s ease 0s;

    @include placeholder() {
      color: $color-base;
    }

    &:hover,
    &:focus {
      border-color: $color-info;
    }
  }
}
</style>