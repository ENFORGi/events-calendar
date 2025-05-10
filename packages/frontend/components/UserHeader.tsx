import { Avatar } from "antd";

import React from "react";

import { GetUser } from "../scripts/users";

import { IconCalendar } from "../components/ui/IconCalendar"
import { IconPlus } from "./ui/iconPlus";
import { IconNotify } from "./ui/IconNotify";
import { IconList } from "./ui/IconList"

import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

import { PATHSUBSCRIBEEVENTS } from "../scripts/constans/pathOrigin";

interface IPropsUserHeader {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserHeader({onClick}: IPropsUserHeader) {

  const user = GetUser();

  const navigation = useNavigate();

  function onHandleSubEvents(){
    navigation(PATHSUBSCRIBEEVENTS);
  }

    return(
        <div className="flex justify-between items-center mb-2 mr-1">
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
            {/* Можно красить в красный когда есть приглашенные уведомления */}
            <div className="flex flex-row items-center">
              <ButtonIcon onClick={() => {}}  Icon={IconNotify} width={30} height={30}/>
              <ButtonIcon onClick={onHandleSubEvents}  Icon={IconList} width={30} height={30}/>
              {
                  user?.isAdmin && (
                    <ButtonIcon Icon={IconPlus} width={30} height={30} onClick={() => {}} />
                  )
              }
            </div>
        </div>
    )
}