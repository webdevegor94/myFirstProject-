'use strict'
const title = document.getElementsByTagName('h1')[0]
const buttons = document.getElementsByClassName('handler_btn')
const calcBtn = buttons[0]
const resetBtn = buttons[1]

const plusBtn = document.querySelector('.screen-btn')
const itemsPersent = document.querySelectorAll('.other-items.percent')
const itemsNumber = document.querySelectorAll('.other-items.number')
const rollbackInput = document.querySelector('.rollback input')
const rollbackSpan = document.querySelector('.rollback .range-value')

const screenPriceInput = document.getElementsByClassName('total-input')[0]
const screensCountInput = document.getElementsByClassName('total-input')[1]
const allServicePricesInput = document.getElementsByClassName('total-input')[2]
const fullPriceInput = document.getElementsByClassName('total-input')[3]
const servicePercentPriceInput = document.getElementsByClassName('total-input')[4]

let screenElement = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    fullPrice: 0,
    rollbackPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},


    init: function () {
        appData.addTitle()
        // appData.start()
        calcBtn.addEventListener('click', appData.start)
        plusBtn.addEventListener('click', appData.addScreenBlock)
    },
    addTitle: function () {
        document.title = title.textContent
    },

    start: function () {
        appData.addScreens()
        appData.addServices()
        appData.addPrice()
        // appData.getServicePercentPrices()
        // appData.logger()
        appData.showResult()
    },

    showResult: function () {
        screenPriceInput.value = appData.screenPrice
        screensCountInput.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullPriceInput.value = appData.fullPrice
    },


    addScreens: function () {
        let screenElement = document.querySelectorAll('.screen')
        screenElement.forEach(function (screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
        screenElement = document.querySelectorAll('.screen').disabled = true;
        console.log(appData.screens)
    },

    addServices: function () {
        itemsPersent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        itemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },



    addScreenBlock: function () {
        const cloneScreen = screenElement[0].cloneNode(true)
        screenElement[screenElement.length - 1].after(cloneScreen)
    },

    addPrice: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += screen.price; // сделать с помощью reduce

        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent
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

    getRollbackPrice: function () {
        appData.rollbackPrice = Math.round(appData.fullPrice * (appData.rollback / 100))
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - appData.rollbackPrice
    },
    logger: function () {

        for (let key in appData) {
            if (typeof appData[key] !== 'function' && typeof appData[key] !== 'object') {
                console.log('ключ: ' + key + ' значение: ' + appData[key])
            }
            if (typeof appData[key] === 'object') {
                console.log('ключ: ' + key + ' значение: ' + JSON.stringify(appData[key], null, 4))
            }
        }
    }
}
appData.init()



