"use client";
import { Game, GameUnit } from "@/lib/interfaces";
import SlotBoard from "./slotBoard";

interface IGameBoardProp {
  game: Game | undefined;
  onSelectUnitHandle: Function;
}

export default function GameBoard(props: {
  game: Game | undefined;
  onSelectUnitHandle: Function;
}) {
  if (!props.game) {
    return <></>;
  }
  const cells = [];
  const gridd = new Map();
  props.game.placedUnitList.forEach((element) => {
    element.gameUnit.forEach((element2) => {
      element2.user_uuid = element.user_uuid;
      gridd.set([element2.posX, element2.posY].join("::"), element2);
    });
  });

  for (let i = 0; i < props.game.sizeY; i++) {
    const row = [];
    for (let j = 0; j < props.game.sizeX; j++) {
      const element: GameUnit = gridd.get([i, j].join("::"));
      if (element) {
        row.push(SlotBoard(element, props.onSelectUnitHandle));
      } else {
        row.push(SlotBoard(null, null));
      }
    }
    cells.push(row);
  }
  return (
    <div
      className={
        "grid grid-cols-" + props.game.sizeX + " grid-row-" + props.game.sizeY
      }
    >
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <div
              key={rowIndex + 1 * cellIndex + 1 + 1}
              style={{
                border: "1px solid black",
                width: "50px",
                height: "50px",
                textAlign: "center",
                lineHeight: "50px",
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
