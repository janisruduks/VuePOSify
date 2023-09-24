<template>
  <v-fade-transition hide-on-leave>
    <v-card
      v-if="cart"
      class="cart-card pa-3"
      elevation="16"
      max-width="400"
      max-height="600"
      title="Receipt"
    >
      <Selector
        v-model="selection"
        :items="tableData"
        :enable-sub="true"
        label="Select table"
        item-title="name"
      />
      <CartItems :selection="selection" />
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
import Selector from "../category/Selector.vue";
import CartItems from "./CartItems.vue";
import { tableData } from "@/store/modules/tables";

export default {
  data: () => ({
    selection: "",
  }),
  props: {
    cart: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    isCartOpen() {
      this.$emit("update:cart", !this.cart);
    },
  },
  setup() {
    return {
      tableData,
    };
  },
  components: {
    CartItems,
    Selector,
  },
};
</script>
