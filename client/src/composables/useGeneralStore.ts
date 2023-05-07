import { computed } from 'vue';
import { defineStore, getActivePinia, acceptHMRUpdate } from 'pinia';

const useGeneral = defineStore('general', () => {
  const storesActive = getActivePinia();

  const isLoading = computed(() => {
    if (storesActive) {
      const data = storesActive.state.value;
      const values = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          values.push(data[key].isLoading);
        }
      }
  
      return values.includes(true);
    }

    return false;
  });

  return {
    isLoading
  }
});

export default useGeneral;

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneral, import.meta.hot));
}