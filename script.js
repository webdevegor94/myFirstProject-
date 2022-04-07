'use strict'

let title
let screens
let screenPrice
let adaptive
let rollback = 20;
let fullPrice
let rollbackPrice
let servicePercentPrice
let allServicePrices
let service1
let service2

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}



const asking = function () {
    title = prompt("Как называется ваш проект?", " каЛьКулятор Верстки") // string
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные") // string

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?")
        console.log(screenPrice)
    }
    while (!isNumber(screenPrice))
    screenPrice = Number(screenPrice)

    adaptive = confirm("Нужен ли адаптив на сайте?")
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
    // let sum = 0
    let servicePrice1
    let servicePrice2
    for (let i = 0; i < 2; i++) {
        if (i === 0) {

            service1 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")

            while (!isNumber(servicePrice1)) {
                servicePrice1 = prompt("Сколько это будет стоить?")
            }
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать по PP")

            while (!isNumber(servicePrice2)) {
                servicePrice2 = prompt("Сколько это будет стоить?")
            }
        }

    }
    return Number(servicePrice1) + Number(servicePrice2)
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable)
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

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
title = getTitle()
rollbackPrice = getRollbackPrice()
servicePercentPrice = getServicePercentPrices()

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)



console.log(JSON.stringify({
    title,
    screens,
    screenPrice,
    adaptive,
    service1,
    service2,
    fullPrice,
    rollbackPrice,
    servicePercentPrice,
    allServicePrices,
    getRollbeckMessage: getRollbeckMessage(fullPrice),
    // sum

}, null, 4))



