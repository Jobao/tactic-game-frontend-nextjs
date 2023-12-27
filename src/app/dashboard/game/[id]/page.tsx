"use client";

import GameBoard2 from "@/components/game/gameboard2";
import GameBoard from "@/components/gameBoard";
import SelectedGameUnitDetails from "@/components/selectedGameUnitDetails";
import { Game, GameUnit } from "@/lib/interfaces";
import { useParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

export default function GameDetails() {
  const params = useParams();
  const [actGame, setActGame] = useState<Game>();
  const [selectedUnit, setSelectedUnit] = useState<GameUnit | undefined>();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    try {
      console.log("Effect");

      if (sessionStorage.getItem("jwt")) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = fetch("http://localhost:8081/game/" + params.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("jwt") || "",
          },
        }).then((x) => {
          if (x.status === 200) {
            x.json().then((y) => {
              setActGame(y);
            });
          } else {
            if (x.status === 401) {
              sessionStorage.removeItem("jwt");
              sessionStorage.removeItem("user_uuid");
            }
          }
        });
      }
    } catch (error) {
      //console.log(error);
    }
  }, [update]);

  function handleOnSelectUnit(gameUnit: GameUnit) {
    setSelectedUnit(gameUnit);
  }

  function handleOnChangeValue() {
    setUpdate(!update);
  }
  /*if (actGame) {
    return (
      <div>
        <p>Hola</p>
        <GameBoard2 {...{ game: actGame }}></GameBoard2>
      </div>
    );
  }*/

  return (
    <div className=" flex">
      <>
        <div className=" w-6/12">
          <GameBoard
            {...{ game: actGame, onSelectUnitHandle: handleOnSelectUnit }}
          ></GameBoard>
        </div>
        <div
          className="w-5/12 border -mr-2"
          key={selectedUnit ? selectedUnit.unitBase_uuid : "0"}
        >
          <SelectedGameUnitDetails
            {...{
              gameUnit: selectedUnit,
              handleSelectUnit: handleOnSelectUnit,
              handleUpdate: handleOnChangeValue,
            }}
          ></SelectedGameUnitDetails>
        </div>
      </>
    </div>
  );
}
