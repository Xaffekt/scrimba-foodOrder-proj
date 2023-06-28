import {menuArray} from "./data.js"

const foodList = document.getElementById('food-list-container')
const orderList = document.getElementById('order-list')
const removeAllBtn = document.getElementById('remove-all')
const orderListArray = []

document.addEventListener("click",function(e)
{
    if(e.target.dataset.add)
    {
        handleAddItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove)
    {
        removeItem(e.target.dataset.remove)
    }
})

function handleAddItem(itemId)
{
    const menuItem = menuArray.filter(function(item)
    {
        return item.id === itemId
    })[0]
    menuItem.quantity++

    orderListArray.push(menuItem)
    removeDuplicateFood(menuItem)
    orderListRender()
}

function removeDuplicateFood(foodItem)
{
    console.log(foodItem.quantity)
    let itemIndex
    let isOrdered = false
    orderListArray.forEach(function(item, index){
        if(foodItem.name === item.name && item.quantity > 1)
        {
            itemIndex = index
            isOrdered = true
        }
    })
    if(isOrdered){
        orderListArray.splice(itemIndex,1)
    }
}

function removeItem(itemId)
{
    orderListArray.forEach(function(item, index){
        if(item.id === itemId)
        {
            item.quantity--
        }
        if(item.quantity <= 0)  //removes item from array when quantity reaches 0
        {
            orderListArray.splice(index,1)
        }
    })

    orderListRender()
}

function foodListRender(menu)
{
    let addHtml = ""

    menu.forEach(function(item)
    {
        addHtml += `
            <div class="seperate food-list">                
                <!-- Item text -->
                <div class="food-info">
                    <p class="food-icon">${item.emoji}</p>
                    <div>
                        <h2 class="dark-text">${item.name}</h2>
                        <p class="grey-subtext">${item.ingredients}</p>
                        <p class="price">$${item.price}</p>
                    </div>
                </div>
                <!-- Add to Order -->
                <button class="add-item-btn" id="add-btn" data-add=${item.id}>+</button>
            </div>
        `
    })
    foodList.innerHTML = addHtml
}

function orderListRender()
{

    let addHtml = ''
    console.log(orderListArray)
    orderListArray.forEach(function(item)
    {
        console.log(item.quantity)
            addHtml += `
            <div class="seperate">
                <div>
                    <span class="dark-text">${item.name}</span>
                    <span class="quantity-text">x${item.quantity}</span>
                    <button class="remove-btn font-overide" data-remove=${item.id}>remove</button>
                </div>
                <p class="price">${item.price * item.quantity}</p>
            </div>
            `
    })

    orderList.innerHTML = addHtml
    totalPrice()
}

function totalPrice()
{
    let totalPrice = 0

    orderListArray.forEach(function(item){
        totalPrice += item.price * item.quantity
    })
    document.getElementById('total-price').innerHTML = `$${totalPrice}`
}

function render()
{
    foodListRender(menuArray)
} 

render();