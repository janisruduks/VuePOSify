<template>
  <v-container>
    <v-sheet fluid max-width="100%" min-width="300">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-start align-center">
                <v-icon icon="mdi-table" size="large" start />
                Add table
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
              hide-details
              placeholder="Table name"
              v-model="tableName"
            >
            </v-text-field>
            <v-btn type="submit" block class="mt-2" @click="addTable"
              >Submit</v-btn
            >
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
    <TableItems>
      <template v-slot:table="{ table, i }">
        <v-btn
          variant="text"
          size="xs-small"
          class="ma-3"
          icon="mdi-delete"
          @click="deleteTable(table)"
        ></v-btn>
        <v-btn
          variant="outlined"
          size="small"
          class="ma-3"
          @click="toggleOverlay(i)"
          >order</v-btn
        >
        <v-overlay
          class="position-absolute d-flex align-center justify-center w-100 h-100"
          v-model="overlay[i]"
        >
          <v-card
            class="pa-3"
            :title="'Receipt: ' + table.name"
            :subtitle="'Time open: ' + table.timeOpen"
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
                <tr v-for="(item, i) in table.bill" :key="i">
                  <td>{{ item.title }}</td>
                  <td>{{ item.price }}$</td>
                  <td>
                    {{ item.quantity }}
                  </td>
                  <td>{{ item.price * item.quantity }}$</td>
                  <td></td>
                </tr>
              </tbody>
            </v-table>
            <v-card-item
              ><v-btn class="float-right ma-3" variant="outlined"
                >Total {{ table.total }}$</v-btn
              ></v-card-item
            >
          </v-card>
        </v-overlay>
      </template>
    </TableItems>
  </v-container>
</template>

<script lang="ts">
import TableItems from "@/components/table/TableItems.vue";
import { tableData, Table } from "@/store/modules/tables";
import { ref } from "vue";
export default {
  data() {
    return {
      tableName: "",
    };
  },
  setup() {
    const overlay = ref(new Array(tableData.value.length).fill(false));
    const toggleOverlay = (index: number) => {
      overlay.value[index] = !overlay.value[index];
    };
    return {
      tableData,
      toggleOverlay,
      overlay,
    };
  },
  methods: {
    addTable() {
      const newTable: Table = {
        name: this.tableName,
        status: "Available",
        bill: [],
        timeOpen: new Date(),
        total: 0,
      };
      tableData.value.push(newTable);
      this.tableName = "";
    },
    deleteTable(tableToDelete: Table) {
      const index = this.tableData.findIndex(
        (table) => table.name === tableToDelete.name
      );
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
    },
  },
  watch: {
    tableData: {
      handler(newTableData) {
        localStorage.setItem("table", JSON.stringify(newTableData));
      },
      deep: true,
    },
  },
  created() {
    const storeTables = localStorage.getItem("table");
    if (storeTables) {
      tableData.value = JSON.parse(storeTables);
    }
  },
  components: { TableItems },
};
</script>
