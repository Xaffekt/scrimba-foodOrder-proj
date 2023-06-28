import {menuArray} from "./data.js"

const foodList = document.getElementById('food-list-container')
const orderList = document.getElementById('order-list')
const orderListArray = []

document.addEventListener("click",function(e){

    if(e.target.dataset.add)
    {
        handleAddItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove)
    {
        removeItem(e.target.dataset.remove)
    }
})

function handleAddItem(itemId){
    const menuItem = menuArray.filter(function(item){
        return item.id === itemId
    })[0]

    orderListArray.push(menuItem)
    orderListRender()
}

function addFood(menu)
{
    let addHtml = ""

    menu.forEach(function(item){
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
                <button class="add-item" id="add-btn" data-add=${item.id}>+</button>
            </div>
        `
    })
    foodList.innerHTML = addHtml

}

function orderListRender(){
    let addHtml = ''

    orderListArray.forEach(function(item){
        addHtml += `
        <div class="seperate">
            <div>
                <span class="dark-text">${item.name}</span>
                <button class="remove-btn font-overide" data-remove=${item.id}>remove</button>
            </div>
            <p class="price">${item.price}</p>
        </div>
        `
    })

    orderList.innerHTML = addHtml
    totalPrice()
}

function removeItem(itemId)
{
    orderListArray.forEach(function(item, index){
        if(item.id === itemId)
        {
            orderListArray.splice(index,1)
        }
    })

    orderListRender()
}

function totalPrice(){
    let totalPrice = 0

    orderListArray.forEach(function(item){
        totalPrice += item.price
    })
    console.log(totalPrice)
    document.getElementById('total-price').innerHTML = `$${totalPrice}`
}

function render()
{
    addFood(menuArray)
    console.log(menuArray[0].id)
}

render();