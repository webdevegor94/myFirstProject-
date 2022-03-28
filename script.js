let rollback = 20;//процент отката от fullPrice
let title = prompt("Как называется ваш проект?", "Web google")
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные")
let screenPrice = Math.abs(Number(prompt("Сколько будет стоить данная работа?", "12000")))
let adaptive = confirm("Нужен ли адаптив на сайте?")
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать галлерею")
let servicePrice1 = Math.abs(Number(prompt("Сколько это будет стоить?", "1500")));
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Сверстать по PP")
let servicePrice2 = Math.abs(Number(prompt("Сколько это будет стоить?", "3000")));
let fullPrice = screenPrice + servicePrice1 + servicePrice2
let rollbackPrice = fullPrice * (rollback / 100)
let servicePercentPrice = fullPrice - Math.ceil(rollbackPrice)

if (fullPrice >= 30000) {
    alert("Даем скидку 10%");
} else if (15000 >= fullPrice < 30000) {
    alert("Даем скидку 5%");
} else if (0 >= fullPrice < 15000) {
    alert("Скидка не предусмотрена");
}

console.log(JSON.stringify({
    title,
    screens,
    screenPrice,
    adaptive,
    service1,
    servicePrice1,
    service2,
    servicePrice2,
    fullPrice,
    rollbackPrice,
    servicePercentPrice

}, null, 4))






// Усложненное задание ()

// let lang = 'en';
// if (lang === 'ru') {
//     console.log("Дни недели выводятся на русском")
// } else {
//     console.log("Дни недели выводяся на английском")
// }

// switch (lang) {
//     case 'ru':
//         console.log("Неделя на русском")
//         break;
//     case 'en':
//         console.log("Неделя на английском")
//         break;
// }
