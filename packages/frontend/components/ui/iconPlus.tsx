

import { IPropsIcon } from "../../scripts/interfaces/IPropsIcon"

export function IconPlus({width, height} : IPropsIcon){
    return(
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10V38M10 24H38" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}