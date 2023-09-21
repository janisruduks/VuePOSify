<template>
  <v-fade-transition hide-on-leave>
    <v-card
      v-if="cart"
      class="cart-card pa-3"
      elevation="16"
      max-width="500"
      max-height="600"
      title="Receipt"
    >
      <v-select
        class="pa-3"
        variant="outlined"
        v-model="selection"
        label="Select table"
        :items="tableData"
        item-title="name"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :subtitle="item.raw.status"></v-list-item>
        </template>
      </v-select>
      <CartItems :selection="selection"/>
    </v-card>
  </v-fade-transition>
</template>

<style>
.cart-card {
  position: fixed;
  top: 6%;
  right: 1px;
  z-index: 1000;
  overflow: auto;
}
</style>

<script lang="ts">
import CartItems from "./CartItems.vue";
import { tableData } from "@/store/modules/tables";

export default {
  data: () => ({
    selection: '',
  }),
  props: {
    cart: {
      type: Boolean,
      required: true,
    } 
  },
  methods: {
    isCartOpen() {
      this.$emit('update:cart', !this.cart)
    }
  },
  setup() {
    return {
      tableData,
    }
  },
  components: {
    CartItems,
  },
}
</script>
