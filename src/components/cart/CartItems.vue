<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cartItem, i) in cartData" :key="i">
            <td>{{ cartItem.title }}</td>
            <td>{{ cartItem.price }}</td>
            <td>
              {{ cartItem.quantity }}
            </td>
            <td>{{ cartItem.price * cartItem.quantity }}</td>
            <td>
              <v-icon
                icon="mdi-minus-circle"
                size="small"
                @click.stop="decrementQuantity(cartItem)"
              ></v-icon>
              <v-icon
                icon="mdi-plus-circle"
                size="small"
                @click.stop="incrementQuantity(cartItem)"
              ></v-icon>
              <v-icon
                icon="mdi-close-circle"
                size="small"
                @click.stop="removeItem(cartItem)"
              ></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-divider></v-divider>
      <v-btn size="small" variant="text" class="ma-3 float-left"
        >Total sum: {{ totalSum() }}$</v-btn
      >
      <v-btn
        size="small"
        @click="finishOrder"
        variant="outlined"
        class="ma-3 float-right"
        >checkout</v-btn
      >
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { cartData } from "@/store/modules/cart";
import { tableData } from "@/store/modules/tables";
import { orderHistoryData } from "@/store/modules/orderHistory";
import { Item } from "@/store/modules/items";

export default {
  props: {
    selection: {
      type: String,
      required: true,
    },
  },
  methods: {
    finishOrder() {
      const table = tableData.value.find(
        (table) => table.name === this.selection
      );
      if (table) {
        table.status = "Occupied";
        table.bill = cartData.value.concat(table.bill);
        table.timeOpen = new Date();
        table.total += this.totalSum();
        cartData.value = [];
      }
    },
    incrementQuantity(cartItem: Item) {
      cartItem.quantity++;
    },
    decrementQuantity(cartItem: Item) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    totalSum() {
      let sum: number = 0;
      cartData.value.forEach((cartItem) => {
        sum += cartItem.price * cartItem.quantity;
      });
      return sum;
    },
    removeItem(cartItemToDelete: Item) {
      const index = cartData.value.findIndex(
        (cartItem) => cartItem === cartItemToDelete
      );
      if (index !== -1) {
        const cartItem = cartData.value[index];
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          cartData.value.splice(index, 1);
        }
      }
    },
  },
  setup() {
    return {
      cartData,
      tableData,
    };
  },
  watch: {
    cartData: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true,
    },
    orderHistoryData: {
      handler(newHistoryData) {
        localStorage.setItem("history", JSON.stringify(newHistoryData));
      },
      deep: true,
    },
    tableData: {
      handler(newTableData) {
        localStorage.setItem("table", JSON.stringify(newTableData));
      },
      deep: true,
    },
  },
  created() {
    const storeHistoryData = localStorage.getItem("history");
    if (storeHistoryData) {
      orderHistoryData.value = JSON.parse(storeHistoryData);
    }
  },
};
</script>
