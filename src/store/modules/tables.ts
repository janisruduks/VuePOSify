import { ref } from 'vue';
import { Item } from './items';

type orderStatus = 'Occupied' | 'Paid' | 'Available';

export interface Table {
    name: string,
    status: orderStatus,
    bill: Item[],
    timeOpen: Date,
    total: number,
}

const tables: Table[] = [
    {
        name: "1",
        status: "Available",
        bill: [],
        timeOpen: new Date(),
        total: 0,
    },
    {
        name: "2",
        status: "Available",
        bill: [],
        timeOpen: new Date(),
        total: 0,
    },
    {
        name: "3",
        status: "Available",
        bill: [],
        timeOpen: new Date(),
        total: 0,
    },
]

export const tableData = ref(tables)