<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in itemData" :key="i" cols="12" md="3">
          <v-card
            :title="item.title"
            :text="item.desc"
            class="rounded-shape pa-3 ma-3"
            @click="cartAdd(item)"
          >
            <v-img height="100" :src="item.url"></v-img>
            <v-card-item>
              <v-btn>{{ item.price }}$</v-btn>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { itemData, Item } from "@/store/modules/items";
import { cartData } from "@/store/modules/cart";
export default {
  setup() {
    return {
      itemData,
      cartData,
    };
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
      const storeItems = localStorage.getItem('items');
      if (storeItems) {
        itemData.value = JSON.parse(storeItems);
      }
    }
};
</script>
