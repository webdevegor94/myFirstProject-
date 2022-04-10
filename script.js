'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    fullPrice: 0,
    rollbackPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    services: {},

    start: function () {
        appData.asking()
        appData.addPrice()
        appData.getFullPrice()
        appData.getTitle()
        appData.getRollbackPrice()
        appData.getServicePercentPrices()

        appData.logger()
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    asking: function () {
        //справшивать пока ввел не строку 
        do {
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки')
        }
        while (appData.isNumber(appData.title))


        for (let i = 0; i < 2; i++) {
            // спрашивать пока ввел не строку 
            // string
            let name
            let price = 0
            do {
                name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные")
            }
            while (appData.isNumber(name))

            do {
                //спрашивать пока не число +
                price = prompt("Сколько будет стоить данная работа?")

            }
            while (!appData.isNumber(price))

            price = Number(price)
            appData.screens.push({ id: i, name: name, price: price })

        }


        for (let i = 0; i < 2; i++) {
            //справшивать пока ввел не строку 
            let name
            let price = 0
            do {
                name = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")
            }
            while (appData.isNumber(name))

            do {
                ////спрашивать пока не число +
                price = prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))
            // Уникальное имя
            appData.services[name] = +price
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?")
    },

    addPrice: function () {
        for (let screen of appData.screens) {
            appData.screenPrice = appData.screenPrice + screen.price; // сделать с помощью reduce

        }
        for (let key in appData.services) {
            appData.allServicePrices = appData.allServicePrices + appData.services[key]
        }
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

    getFullPrice() {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices


    },

    getTitle: function () {
        appData.title = appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase()
    },

    getRollbackPrice: function () {
        appData.rollbackPrice = Math.round(appData.fullPrice * (appData.rollback / 100))
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - appData.rollbackPrice
    },
    logger: function () {
        console.log(appData.screens)
        for (let key in appData) {
            if (typeof appData[key] !== 'function') {
                console.log('ключ: ' + key + ' значение: ' + appData[key])
            }
        }
    }
}
appData.start()



