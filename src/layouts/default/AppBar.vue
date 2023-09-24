<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-btn href="/" variant="outlined">POSify</v-btn>
    </v-app-bar-title>
    <div class="ma-3">
      <v-btn
        variant="outlined"
        size="small"
        @click.stop="table = !table"
        prepend-icon="mdi-room-service"
      >
        <template v-slot:append>
          <p>{{ activeTables() }}</p>
        </template>
      </v-btn>
    </div>
    <v-btn
      variant="outlined"
      size="small"
      @click.stop="cart = !cart"
      prepend-icon="mdi-cart"
    >
      <template v-slot:append>
        {{ cartData.length }}
      </template>
    </v-btn>
  </v-app-bar>
  <NavPanel :drawer="drawer">
    <v-main
      style="
        height: 100%;
        padding-top: 5%;
        padding-bottom: 5%;
        background-color: #f5f5f5;
      "
    >
      <slot></slot>
    </v-main>
  </NavPanel>
  <Cart :cart="cart" />
  <TableCard :cardToggle="table" />
</template>

<script lang="ts">
import Cart from "@/components/cart/Cart.vue";
import TableCard from "@/components/table/TableCard.vue";
import NavPanel from "@/components/navigation/NavPanel.vue";
import { cartData } from "@/store/modules/cart";
import { tableData } from "@/store/modules/tables";

export default {
  setup() {
    return {
      cartData,
      tableData,
    };
  },
  data() {
    return {
      drawer: false,
      cart: false,
      table: false,
      selection: "",
    };
  },
  methods: {
    activeTables() {
      return tableData.value.filter(
        (item) => item.status === "Available" || item.status === "Paid"
      ).length;
    },
  },
  components: {
    Cart,
    TableCard,
    NavPanel,
  },
};
</script>
