export const orders= JSON.parse(localStorage.getItem("orders")) || []

export function addOrder(order){
    orders.unshift(order)
    saveToStorage(orders)
}
function saveToStorage(orders){
    localStorage.setItem("orders", JSON.stringify(orders));
}
