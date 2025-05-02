import { useParams } from "react-router-dom";

export default function EventDay(){
    
    const { date } = useParams();
    
    return(
        <div>
            <code>
                {date}
                Hello world
            </code>
        </div>
    )
}