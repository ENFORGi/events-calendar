
const weekDayNames = ["ВC", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

export function getWeekDates(dates: Date){
    const weekStartion = 1;
    
    const date = new Date(dates);

    const dayOfWeek = date.getDay();

    let offset = dayOfWeek - weekStartion;

    if(offset < 0){
        offset += 7;
    }

    const weekStart = new Date(date);

    weekStart.setDate(date.getDate() - offset);

    const week: Date[] = [];

    for (let i = 0; i < 14; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        week.push(d);       
    }
    return week;
}

export function nameOfWeek(date: Date) {
    return weekDayNames[date.getDay()];
}