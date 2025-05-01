
import { useState } from "react";

import SelectedEventList from "../components/ui/SelectedEvents"
import SelectedIVCList from "../components/ui/SelectedIVC"
 
export default function CalendarEvents() {

    //TODO: Лучше использовать хук useState? Или делать отдельную переменную для хранения значения года?
    //const [currentYear, setCurrentYear] = useState(new Date(Date.now().valueOf()).getFullYear());

    const [selectedIVC, setSelectedIVC] = useState("");

    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return(
        <div>
            {/* Header */}
            <div>
                <SelectedIVCList selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
                <SelectedEventList selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
            </div>
            {/* Body */}
            <div>

            </div>
        </div>
    )
}