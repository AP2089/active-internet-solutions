<template>
  <label class="checkbox">
    <input
      type="checkbox"
      class="checkbox__input"
      :disabled="disabled"
      :checked="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <div class="checkbox__toggle">
      <Sprite
        name="check"
        class="checkbox__toggle-icon"
      />
    </div>

    <div
      v-if="title"
      class="checkbox__title"
    >  
      {{ title }}
    </div>
  </label>
</template>

<script setup lang="ts">
import Sprite from '@/ui/Sprite.vue';

const {
  modelValue
} = defineProps<{
  title?: string;
  modelValue: any;
  disabled?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<style lang="scss" scoped>
.checkbox {
  $rs: &;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  line-height: 0;

  &__input {
    position: absolute;
    left: -100vw;
    z-index: -1;
    opacity: 0;
  }

  &__toggle {
    width: 16px;
    height: 16px;
    border: 1px solid $color-service;
    position: relative;
    background-color: #ffffff;
    opacity: 1;
    cursor: pointer;
    transition: border-color .5s ease 0s, background-color .5s ease 0s, opacity .5s ease 0s;
  }

  &__toggle-icon {
    display: block;
    width: 11px;
    height: 9px;
    fill: $color-global;
    position: absolute;
    top: 2px;
    left: 1px;
    opacity: 0;
    transition: opacity .5s ease 0s;
  }

  &__title {
    margin-left: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.4;
    padding-top: 3px;
    color: $color-global;
  }

  &:hover {
    #{$rs}__toggle {
      border-color: $color-info;
    }
  }

  &__input:checked ~ &__toggle {
    background-color: $color-warning;
    
    #{$rs}__toggle-icon {
      opacity: 1;
    }
  }

  &__input:disabled ~ &__toggle {
    cursor: default !important;
    border-color: $color-service !important;
    opacity: .5 !important;
  }
}
</style>