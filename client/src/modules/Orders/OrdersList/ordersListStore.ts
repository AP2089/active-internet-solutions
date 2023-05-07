import { ref, watch } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useToast } from 'vue-toastification';
import axios from '@/plugins/axios';
import { useI18n } from '@/plugins/i18n';
import { debounce } from 'lodash';
import { IOrder, IOrderSelectItems } from './ordersListTypes';
import { inputTimeout } from '@/config';

const useOrdersList = defineStore('ordersList', () => {
  const items = ref<IOrder[]>([]);
  const isLoading = ref(false);
  const selected = ref<number[]>([]);
  const selectedAll = ref(false);
  const searchValue = ref('');
  const toast = useToast();
  const { t } = useI18n();
  
  const getItems = async () => {    
    try {
      isLoading.value = true;

      const { data } = await axios.get('/orders', {
        params: {
          _limit: 10
        }
      });

      items.value = data;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  const searchItems = debounce(async () => {
    try {
      isLoading.value = true;
      selectedAll.value = false;
      selected.value = [];

      const keys = ['name_like', 'frame_like', 'apartment_like'];
      const values = searchValue.value.split('/').filter(v => v.trim());

      if (values.length < 4) {
        const _params = values.reduce((acc, v, i) => {
          acc[keys[i]] = v.trim();

          return acc;
        }, {} as Record<string, string>);

        const { data } = await axios.get('/orders', {
          params: {
            ..._params,
            _limit: 10
          }
        });

        items.value = data;
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      isLoading.value = false;
    }
  }, inputTimeout);

  const selectItems = (payload: IOrderSelectItems) => {
    if (payload.id === 'all') {
      selectedAll.value = payload.checked;
      selected.value = [];

      if (payload.checked) {
        selected.value = items.value.reduce((acc, val) => {
          acc.push(val.id);
  
          return acc;
        }, [] as number[]);
      }
    } else {
      selectedAll.value = false;

      if (payload.checked) {
        selected.value.push(Number(payload.id));
      } else {
        selected.value = selected.value.filter(id => id !== payload.id);
      }
    }
  }

  const removeItems = async () => {
    try {
      isLoading.value = true;

      // await Promise.all(selected.value.map(id => axios.delete(`/orders/${id}`)));
      items.value = items.value.filter(val => !selected.value.includes(val.id));
      selected.value = [];
      selectedAll.value = false;
      toast.success(t('remove.orders.success'));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      isLoading.value = false;
    }
  }

  watch(() => searchValue.value, searchItems);

  return {
    items,
    isLoading,
    selected,
    selectedAll,
    searchValue,
    getItems,
    removeItems,
    selectItems
  }
});

export default useOrdersList;

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersList, import.meta.hot));
}