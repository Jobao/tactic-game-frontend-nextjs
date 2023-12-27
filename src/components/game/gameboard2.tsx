import { Game } from "@/lib/interfaces";
import GameBoardSlot from "./gameBoardSlot";

export default function GameBoard2(props: { game: Game }) {
  let grid = [];
  for (let X = 0; X < props.game.sizeX; X++) {
    for (let Y = 0; Y < props.game.sizeY; Y++) {
      grid.push(GameBoardSlot());
    }
  }

  return (
    <div
      className={
        "grid grid-cols-" + props.game.sizeX + " grid-row-" + props.game.sizeY
      }
    >
      {grid.map((cell) => (
        <div className="flex">{cell}</div>
      ))}
    </div>
  );
}
//grid-cols-" + props.game.sizeX + "
/*
{Array.from({ length: props.game.sizeX * props.game.sizeY }).map(
        (x, index) => {
          return GameBoardSlot();
        }
      )}

*/
