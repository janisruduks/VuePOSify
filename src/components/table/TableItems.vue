<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(table, i) in tableData" :key="i">
            <td>{{ table.name }}</td>
            <td>{{ table.status }}</td>
            <td>

              <v-btn
                :disabled="
                  table.status === 'Paid' || table.status === 'Available'
                "
                @click="changeStatusToPaid(table)"
                icon="mdi-cash-fast"
                size="small"
                class="ma-3"
                variant="text"
                >
              </v-btn>
              <v-btn
                :disabled="
                  table.status === 'Occupied' || table.status === 'Available'
                "
                @click="makeTableAvailable(table)"
                size="small"
                variant="text"
                icon="mdi-table-chair"
                ></v-btn
              >
            </td>
            <td>
              <slot name="table" v-bind="{ table, i }"></slot>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { tableData, Table } from "@/store/modules/tables";
import { orderHistoryData, OrderHistory } from "@/store/modules/orderHistory";
export default {
  setup() {
    return {
      tableData,
      orderHistoryData,
    };
  },
  methods: {
    makeTableAvailable(table: Table) {
      table.status = "Available";
      const completeOrder: OrderHistory = {
        id: "123abc",
        tableName: table.name,
        bill: table.bill,
        timeOpen: table.timeOpen,
        timeClose: new Date(),
        total: table.total,
      };
      orderHistoryData.value.push(completeOrder);
      table.bill = [];
      table.total = 0;
    },
    changeStatusToPaid(table: Table) {
      table.status = "Paid";
    },
  },
  watch: {
    tableData: {
      handler(newTableData) {
        localStorage.setItem("table", JSON.stringify(newTableData));
      },
      deep: true,
    },
    orderHistoryData: {
      handler(newHistoryData) {
        localStorage.setItem("history", JSON.stringify(newHistoryData));
      },
      deep: true,
    },
  },
};
</script>
