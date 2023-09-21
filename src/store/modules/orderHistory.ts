import { ref } from 'vue';
import { Item } from './items';

export interface OrderHistory {
    id: string,
    tableName: string,
    bill: Item[],
    timeOpen: Date,
    timeClose: Date,
    total: number,
}

export const orderHistoryData = ref<OrderHistory[]>([]);