
//QUESTION: would it be better to move the logical functions(everything besides renders and event listeners) 
// to their own file? Or is it ok to have it all in this file

import {menuArray} from "./data.js"

const foodList = document.getElementById('food-list-container')
const orderSection = document.getElementById('current-order')
const orderList = document.getElementById('order-list')
const finishedOrder = document.getElementById('finished-order')

//updated in purchaseOrder()
let orderListArray = []

const modalEl = document.getElementById('modal')
const cardDetailsForm = document.getElementById('card-details-form')

document.addEventListener("click",function(e) {
    if(e.target.dataset.add) {
        handleAddItem(e.target.dataset.add)
        toggleOrderDisplay()
    }
    else if(e.target.dataset.remove) {
        handleRemoveItem(e.target.dataset.remove)
        toggleOrderDisplay()
    }
    else if(e.target === document.getElementById('submit-order-btn')) {
        modalEl.style.display = 'inline'
    }
    else if(e.target === document.getElementById('modal-close')) {
        modalEl.style.display = 'none'
    }
})

cardDetailsForm.addEventListener('submit',function(e) {
    e.preventDefault()
    purchaseOrder()
})

function handleAddItem(itemId) {
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
    let itemIndex
    let isOrdered = false
    orderListArray.forEach(function(item, index) {
        if(foodItem.name === item.name && item.quantity > 1) {
            itemIndex = index
            isOrdered = true
        }
    })
    if(isOrdered)
        orderListArray.splice(itemIndex,1)
}

function handleRemoveItem(itemId) //tried adding removeAll btn but it was causing a lot of problems. may revisit in the future
{
    orderListArray.forEach(function(item, index){
        if(item.id === itemId)
            item.quantity--

        if(item.quantity <= 0)//removes item from array when quantity reaches 0
            orderListArray.splice(index,1)
    })

    orderListRender()
}


function toggleOrderDisplay() {
    if(orderListArray.length < 1) {
        orderSection.classList.add('hidden')
    }
    else {
        orderSection.classList.remove('hidden')
        finishedOrder.classList.add('hidden')
    }
}

function purchaseOrder() {
    modalEl.style.display = 'none'
    const form = new FormData(cardDetailsForm)
    const fullName = form.get('input-name')
    let firstName = ""

    //ensures name is rendered if there is no spaces
    if(fullName.indexOf(" ") < 0) {
        firstName = fullName
    }
    else {
        firstName = fullName.substring(0,fullName.indexOf(" "))
    }

    //resets order section
    orderSection.classList.add('hidden')
    orderListArray = []
    resetQuantity()
    cardDetailsForm.reset()

    //replaces order section with finished order div
    finishedOrder.classList.remove('hidden')
    finishedOrder.innerHTML = `
        <p class="order-complete-text">Thanks, ${firstName}! Your order is on its way!</p>
    `
}

//REQUIRED: will not render properly on new order is quantity is not reset
function resetQuantity() {
    menuArray.forEach(function(item) {
        item.quantity = 0
    })
}


//RENDER FUNCTIONS

function foodListRender(menu) {
    let addHtml = ""

    menu.forEach(function(item) {

        let ingredientStr = ""
        item.ingredients.forEach(function(ingredient, index){
            if(index === 0)
                ingredientStr += ingredient
            else
                ingredientStr += ", " + ingredient
         })

        addHtml += `
            <div class="seperate food-list">                
                <!-- Item text -->
                <div class="food-info">
                    <p class="food-icon">${item.emoji}</p>
                    <div>
                        <h2 class="dark-text">${item.name}</h2>
                        <p class="grey-subtext">${ingredientStr}</p>
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

function orderListRender() {
    let addHtml = ''
    console.log(orderListArray)
    orderListArray.forEach(function(item) {
            addHtml += `
            <div class="seperate">
                <div>
                    <span class="dark-text">${item.name}</span>
                    <span class="quantity-text">x${item.quantity}</span>
                    <button class="remove-btn font-overide" data-remove=${item.id}>remove</button>
                </div>
                <p class="price">$${item.price * item.quantity}</p>
            </div>
            `
    })

    orderList.innerHTML = addHtml
    totalPrice()
}

function totalPrice() {
    let totalPrice = 0

    orderListArray.forEach(function(item){
        totalPrice += item.price * item.quantity
    })
    document.getElementById('total-price').innerHTML = `$${totalPrice}`
}

foodListRender(menuArray)


