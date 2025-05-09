import React from "react";

interface IPropsButtonIcon {
    Icon: React.ComponentType<{width: number, height: number}>,
    onClick: () => void,
    width: number,
    height: number
}

export default function ButtonIcon({Icon, onClick, width, height}: IPropsButtonIcon) {
    return(
        <div onClick={onClick} className="cursor-pointer hover:bg-gray-700/15 p-2 hover:rounded-2xl mr-1">
            <Icon width={width} height={height}></Icon>
        </div>
    );
}