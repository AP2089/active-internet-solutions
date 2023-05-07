<template>
  <div class="orders-list">
    <Search
      v-model="store.searchValue"
      :placeholder="$t('orders.placeholder')"
      class="orders-list__search"
    />

    <div class="orders-list__panel">
      <Checkbox
        :title="$t('all')"
        :disabled="store.items.length === 0"
        class="orders-list__panel-item"
        v-model="selectedAll"
      />

      <Button
        v-if="store.selected.length"
        class="orders-list__panel-item"
        @click="modalRemoveShow"
      >
        {{ $t('remove') }}
        <Sprite name="remove" />
      </Button>
    </div>
    
    <div
      v-if="store.items.length"
      class="orders-list__items"
    >
      <OrdersListItem
        v-for="item in store.items"
        :key="item.id"
        :item="item"
      />
    </div>

    <Message
      v-else
      :text="$t('no.orders')"
    />
  </div>

  <Modal
    :isShow="isShowModalRemove"
    :hide="modalRemoveHide"
  >
    {{ $t('delete.order') }}

    <template #foot>
      <Button
        @click="modalRemoveConfirmation"
      >
        {{ $t('remove') }}
      </Button>

      <Button
        @click="modalRemoveHide"
      >
        {{ $t('cancel') }}
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import Search from '@/components/Search.vue';
import Modal from '@/components/Modal.vue';
import Checkbox from '@/ui/Checkbox.vue';
import Button from '@/ui/Button.vue';
import Sprite from '@/ui/Sprite.vue';
import Message from '@/ui/Message.vue';
import OrdersListItem from './components/OrdersListItem.vue';
import useOrdersList from './ordersListStore';

const store = useOrdersList();
const isShowModalRemove = ref(false);

const selectedAll = computed({
  get: () => store.selectedAll,
  set: (checked) => store.selectItems({ id: 'all', checked })
});

const modalRemoveShow = () => {
  isShowModalRemove.value = true;
}

const modalRemoveHide = () => {
  isShowModalRemove.value = false;
}

const modalRemoveConfirmation = () => {
  modalRemoveHide();
  store.removeItems();
}

onMounted(() => {
  store.getItems();
});
</script>

<style lang="scss" scoped>
.orders-list {
  &__search {
    margin-bottom: 29px;
  }

  &__panel {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 36px;
    min-height: 39px;
  }

  &__panel-item {
    margin-right: 13px;

    &:last-child {
      margin-right: 13px;
    }
  }

  &__items {
    @include media('min', $viewport-post-md) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px 30px;
    }

    @include media(null, $viewport-post-sm, $viewport-md) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px 20px;
    }
  }
}
</style>