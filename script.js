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

const isNumber = function (num, sum) {
    return !isNaN(parseFloat(num, sum)) && isFinite(num, sum)
}



const asking = function () {
    title = prompt("Как называется ваш проект?", " каЛьКулятор Верстки")
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные")
    screenPrice = prompt("Сколько будет стоить данная работа?")

    // while (!isNumber(screenPrice)) {
    //     screenPrice = prompt("Сколько будет стоить данная работа?")
    // }
    do
        screenPrice = prompt("Сколько будет стоить данная работа?")
    while (!isNumber(screenPrice))

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
    let sum = 0
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать по PP")
        }

        sum = prompt("Сколько это будет стоить?")

        while (!isNumber(sum)) {
            sum = prompt("Сколько это будет стоить?")
        }
    }
    return Math.round(sum)
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
    screens, // 5 пункт
    screenPrice,
    adaptive,
    service1,
    // servicePrice1,
    service2,
    // servicePrice2,
    fullPrice,
    rollbackPrice,
    servicePercentPrice, // 5 пункт
    allServicePrices,
    getRollbeckMessage: getRollbeckMessage(fullPrice), // 5 пункт 
    // sum

}, null, 4))



