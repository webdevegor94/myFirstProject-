'use strict'
const title = document.getElementsByTagName('h1')[0]
const buttons = document.getElementsByClassName('handler_btn')
const calcBtn = buttons[0] // рассчитать 
const resetBtn = buttons[1] // сбросить 

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
    rollback: 0,
    fullPrice: 0,
    rollbackPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},


    init: function () {
        appData.addTitle()
        calcBtn.addEventListener('click', appData.start)
        plusBtn.addEventListener('click', appData.addScreenBlock)
        rollbackInput.addEventListener('input', appData.getStepsInput)

    },
    addTitle: function () {
        document.title = title.textContent
    },

    start: function () {
        appData.addScreens()
        console.log(appData.screens)
        if (appData.screens === 0) {
            alert('Заполните данные')
        } else {
            appData.addServices()
            appData.addPrice()
            // appData.getServicePercentPrices()
            appData.logger()
            appData.showResult()
        }
    },

    showResult: function () {
        screenPriceInput.value = appData.screenPrice
        screensCountInput.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullPriceInput.value = appData.fullPrice
        servicePercentPriceInput.value = appData.servicePercentPrice
    },


    addScreens: function () {
        let screenElement = document.querySelectorAll('.screen')
        appData.screens = [] // чистим перед заполнением 
        screenElement.forEach(function (screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            if (+select.value === 0) {
                return
            }
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })

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
        screenElement = document.querySelectorAll('.screen')
        const cloneScreen = screenElement[screenElement.length - 1].cloneNode(true)
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

        appData.rollbackPrice = Math.round(appData.fullPrice * (appData.rollback / 100))

        appData.servicePercentPrice = appData.fullPrice - appData.rollbackPrice
    },

    getStepsInput: function (event) {
        rollbackSpan.textContent = event.target.value + '%'
        appData.rollback = event.target.value
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



