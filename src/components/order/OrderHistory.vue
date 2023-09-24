<template>
  <v-responsive>
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Table name</th>
            <th class="text-left">Time open</th>
            <th class="text-left">Time close</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, i) in orderHistoryData"
            :key="i"
            @click="toggleOverlay(i)"
            class="itemHover"
          >
            <td>{{ data.tableName }}</td>
            <td>{{ data.timeOpen }}</td>
            <td>{{ data.timeClose }}</td>
            <td>{{ data.total }}$</td>

            <v-overlay
              class="position-absolute d-flex align-center justify-center w-100 h-100"
              v-model="overlay[i]"
            >
              <v-card
                class="pa-3"
                :title="'Receipt: ' + data.tableName"
                :subtitle="'Order id: ' + data.id"
              >
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
                    <tr v-for="(cartItem, i) in data.bill" :key="i">
                      <td>{{ cartItem.title }}</td>
                      <td>{{ cartItem.price }}$</td>
                      <td>
                        {{ cartItem.quantity }}
                      </td>
                      <td>{{ cartItem.price * cartItem.quantity }}$</td>
                      <td></td>
                    </tr>
                  </tbody>
                </v-table>
                <v-card-item
                  ><v-btn class="float-right ma-3" variant="outlined"
                    >Total {{ data.total }}$</v-btn
                  ></v-card-item
                >
              </v-card>
            </v-overlay>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-responsive>
</template>

<style>
.itemHover:hover {
  background-color: #f5f5f5;
  transition-duration: 250ms;
  cursor: pointer;
}
</style>

<script lang="ts">
import { ref } from "vue";
import { orderHistoryData } from "@/store/modules/orderHistory";
export default {
  setup() {
    const overlay = ref(new Array(orderHistoryData.value.length).fill(false));

    const toggleOverlay = (index: number) => {
      overlay.value[index] = !overlay.value[index];
    };

    return {
      orderHistoryData,
      overlay,
      toggleOverlay,
    };
  },
  created() {
      const storeHistoryData = localStorage.getItem('history');
      if (storeHistoryData) {
        orderHistoryData.value = JSON.parse(storeHistoryData);
      }
  },
};
</script>