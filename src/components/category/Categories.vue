<template>
  <ItemSearch :card-click="hello" category="all">
    <template #main="slotProps">
      <v-btn
        @click="deleteCategory(slotProps.selection)"
        class="ma-5"
        variant="outlined"
        >delete selected category</v-btn
      >
    </template>
    <template #card="slotProps">
      <v-btn
        @click="deleteItem(slotProps.item)"
        icon="mdi-delete"
        class="delete-button ma-1"
        style="z-index: 9999"
      ></v-btn>
    </template>
  </ItemSearch>
</template>

<style>
.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
</style>

<script lang="ts">
import { categoryData } from "@/store/modules/categories";
import { itemData, Item } from "@/store/modules/items";
import ItemSearch from "@/components/item/ItemSearch.vue";

export default {
  setup() {
    return {
      itemData,
      categoryData,
    };
  },
  methods: {
    hello() {},
    deleteItem(itemToDelete: Item) {
      const index = this.itemData.findIndex((item) => item === itemToDelete);
      this.itemData.splice(index, 1);
    },
    deleteCategory(selected: string) {
      console.log(selected);
      const categoryToDelete = this.categoryData.find(
        (category) => category.name === selected
      );
      const index = this.categoryData.findIndex(
        (item) => item === categoryToDelete
      );
      if (index !== -1) {
        this.categoryData.splice(index, 1);
      }
    },
  },
  components: { ItemSearch },
};
</script>
