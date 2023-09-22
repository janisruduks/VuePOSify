<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Status</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(table, i) in tableData" :key="i">
            <td>{{ table.name }}</td>
            <td>{{ table.status }}</td>
            <td>
              <v-btn
                :disabled="table.status === 'Paid' || table.status === 'Available'"
                @click="changeStatusToPaid(table)"
                size="small"
                class="ma-3"
                variant="outlined"
                >paid</v-btn
              >
              <v-btn
                :disabled="table.status === 'Occupied' || table.status === 'Available'"
                @click="makeTableAvailable(table)"
                size="small"
                variant="outlined"
                >available</v-btn
              >
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
      tableData, orderHistoryData,
    };
  },
  methods: {
    makeTableAvailable(table: Table) {
      table.status = 'Available';
      const completeOrder: OrderHistory = {
        id: "123abc",
        tableName: table.name,
        bill: table.bill,
        timeOpen: table.timeOpen,
        timeClose: new Date(),
        total: table.total,
      } 
      orderHistoryData.value.push(completeOrder);
      table.bill = [];
    },
    changeStatusToPaid(table: Table) {
      table.status = 'Paid';
    },
  },
  watch: {
    tableData: {
      handler(newTableData) {
        localStorage.setItem('table', JSON.stringify(newTableData));
      },
      deep: true,
    },
    orderHistoryData: {
      handler(newHistoryData) {
        localStorage.setItem('history', JSON.stringify(newHistoryData));
      },
      deep: true,
    }
  },
};
</script>
