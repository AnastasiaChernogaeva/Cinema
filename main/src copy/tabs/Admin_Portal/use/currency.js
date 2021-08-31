
const formatterCurrency = new Intl.NumberFormat('ru-RU',{currency:'BYN', style:'currency',})

export function currency(value){
    return formatterCurrency.format(value)
}