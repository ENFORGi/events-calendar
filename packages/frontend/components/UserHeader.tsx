import { Avatar } from "antd";

import { useState } from "react";

import { GetUser } from "../scripts/users";

import { IconCalendar } from "../components/ui/IconCalendar"
import { IconPlus } from "./ui/iconPlus";
import { IconNotify } from "./ui/IconNotify";
import { IconList } from "./ui/IconList"

import ButtonIcon from "./ButtonIcon";
import ButtonPopover from "./ButtonPopover"
import { useNavigate } from "react-router-dom";

import { PATHSUBSCRIBEEVENTS } from "../scripts/constans/pathOrigin";
import AboutUser from "./AboutUser";

interface IPropsUserHeader {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserHeader({onClick}: IPropsUserHeader) {

  const user = GetUser();

  const [isOpenNotify, setIsOpenNotify] = useState(false);

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const navigation = useNavigate();

  function onHandleSubEvents(){
    navigation(PATHSUBSCRIBEEVENTS);
  }

    return(
        <div className="flex justify-between items-center mb-2 mr-1">
            <div className="flex justify-between items-center cursor-pointer w-full mr-2 hover:bg-gray-700/15 p-2 hover:rounded-2xl" onClick={() => {
              onClick(state => !state);
              setIsOpenCalendar(state => !state);
            }}>
              <div className="flex flex-row items-center mr-2">
                <AboutUser/>
              </div>
              <div>
                <IconCalendar width={30} height={30} />
                {
                  <img src={!isOpenCalendar ? "../src/assets/arrowBottom.svg" : "../src/assets/arrowUp.svg"}></img>
                }
              </div>
            </div>
            {/* Можно красить в красный когда есть приглашенные уведомления */}
            <div className="flex flex-row items-center">
              <ButtonPopover Icon={IconNotify} isOpen = {isOpenNotify} setIsOpen={setIsOpenNotify}/>
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