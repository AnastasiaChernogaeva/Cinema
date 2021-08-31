const formatterDate = new Intl.DateTimeFormat('ru-RU',{year: "numeric",
month: "numeric",day: "numeric"})

export function date(value){
    return formatterDate.format(new Date(value.split('-').join(', ')))
}