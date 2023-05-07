<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  min-height: 38px;
  padding: 10px 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background-color: $color-extra;
  color: $color-global;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.4;
  transition: color .5s ease 0s, background-color .5s ease 0s;

  &:hover {
    color: #ffffff;
    background-color: $color-info;

    :deep(svg) {
      fill: #ffffff;
    }
  }

  :deep(.svg-icon-remove) {
    width: 12px;
    height: 15px;
    fill: $color-global;
    margin-left: 12px;
    transition: fill .5s ease 0s;
  }
}
</style>