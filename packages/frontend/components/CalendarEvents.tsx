import React, { JSX, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru'
import localeData from 'dayjs/plugin/localeData';
import { Calendar, Col, Row, Select, Button, Typography, ConfigProvider } from 'antd';
import type { CalendarProps } from 'antd';
import { PATHCALENDARDATE } from '../scripts/constans/pathOrigin';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ru_RU from 'antd/lib/locale/ru_RU';   

dayjs.extend(localeData);
dayjs.locale('ru');


export default function CalendarEvents() {

  const { date } = useParams();
  
  const [selectDate, setSelectDate] = useState<Date>(new Date(date ?? Date.now()));

  const [searchParams] = useSearchParams();

  const period = searchParams.get("period") || "day";

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
    <ConfigProvider locale={ru_RU}>
      <Calendar
        onChange={(e) => {
          console.log("ping");
        setSelectDate(e.toDate());
        navigate(PATHCALENDARDATE(e.toDate().toString(), `period=${period}`));
      }}
        fullscreen={false}
        headerRender={({ value, onChange }) => {
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
                    onChange={newMonth => {
                      onChange(value.clone().month(newMonth));
                    }}>
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
              <Row gutter={8} align="stretch" className='m-2'>
                {/* Выбор отражения - день */}
               <Col>
                 <Button
                 type={period === "day" ? "primary" : "default"}
                 color="danger"
                 size="small"
                 onClick={() => {
                    // onOpen(state => !state);
                    if(!selectDate) return;
                    navigate(PATHCALENDARDATE(selectDate.toString(), `period=day`))
                  }}>
                   День
                 </Button>
               </Col>
               {/* Выбор отображения - неделя */}
               <Col>
                 <Button
                 type={period === "week" ? "primary" : "default"}
                 color="danger"
                 size="small"
                 onClick={() => {
                    // onOpen(state => !state);
                    if(!selectDate) return;
                    navigate(PATHCALENDARDATE(selectDate.toString(), `period=week`))
                  }}>
                   Неделя
                 </Button>
               </Col>
               {/* Выбор отражения месяц */}
               <Col>
                 <Button
                 type={period === "month" ? "primary" : "default"}
                 color="danger"
                 size="small"
                 onClick={(e) => {
                  console.log("e: ", e);
                    // onOpen(state => !state);
                    if(!selectDate) return;
                    navigate(PATHCALENDARDATE(selectDate.toString(), `period=month`))
                  }}>
                   Месяц
                 </Button>
               </Col>
               {/* Выбор отображения - текущего дня */}
               <Col>
                 <Button
                 color="danger"
                 size="small"
                 onClick={() => {
                    const today = dayjs();
                    // onOpen(state => !state);
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
    </ConfigProvider>
  );
}
