import { Avatar } from "antd";
import React from "react";
import { GetUser } from "../scripts/users";
import IconCalendar from "../components/ui/IconCalendar"
import { IconPlus } from "./ui/iconPlus";

interface IPropsUserHeader {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserHeader({onClick}: IPropsUserHeader) {

    const user = GetUser();

    return(
        <div className="flex justify-between items-center mb-2 mr-2">
            <div className="flex justify-between items-center cursor-pointer w-full mr-2 hover:bg-gray-700/15 p-2 hover:rounded-2xl" onClick={() => onClick(state => !state)}>
              <div className="flex flex-row items-center">
                <Avatar />
                  <div className="flex flex-col items-start">
                    <p className="ml-2 text-xl">
                      {user?.name}
                    </p>
                    <p className="ml-2 text-xs">
                      {user?.mail}
                    </p>
                  </div>
              </div>
              <div>
                <IconCalendar width={30} height={30} />
              </div>
            </div>
            {
              <div className="cursor-pointer hover:bg-gray-700/15 p-2 hover:rounded-2xl" onClick={() => {}}>
                {
                  !user?.isAdmin && (
                    <IconPlus width={30} height={30}/>
                  )
                }
              </div>
            }
        </div>
    )
}