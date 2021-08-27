const SUBTITLES_MAP = {
    films:'Фильмы',
    cinemas:'Кинотеатры',
    sessions:'Сеансы',
    services:'Дополнительные услуги',
    adding:'Добавить',
    orders:'Заказы',

}

export function subtitles (englishName){
    return (englishName!=='admin'|| '')?SUBTITLES_MAP[englishName]:'Фильмы'
}