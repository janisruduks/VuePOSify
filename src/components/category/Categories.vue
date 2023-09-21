<template>
  <v-responsive class="align-center text-center">
    <v-container style="display: flex;">

    <v-select
      class="pa-3"
      variant="outlined"
      v-model="selection"
      label="Select category"
      :items="categoryData"
        item-title="name"
      >
        <template v-slot:item="{ props }">
          <v-list-item v-bind="props"></v-list-item>
        </template>
    </v-select>
    <v-btn @click="deleteCategory" class="ma-5" variant="outlined">delete</v-btn>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in categoryFilter" :key="i" cols="12" md="3">
          <v-card class="rounded-shape">
            <v-btn
              @click="deleteItem(item)"
              icon="mdi-delete"
              class="delete-button ma-1"
            ></v-btn>
            <v-img height="200" :src="item.url"></v-img>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.desc }}</v-card-text>
            <v-btn class="ma-3" variant="outlined"
              >price: {{ item.price }}$</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
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

export default {
  data: () => ({
    selection: "",
  }),
  setup() {
    return {
      itemData,
      categoryData,
    };
  },
  methods: {
    deleteItem(itemToDelete: Item) {
      const index = this.itemData.findIndex((item) => item === itemToDelete);
      if (index !== -1) {
        this.itemData.splice(index, 1);
      }
    },
    deleteCategory() {
      const categoryToDelete = this.categoryData.find(category => category.name === this.selection);
      const index = this.categoryData.findIndex((item) => item === categoryToDelete);
      if (index !== -1) {
        this.categoryData.splice(index, 1);
      }
      this.selection = "";
    },
  },
  computed: {
    categoryFilter() {
      return itemData.value.filter((item) => item.category === this.selection);
    },
  },
};
</script>
