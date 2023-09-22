<template>
  <v-select
    class="pa-3"
    variant="outlined"
    v-model="selectedValue"
    :label="label"
    :items="items"
    item-title="name"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :subtitle="enableSub ? item.raw.status : ''"
      ></v-list-item>
    </template>
  </v-select>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { Table } from '@/store/modules/tables';
import { Category } from '@/store/modules/categories';

export default {
  props: {
    value: String,
    items: Array as PropType<Array<Table | Category>>,
    enableSub: Boolean,
    label: String,
    itemTitle: String,
  },
  data() {
    return {
      selectedValue: this.value,
    };
  },
  watch: {
    selectedValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
