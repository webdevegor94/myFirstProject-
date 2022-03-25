let title = "project_js";
let screens = "Простые, Сложные, Интерактивные";
let splits = screens.split(', ');
let screenPrice = 256;
let rollback = 20;
let fullPrice = 15000;
let adaptive = true;


console.log(screens.length);
console.log(screens.toLocaleLowerCase());
console.log(splits);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log("Сколько мне нужно сделать экранов чтобы заработать " + fullPrice / screenPrice);
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));

console.log('Тип данных значения переменной adaptive: ' + typeof adaptive);
console.log('Тип данных значения переменной title: ' + typeof title);
console.log('Тип данных значения переменной fullPrice: ' + typeof fullPrice);



