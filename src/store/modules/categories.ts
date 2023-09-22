import { ref } from "vue";

export interface Category {
    name: string,
}

const category = [
    {
        name: 'food',
    },
    {
        name: 'drink',
    }, 
    {
        name: 'all',
    }
]

export const categoryData = ref(category);
