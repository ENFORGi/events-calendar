
//Здесь находятся все пути к страничкам

//Календарь
export const PATHORIGIN: string = `/Сalendar`;

//Выбору дня / периода и просмотра событий с сортировкой
export const PATHCALENDARDATE = (date: string, query: string) => `${PATHORIGIN}/${date}?${query}`

//Список подписанных ивентов
export const PATHSUBSCRIBEEVENTS: string = `${PATHORIGIN}/SubscribeEvents`;

//Выбранному дню периода
export const PATHSELECTDAY = (date: string) => `${PATHORIGIN}/SelectDay/${date}`;
