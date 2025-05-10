
//Путь к календарю
export const PATHORIGIN: string = `/Сalendar`;

//Путь к выбору дня / периода и просмотра событий с сортировкой
export const PATHCALENDARDATE = (date: string, query: string) => `${PATHORIGIN}/${date}?${query}`

//Путь к списку подписанных ивентов
export const PATHSUBSCRIBEEVENTS: string = `${PATHORIGIN}/SubscribeEvents`;