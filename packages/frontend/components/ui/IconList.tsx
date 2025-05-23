
import { IPropsIcon } from "../../scripts/interfaces/IPropsIcon"

export function IconList({width, height}: IPropsIcon){
    return(
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}