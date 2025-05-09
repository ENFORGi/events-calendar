import React, { useEffect } from "react";

import { Badge, BadgeProps, Calendar, CalendarProps, theme } from "antd";

import ru_RU from "antd/es/date-picker/locale/ru_RU";
import dayjs, { Dayjs } from "dayjs";

import "dayjs/locale/ru";
import { useNavigate, useParams } from "react-router-dom";
import { PATHCALENDARDATE } from "../scripts/constans/pathOrigin";

interface IPropsLocaleCalendar{
  // onClick: React.Dispatch<React.SetStateAction<Date>>
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
  period: string
}

export default function LocaleCalendar({onOpen, period}: IPropsLocaleCalendar) {

  const navigate = useNavigate();

  const { date } = useParams();
  
  const value = dayjs(date);

  useEffect(() => {
    // console.log("value: ", value);
  }, []);

  dayjs.locale("ru");
    
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log("Панель сработала");
    console.log(value.format('YYYY-MM-DD'), mode);
  };
    
  const { token } = theme.useToken();
  
  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const getListData = (value: Dayjs) => {
    let listData: { type: string; content: string }[] = []; // Specify the type of listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
        ];
        break;
      default:
    }
    return listData || [];
  };
  

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

    const monthCellRender = (value: Dayjs) => {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type as BadgeProps['status']} />
            </li>
          ))}
        </ul>
      );
    };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

    return(
        <div style={wrapperStyle}>
            <Calendar cellRender={cellRender} locale={ru_RU} fullscreen={false} value={value}  showWeek={true} onPanelChange={onPanelChange} onChange={(e) => {
              console.log(e.toDate());
              // onClick(e.toDate());
              onOpen((state) => !state);
              console.log("e.toDate().toDateString()", e.toDate().getTime());
              navigate(PATHCALENDARDATE(e.toDate().toString(), `period=${period === "" ? "week" : period}`))
            }} />
        </div>
    )
}