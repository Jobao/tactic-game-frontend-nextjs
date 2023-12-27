import { GameUnit } from "@/lib/interfaces";
import { MoveButtonAction } from "./gameUnitActions/moveButtonAction";
import PP from "./prueba";

export default function SelectedGameUnitActions(props: {
  showActions: boolean;
  gameUnit: GameUnit | undefined;
  handleUpdate: Function;
}) {
  if (!props.showActions) {
    return <></>;
  }
  return (
    <div>
      <MoveButtonAction
        {...{ gameUnit: props.gameUnit, handleUpdate: props.handleUpdate }}
      ></MoveButtonAction>
    </div>
  );
}
