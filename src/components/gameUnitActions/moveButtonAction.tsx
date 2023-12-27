"use client";
import { useState } from "react";
import { CoordInputGameUnitAction } from "./coordInpuGameUnitAction";
import { GameUnit } from "@/lib/interfaces";
import { useParams, useRouter } from "next/navigation";

export function MoveButtonAction(props: {
  gameUnit: GameUnit | undefined;
  handleUpdate: Function;
}) {
  const params = useParams();

  function handleClick() {
    let response = fetch(
      "http://localhost:8081/game/" + params.id + "/action",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("jwt") || "",
        },
        body: JSON.stringify({
          unit_uuid: props.gameUnit?.unitBase_uuid,
          action: {
            type: "MOVE",
            target: {
              x: Number.parseInt(
                (document.getElementById("X") as HTMLInputElement).value
              ),
              y: Number.parseInt(
                (document.getElementById("Y") as HTMLInputElement).value
              ),
            },
          },
        }),
      }
    );

    response.then((x) => {
      if (x.status === 200) {
        x.json().then((res) => {
          if (res.status === "OK") {
            props.handleUpdate();
          }
        });
      }
    });
  }

  if (props.gameUnit?.canMove) {
    return (
      <div className=" inline-block w-12/12">
        <CoordInputGameUnitAction
          {...{ show: props.gameUnit?.canMove }}
        ></CoordInputGameUnitAction>
        <button
          onClick={() => handleClick()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/12"
        >
          MOVER
        </button>
      </div>
    );
  }
}
