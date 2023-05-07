<template>
  <div class="orders-list__item">
    <div class="orders-list__col">
      <Checkbox
        v-model="selected"
      />
    </div>

    <div class="orders-list__col">
      <div class="orders-list__extra">
        <div class="orders-list__price">{{ item.price }} {{ $t('rubles') }}</div>

        <div
          class="orders-list__type"
          v-if="item.type"
          v-tooltip="{
            text: item.type?.tooltip,
            theme: {
              placement: 'bottom'
            }
          }"
        >
          <template v-if="item.type?.name === 'apartment'">
            <Sprite name="room" class="orders-list__type-icon" />
            {{ $t('apartment') }}
          </template>

          <template v-else-if="item.type?.name === 'parking'">
            <Sprite name="car" class="orders-list__type-icon" />
            {{ $t('parking') }}
          </template>
        </div>
      </div>
      <div class="orders-list__caption">
        {{ item.name }}, 
        <span class="orders-list__caption-inner">
          {{ $t('frame') }} {{ item.frame }},
          {{ item.apartment }} {{ $t('flat') }}
          {{ item.year }} {{ $t('year') }}
        </span>
      </div>
      <div class="orders-list__info">
        <div
          v-for="[key, val] of Object.entries(item.info)"
          class="orders-list__info-item"
        >
          <template v-if="key === 'apartment_number'">{{ $t('flat') }} {{ val }}</template>
          <template v-else-if="key === 'square'">{{ val }} {{ $t('meter') }}<sup>2</sup></template>
          <template v-else-if="key === 'number_rooms'">{{ val }} {{ $t('room.flat') }}</template>
          <template v-else-if="key === 'floor'">{{ val }} {{ $t('floor') }}</template>
          <template v-else>{{ val }}</template>
        </div>
      </div>

      <div class="orders-list__address">
        <Sprite name="local" class="orders-list__address-icon" />
        {{ item.address }}
      </div>
    </div>

    <div class="orders-list__col">
      <div :class="`orders-list__status orders-list__status_${item.status}`">
        <template v-if="item.status === 'concession-entity'">{{ $t('status.concession.entity') }}</template>
        <template v-else-if="item.status === 'concession-user'">{{ $t('status.concession.user') }}</template>
        <template v-else-if="item.status === 'booked'">{{ $t('status.booked') }}</template>
        <template v-else-if="item.status === 'sales'">{{ $t('status.sales') }}</template>
      </div>

      <Image
        :src="item.image.any"
        :srcWebp="item.image.webp"
        :alt="item.name"
        width="179"
        height="98"
        class="orders-list__img"
      />

      <div class="orders-list__date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IOrder } from '../ordersListTypes';
import Checkbox from '@/ui/Checkbox.vue';
import Sprite from '@/ui/Sprite.vue';
import Image from '@/ui/Image.vue';
import useOrdersList from '../ordersListStore';

const {
  item
} = defineProps<{
  item: IOrder;
}>();

const store = useOrdersList();

const selected = computed({
  get: () => store.selected.includes(item.id),
  set: (checked) => store.selectItems({ id: item.id, checked })
});
</script>

<style lang="scss" scoped>
.orders-list {
  &__item {
    display: flex;
    background-color: #ffffff;
    border: 1px solid $color-service;
    position: relative;

    @include media('min', $viewport-post-md) {
      padding: 20px 30px;
    }
    
    @include media('max', $viewport-md) {
      padding: 20px;
    }

    @include media('max', $viewport-sm) {
      margin-bottom: 20px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
      align-items: flex-start;
      justify-content: center;

      @include media('min', $viewport-post-md) {
        flex-basis: 50px;
      }
      
      @include media('max', $viewport-md) {
        flex-basis: 36px;
      }
    }

    &:nth-child(2) {
      align-items: flex-start;
      justify-content: flex-start;

      @include media('min', $viewport-post-md) {
        flex-basis: calc(70% - 50px);
        padding-right: 30px;
      }
      
      @include media('max', $viewport-md) {
        flex-basis: calc(60% - 36px);
        padding-right: 10px;
      }
    }

    &:nth-child(3) {
      align-items: flex-end;
      justify-content: flex-start;

      @include media('min', $viewport-post-md) {
        flex-basis: 30%;
      }
      
      @include media('max', $viewport-md) {
        flex-basis: 40%;
      }
    }
  }

  &__extra {
    margin-bottom: 3px;
    width: 100%;

    @include media('min', $viewport-post-md) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__price {
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.2;
    color: $color-danger;
  }

  &__type {
    min-height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 2px rgba(94, 119, 157, 0.25);
    border-radius: 32px;
    padding: 5px 15px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.4;
    color: $color-secondary;

    @include media('max', $viewport-md) {
      margin-top: 3px;
    }
  }

  &__type-icon {
    margin-right: 10px;

    &.svg-icon-room {
      width: 17px;
      height: 13px;
      fill: $color-general;
    }

    &.svg-icon-car {
      width: 20px;
      height: 13px;
      fill: $color-danger;
    }
  }

  &__caption {
    margin-bottom: 35px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }

  &__caption-inner {
    color: $color-general;
  }

  &__info {
    max-width: 230px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  &__info-item {
    width: 50%;

    &:nth-child(odd) {
      padding-right: 25px;
      border-right: 1px solid $color-service;
    }

    &:nth-child(even) {
      padding-left: 25px;
    }
  }

  &__address {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: -25px;
  }

  &__address-icon {
    width: 10px;
    height: 13px;
    fill: $color-base;
    margin: 4px 15px 0 0;
  }

  &__img {
    display: block;
    margin-bottom: 17px;

    :deep(img) {      
      @include media('max', $viewport-md) {
        max-width: 100%;
        width: auto;
        height: auto;
      }
    }
  }

  &__date {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: $color-base;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    padding: 7px 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 27px;
    
    @include media('max', $viewport-md) {
      margin-right: -20px;
    }

    &:before {
      content: '';
      width: 6px;
      flex-basis: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
    }

    &_concession-entity {
      color: $color-menace;
      background-color: $color-hazard;

      &:before {
        background-color: $color-menace;
      }
    }

    &_concession-user {
      color: $color-info;
      background-color: $color-slight;

      &:before {
        background-color: $color-info;
      }
    }

    &_booked {
      color: $color-lightsome;
      background-color: $color-bright;

      &:before {
        background-color: $color-lightsome;
      }
    }
    
    &_sales {
      color: $color-general;
      background-color: $color-auxiliary;

      &:before {
        background-color: $color-general;
      }
    }
  }
}
</style>