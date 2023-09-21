import { ref } from 'vue';

export interface Item {
    title: string,
    price: number,
    desc: string,
    url: string,
    category: string,
    quantity: number,
}

const item: Item[] = [
    {
        title: 'Stake',
        price: 24,
        desc: 'Premium stake',
        url: 'https://t4.ftcdn.net/jpg/02/82/59/49/360_F_282594902_pW0rUf2QJhZAZqo4DtGOv03tFRtgMze1.jpg',
        category: "food",
        quantity: 1,
    },
    {
        title: 'Spaghetti Squash Soup',
        price: 5.00,
        desc: 'Spaghetti Squash Soup with Sausage',
        url: 'https://www.eatingwell.com/thmb/LLdW9pYNi-Ikv3F24ZscgVEnqdg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spaghetti-squash-soup-57d1df1e64744dbe913baa3579c8d4ce.jpg',
        category: "food",
        quantity: 1,
    },
    {
        title: 'Tomato soup',
        price: 4.5,
        desc: 'Creamy Tomato Soup with Buttery Croutons',
        url: 'https://www.foodandwine.com/thmb/j1vJdgrMdu64ElBpxMzmvqpyt5U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-tomato-soup-buttery-croutons-hero-02-49b419d00f854db78838a79c8df9a23f.jpg',
        category: "food",
        quantity: 1,
    },
    {
        title: 'Coffee',
        price: 3,
        desc: 'Tasty coffee',
        url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=500,454',
        category: "drink",
        quantity: 1,
    }
];

export const itemData = ref(item);