'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    fullPrice: 0,
    rollbackPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',

    start: function () {
        appData.asking()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice()
        appData.title = appData.getTitle()
        appData.rollbackPrice = appData.getRollbackPrice()
        appData.servicePercentPrice = appData.getServicePercentPrices()
        appData.logger()
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", " каЛьКулятор Верстки") // string
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные") // string

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?")
            // console.log(appData.screenPrice)
        }
        while (!appData.isNumber(appData.screenPrice))
        appData.screenPrice = Number(appData.screenPrice)

        appData.adaptive = confirm("Нужен ли адаптив на сайте?")
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getRollbeckMessage: function (price) {
        if (price >= 30000) {
            return "Даем скидку 10%";
        } else if (15000 >= price < 30000) {
            return "Даем скидку 5%";
        } else if (0 >= price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так"
        }
    },

    getAllServicePrices: function () {
        // let sum = 0
        let servicePrice1
        let servicePrice2
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")
                while (!appData.isNumber(servicePrice1)) {
                    servicePrice1 = prompt("Сколько это будет стоить?")
                }
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать по PP")

                while (!appData.isNumber(servicePrice2)) {
                    servicePrice2 = prompt("Сколько это будет стоить?")
                }
            }

        }
        return Number(servicePrice1) + Number(servicePrice2)
    },

    getFullPrice() {
        return appData.screenPrice + appData.allServicePrices
    },

    getTitle: function () {
        return appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase()
    },

    getRollbackPrice: function () {
        return appData.fullPrice * (appData.rollback / 100)
    },

    getServicePercentPrices: function () {
        return appData.fullPrice - appData.rollbackPrice
    },
    logger: function () {
        for (let key in appData) {
            console.log('ключ: ' + key + ' значение: ' + appData[key])
        }
    }
}
appData.start()

