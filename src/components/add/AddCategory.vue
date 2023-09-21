<template>
  <v-sheet fluid max-width="100%" min-width="300" width="400">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-start align-center">
              <v-icon icon="mdi-shape" size="large" start />
              Add category
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field
            hide-details
            placeholder="Category name"
            v-model="category"
          >
          </v-text-field>
          <v-btn type="submit" block class="mt-2" @click="addCategory"
            >Submit</v-btn
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { itemData } from '@/store/modules/items';
import { categoryData } from '@/store/modules/categories';
export default {
    setup() {
        return {
          itemData, categoryData
        };
    },
    data: () => ({
       category: "",
    }),
    methods: {
        addCategory() {
           const newCategory = {
            name: this.category,
           }
            categoryData.value.push(newCategory);
            this.category = "";
        }
    },
    watch: {
      categoryData: {
        handler(newCategory) {
          localStorage.setItem('category', JSON.stringify(newCategory));
        },
        deep: true,
      },
    },
    created() {
      const storeCategories = localStorage.getItem('category');
      if (storeCategories) {
        categoryData.value = JSON.parse(storeCategories);
      }
    }
}
</script>