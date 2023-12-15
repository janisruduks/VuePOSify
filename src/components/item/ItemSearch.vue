<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <Selector
        v-model="selection"
        :items="categoryData"
        :enable-sub="false"
        label="Filter category"
      />
    </v-container>
    <slot name="main" :selection="selection" />
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in categoryFilter" :key="i" cols="12" md="3">
          <v-card
            variant="outlined"
            class="rounded my-card"
            @click="cardClick(item)"
          >
            <slot name="card" :card="item"></slot>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.desc }}</v-card-text>
          </v-card>
          <v-btn class="ma-2" variant="outlined"
            >price: {{ item.price }}$</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<style>
.my-card {
  height: 200px;
}
</style>

<script lang="ts">
import { itemData, Item } from "@/store/modules/items";
import { cartData } from "@/store/modules/cart";
import { categoryData } from "@/store/modules/categories";
import Selector from "@/components/category/Selector.vue";
export default {
  props: {
    cardClick: {
      type: Function,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    selection: "all",
  }),
  setup() {
    return { itemData, cartData, categoryData };
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
  created() {
    const storeItems = localStorage.getItem("items");
    if (storeItems) {
      itemData.value = JSON.parse(storeItems);
    }
    const storeCategories = localStorage.getItem("category");
    if (storeCategories) {
      categoryData.value = JSON.parse(storeCategories);
    }
  },
  watch: {
    categoryData: {
      handler(newCategory) {
        localStorage.setItem("category", JSON.stringify(newCategory));
      },
      deep: true,
    },
  },
  computed: {
    categoryFilter() {
      if (this.selection === "all") {
        return itemData.value;
      }
      return itemData.value.filter((item) => item.category === this.selection);
    },
    getSelection() {
      return this.selection;
    },
  },
  components: { Selector },
};
</script>
