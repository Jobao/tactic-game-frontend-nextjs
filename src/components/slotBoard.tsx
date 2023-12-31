"use client";
import { GameUnit } from "@/lib/interfaces";

export default function SlotBoard(
  unit: GameUnit | null,
  handleOnSelectUnit: Function | null
) {
  if (unit && handleOnSelectUnit) {
    return (
      <div>
        <button onClick={() => handleOnSelectUnit(unit)}>Select</button>
      </div>
    );
  }
  return <div></div>;
}
