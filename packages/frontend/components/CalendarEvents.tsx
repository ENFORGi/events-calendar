import React, { useEffect, useState } from "react";

import { Badge, BadgeProps, Calendar, CalendarProps, theme } from "antd";

import ru_RU from "antd/es/date-picker/locale/ru_RU";
import dayjs, { Dayjs } from "dayjs";

import "dayjs/locale/ru";
import { useNavigate, useParams } from "react-router-dom";

interface IPropsLocaleCalendar{
  onClick: React.Dispatch<React.SetStateAction<Date>>
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LocaleCalendar({onClick, onOpen}: IPropsLocaleCalendar) {

  const navigate = useNavigate();

  const { date } = useParams(); 
  
  const [value, setValue] = useState<Dayjs>(dayjs(date));

  useEffect(() => {
    console.log("value: ", value);
  }, [])

  dayjs.locale("ru");
    
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
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
          { type: 'success', content: 'This is very long usual event......' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
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
              onClick(e.toDate());
              onOpen((state) => !state);
              navigate(`/Сalendar/${e.toDate()}`)
            }} />
        </div>
    )
}