<template>
  <ItemSearch :card-click="cartAdd" category="all" />
</template>

<script lang="ts">
import { Item } from "@/store/modules/items";
import { cartData } from "@/store/modules/cart";
import ItemSearch from '@/components/item/ItemSearch.vue';
export default {
  data: () => ({
    selection: "all",
  }),
  setup() {
    return { cartData, };
  },
  methods: {
    cartAdd(item: Item) {
      if (!cartData.value.find((i) => i === item)) {
        cartData.value.push(item);
      } else {
        item.quantity++;
      }
    },
  },
  components: { ItemSearch },
};
</script>