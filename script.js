'use strict'

let title = prompt("Как называется ваш проект?", " каЛьКулятор Верстки")
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные")
let screenPrice = Math.abs(Number(prompt("Сколько будет стоить данная работа?", "12000")))
let adaptive = confirm("Нужен ли адаптив на сайте?")
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")
let servicePrice1 = Math.abs(Number(prompt("Сколько это будет стоить?", "1500")));
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать по PP")
let rollback = 20;
let servicePrice2 = Math.abs(Number(prompt("Сколько это будет стоить?", "3000")));
let fullPrice
let rollbackPrice
let servicePercentPrice
let allServicePrices

const showTypeOf = function (variable) {
    console.log(variable, typeof variable)
}

const getRollbeckMessage = function (price) {
    if (price >= 30000) {
        return "Даем скидку 10%";
    } else if (15000 >= price < 30000) {
        return "Даем скидку 5%";
    } else if (0 >= price < 15000) {
        return "Скидка не предусмотрена";
    } else {
        return "Что-то пошло не так"
    }
}
// declaretion
const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2
}
// expreshion
function getFullPrice() {
    return screenPrice + allServicePrices
}

const getTitle = function () {
    return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase()
}

const getRollbackPrice = function () {
    return fullPrice * (rollback / 100)
}

const getServicePercentPrices = function () {
    return fullPrice - rollbackPrice
}


allServicePrices = getAllServicePrices() // 1 пункт
fullPrice = getFullPrice() // 2 пункт
title = getTitle() // 3 пункт 
rollbackPrice = getRollbackPrice()
servicePercentPrice = getServicePercentPrices() // 4пункт

console.log(JSON.stringify({
    title,
    screens, // 5 пункт
    screenPrice,
    adaptive,
    service1,
    servicePrice1,
    service2,
    servicePrice2,
    fullPrice,
    rollbackPrice,
    servicePercentPrice, // 5 пункт
    allServicePrices,
    getRollbeckMessage: getRollbeckMessage(fullPrice), // 5 пункт 

}, null, 4))
showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)





