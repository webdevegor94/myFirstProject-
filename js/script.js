'use strict'
const title = document.querySelector('#title').textContent
const calcBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')

const plusBtn = document.querySelector('.screen-btn')
const itemsPersent = document.querySelectorAll('.other-items.percent')
const itemsNumber = document.querySelectorAll('.other-items.number')
const rollbackInput = document.querySelector('.rollback input')
const rollbackSpan = document.querySelector('.rollback .range-value')

const checkboxs = document.querySelectorAll('.custom-checkbox')

const totalInputs = document.querySelectorAll('.total-input')

const screenPriceInput = totalInputs[0]
const screensCountInput = totalInputs[1]
const allServicePricesInput = totalInputs[2]
const fullPriceInput = totalInputs[3]
const servicePercentPriceInput = totalInputs[4]



let screenElement = document.querySelectorAll('.screen')


const appData = {
    title: '',
    screens: [],
    screensCount: 0,
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
        this.addTitle()
        calcBtn.addEventListener('click', this.start.bind(this))
        resetBtn.addEventListener('click', this.reset.bind(this))
        plusBtn.addEventListener('click', this.addScreenBlock.bind(this))
        rollbackInput.addEventListener('input', this.getStepsInput.bind(this))
    },

    reset: function () {
        this.title = ''
        this.screens = []
        this.screensCount = 0
        this.screenPrice = 0
        this.adaptive = true
        this.rollback = 0
        this.fullPrice = 0
        this.rollbackPrice = 0
        this.servicePercentPrice = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.servicesPercent = {}
        this.servicesNumber = {}


        // 1 скрыть кнопку сброс 
        resetBtn.style.display = 'none'
        // 2 раскрыть кнопку расчитать 
        calcBtn.style.display = 'block'
        // разблокировать все checkbox
        checkboxs.forEach(function (element) {
            element.disabled = false
            element.checked = false
        })
        // разблокировать select + input (котрый рядом с ним) 
        let screenElement = document.querySelectorAll('.screen')
        screenElement.forEach(function (screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            select.disabled = false
            select.value = ''
            input.disabled = false
            input.value = ''
        })
        // разблокировать плюс 
        plusBtn.disabled = false
        // разблокировать range
        rollbackInput.disabled = false
        rollbackInput.value = 0
        rollbackSpan.textContent = '0%'
        console.log(this)
        this.showResult()

        this.init()
    },

    addTitle: function () {
        document.title = title
        this.title = title
    },

    start: function () {
        this.addScreens()
        console.log(this.screens)
        if (this.screens === 0) {
            alert('Заполните данные')
        } else {
            this.addServices()
            this.addPrice()
            // this.getServicePercentPrices()
            this.logger()
            this.showResult()
            // скрыть кнопку расчета
            calcBtn.style.display = 'none'
            // раскрыть кнопка сброса 
            resetBtn.style.display = 'block'
            // блокировать все checkbox
            checkboxs.forEach(function (element) {
                element.disabled = true
            })
            // блокировать select + input (котрый рядом с ним) 
            let screenElement = document.querySelectorAll('.screen')
            screenElement.forEach(function (screen, index) {
                const select = screen.querySelector('select')
                const input = screen.querySelector('input')
                select.disabled = true
                input.disabled = true
            })
            // заблокировать плюс 
            plusBtn.disabled = true
            // заблокировать range
            rollbackInput.disabled = true
        }
    },

    showResult: function () {

        screenPriceInput.value = this.screenPrice;
        screensCountInput.value = this.screensCount;
        allServicePricesInput.value = this.servicePricesPercent + this.servicePricesNumber;
        fullPriceInput.value = this.fullPrice;
        servicePercentPriceInput.value = this.fullPrice - this.rollbackPrice;

        // screenPriceInput.value = this.screenPrice
        // screensCountInput.value = this.servicePricesPercent + this.servicePricesNumber
        // fullPriceInput.value = this.fullPrice
        // servicePercentPriceInput.value = this.servicePercentPrice
        // allServicePricesInput.value = Object.values(this.servicesNumber).reduce((a, b) => a + b, 0)

    },


    addScreens: function () {
        let screenElement = document.querySelectorAll('.screen')
        this.screens = [] // чистим перед заполнением 
        screenElement.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            if (+select.value === 0) {
                return
            }
            this.screensCount += +input.value;
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })

    },

    addServices: function () {
        itemsPersent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        itemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },

    addScreenBlock: () => {
        screenElement = document.querySelectorAll('.screen')
        const cloneScreen = screenElement[screenElement.length - 1].cloneNode(true)
        screenElement[screenElement.length - 1].after(cloneScreen)
    },

    addPrice: function () {
        for (let screen of this.screens) {
            this.screenPrice += screen.price; // сделать с помощью reduce

        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent

        this.rollbackPrice = Math.round(this.fullPrice * (this.rollback / 100))

        this.servicePercentPrice = this.fullPrice - this.rollbackPrice
    },

    getStepsInput: function (event) {
        rollbackSpan.textContent = event.target.value + '%'
        this.rollback = event.target.value
    },

    logger: function () {

        for (let key in this) {
            if (typeof this[key] !== 'function' && typeof this[key] !== 'object') {
                console.log('ключ: ' + key + ' значение: ' + this[key])
            }
            if (typeof this[key] === 'object') {
                console.log('ключ: ' + key + ' значение: ' + JSON.stringify(this[key], null, 4))
            }
        }
    }
}
appData.init()



