"use client";

import { GameUnit } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function SelectedGameUnitStatus(props: {
  gameUnit: GameUnit;
  unit_uuid: string;
  user_uuid: string;
}) {
  const [unitDetail, setUnitDetail] = useState<{
    name: string;
  }>();

  useEffect(() => {
    let response = fetch(
      "http://localhost:8081/user/unit/" +
        props.gameUnit.user_uuid +
        "/" +
        props.gameUnit.unitBase_uuid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("jwt") || "",
        },
      }
    );
    response.then((x) => {
      if (x.ok) {
        x.json().then((y) => {
          if (y.status === "OK") {
            setUnitDetail(y.unit);
          }
        });
      }
    });
  }, [props.unit_uuid]);

  if (unitDetail) {
    return (
      <div>
        <p>Nombre: {unitDetail.name}</p>
        <p>
          HP: {props.gameUnit.currentHP} /
          {
            props.gameUnit.stats.find((x) => {
              return x.statsName === "HP";
            })?.amount
          }
        </p>
        <p>
          MP: {props.gameUnit.currentMP} /
          {
            props.gameUnit.stats.find((x) => {
              return x.statsName === "MP";
            })?.amount
          }
        </p>
      </div>
    );
  }
  return <></>;
}
