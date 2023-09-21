<template>
  <v-sheet fluid max-width="100%" min-width="300" width="400">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-start align-center">
              <v-icon icon="mdi-plus" size="large" start />
              Add item
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field hide-details placeholder="Item name" v-model="title">
          </v-text-field>
          <v-text-field
            hide-details
            placeholder="Item description"
            v-model="desc"
          >
          </v-text-field>
          <v-text-field hide-details placeholder="Item price" v-model="price">
          </v-text-field>
          <v-text-field hide-details placeholder="Image url" v-model="imgUrl">
          </v-text-field>
          <v-select
            v-model="selection"
            label="Select category"
            :items="categoryData"
            item-title="name"
          >
            <template v-slot:item="{ props }">
              <v-list-item v-bind="props"></v-list-item>
            </template>
          </v-select>
          <v-btn type="submit" block class="mt-2" @click="addItem">
            Submit
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { itemData } from "@/store/modules/items";
import { categoryData } from "@/store/modules/categories";
export default {
  setup() {
    return {
      itemData,
      categoryData,
    };
  },
  data: () => ({
    title: "",
    desc: "",
    price: 0,
    imgUrl: "",
    selection: "",
  }),
  methods: {
    addItem() {
      const newItem = {
        title: this.title,
        desc: this.desc,
        price: this.price,
        url: this.imgUrl,
        category: this.selection,
        quantity: 1,
      };
      itemData.value.push(newItem);
      this.title = "";
      this.desc = "";
      this.price = 0;
      this.imgUrl = "";
      this.selection = "";
    },
  },
    watch: {
      itemData: {
        handler(newItems) {
          localStorage.setItem('items', JSON.stringify(newItems));
        },
        deep: true,
      },
    },
    created() {
      const storeItems = localStorage.getItem('items');
      if (storeItems) {
        itemData.value = JSON.parse(storeItems);
      }
    }
};
</script>
