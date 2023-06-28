import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


export const menuArray = [
    {
        emoji: "🍕",
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        price: 14,
        quantity: 0,
        id: uuidv4()
    },
    {
        emoji: "🍔",
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        quantity: 0,
        id: uuidv4()
    },
        {
        emoji: "🍺",
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        quantity: 0,
        id: uuidv4()
    },
    
    {
        emoji: "💕",
        name: "Love",
        ingredients: ["UwUs, nuzzles, cuddles"],
        price: 999,
        quantity: 0,
        id: uuidv4()
    }
]