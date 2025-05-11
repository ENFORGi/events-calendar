import React, { JSX } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru'
import localeData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select, Button, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import { PATHCALENDARDATE } from '../scripts/constans/pathOrigin';
import { useNavigate } from 'react-router-dom';

dayjs.extend(localeData);
dayjs.locale('ru');

interface IPropsLocaleCalendar{
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
  period: string
}

export default function CalendarEvents({onOpen, period}: IPropsLocaleCalendar) {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  
  const navigate = useNavigate();
  
  function getFullDateCurrent(): string{
    const firtSybmwol = dayjs(new Date()).format("dddd D MMMM YYYY г.")[0].toUpperCase();
    const res = dayjs(new Date()).format("dddd D MMMM YYYY г.").slice(1);
    return firtSybmwol + res;
  }

  return (
    <div>
      <Calendar
      onChange={(e) => {
        onOpen((state) => !state);
        navigate(PATHCALENDARDATE(e.toDate().toString(), `period=${period === "" ? "week" : period}`))
      }}
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const day = value.day();
          const months = value.localeData().monthsShort();
          const month  = value.month();
          const year   = value.year();

          const monthOptions = months.map((label, idx) => (
            <Select.Option key={idx} value={idx}>
              {label}
            </Select.Option>
          ));

          const yearOptions: JSX.Element[] = [];
          for (let y = year - 10; y <= year + 10; y++) {
            yearOptions.push(
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            );
          }

          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>{getFullDateCurrent()}</Typography.Title>
              <Row gutter={8} align="middle">
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={e => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Месяц</Radio.Button>
                    <Radio.Button value="year">Год</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={year}
                    onChange={newYear => onChange(value.clone().year(newYear))}
                  >
                    {yearOptions}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={newMonth => onChange(value.clone().month(newMonth))}
                  >
                    {monthOptions}
                  </Select>
                </Col>
               <Col>
                 <Button
                 color="danger"
                 size="small"
                 value={day}
                 onClick={() => {
                  const today = dayjs();
                    onOpen(state => !state);
                    navigate(PATHCALENDARDATE(today.toDate().toString(), `period=day`))
                  }}>
                   Текущий день
                 </Button>
               </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
}
