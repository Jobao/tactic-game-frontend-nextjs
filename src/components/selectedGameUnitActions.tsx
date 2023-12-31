"use client";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Toast,
} from "flowbite-react";
import { GameUnit } from "@/lib/interfaces";
import { CoordInputGameUnitAction } from "./gameUnitActions/coordInpuGameUnitAction";
import ButtonWaitGameUnitAction from "./gameUnitActions/buttonWaitGameUnitAction";

export default function SelectedGameUnitActions(props: {
  gameUnit: GameUnit;
  handleUpdate: Function;
}) {
  return (
    <div className="relative">
      <Accordion collapseAll>
        <AccordionPanel>
          <AccordionTitle {...{ disabled: !props.gameUnit?.canMove }}>
            <span
              className={
                !props.gameUnit?.canMove
                  ? " line-through decoration-red-600"
                  : ""
              }
            >
              Mover
            </span>
          </AccordionTitle>
          <AccordionContent>
            <CoordInputGameUnitAction
              {...{
                action: "MOVE",
                unit_uuid: props.gameUnit?.unitBase_uuid,
                handleUpdate: props.handleUpdate,
              }}
            ></CoordInputGameUnitAction>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle {...{ disabled: !props.gameUnit?.canAttack }}>
            <span
              className={
                !props.gameUnit?.canAttack
                  ? " line-through decoration-red-600"
                  : ""
              }
            >
              Atacar
            </span>
          </AccordionTitle>
          <AccordionContent>
            <CoordInputGameUnitAction
              {...{
                action: "ATTACK",
                unit_uuid: props.gameUnit?.unitBase_uuid,
                handleUpdate: props.handleUpdate,
              }}
            ></CoordInputGameUnitAction>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Esperar</AccordionTitle>
          <AccordionContent>
            <ButtonWaitGameUnitAction></ButtonWaitGameUnitAction>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}
