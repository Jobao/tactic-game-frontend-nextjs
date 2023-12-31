"use client";

import GameBoard from "@/components/gameBoard";
import GameUnitSelectedTab from "@/components/gameUnitSelectedTab";
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
    if (selectedUnit) {
      handleOnSelectUnit(selectedUnit);
    }
  }

  if (actGame) {
    return (
      <div className=" flex">
        <div className=" w-6/12">
          <GameBoard
            {...{ game: actGame, onSelectUnitHandle: handleOnSelectUnit }}
          ></GameBoard>
        </div>
        <div className="w-6/12 border -mr-2">
          {selectedUnit ? (
            <GameUnitSelectedTab
              {...{ gameUnit: selectedUnit, handleUpdate: handleOnChangeValue }}
            ></GameUnitSelectedTab>
          ) : (
            <div>Seleccione una unidad</div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Error en la carga del juego</div>;
  }
}

//key={selectedUnit ? selectedUnit.unitBase_uuid : "0"}
