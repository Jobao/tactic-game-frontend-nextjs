import { GameUnit } from "@/lib/interfaces";
import { Tabs, Toast } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import SelectedGameUnitActions from "./selectedGameUnitActions";
import useSessionStorage from "./customHooks/useGetSession";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import SelectedGameUnitStatus from "./selectedGameUnitStatus";
export default function GameUnitSelectedTab(props: {
  gameUnit: GameUnit;
  handleUpdate: Function;
}) {
  const isMine = props?.gameUnit?.user_uuid === useSessionStorage("user_uuid");

  return (
    <Tabs aria-label="Default tabs" style="fullWidth">
      <Tabs.Item
        className="relative"
        disabled={!isMine}
        title="Acciones"
        icon={HiUserCircle}
      >
        {isMine ? (
          <SelectedGameUnitActions
            {...{
              gameUnit: props.gameUnit,
              handleUpdate: props.handleUpdate,
            }}
          ></SelectedGameUnitActions>
        ) : (
          <div></div>
        )}
      </Tabs.Item>
      <Tabs.Item
        title="Status"
        icon={MdDashboard}
        key={props.gameUnit.unitBase_uuid}
      >
        {props.gameUnit ? (
          <SelectedGameUnitStatus
            {...{
              unit_uuid: props.gameUnit.unitBase_uuid,
              user_uuid: props.gameUnit.user_uuid,
              gameUnit: props.gameUnit,
            }}
          ></SelectedGameUnitStatus>
        ) : (
          <></>
        )}
      </Tabs.Item>
    </Tabs>
  );
}
