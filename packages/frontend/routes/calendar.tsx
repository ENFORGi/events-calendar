import { useState } from "react";

import SelectedEventList from "../components/ui/SelectedEvents";
import SelectedIVCList from "../components/ui/SelectedIVC";

import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

export default function CalendarEvents() {
  const [selectedIVC, setSelectedIVC] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const { token } = theme.useToken();
  
  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  
  return (
    <div className="h-full">
        { /* Header */ }
        <div className="flex flex-col w-auto">
            <div style={wrapperStyle}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={(e) => console.log(e)} />
            </div>
            <SelectedIVCList selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
            <SelectedEventList selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
        </div>
    </div>
  );
}
