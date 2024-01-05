"use client";
import { Button } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import { gameContext } from "../contexts/gameContext";
import { Accordion } from "flowbite";

export function CoordInputGameUnitAction(props: {
  action: string;
  unit_uuid: string;
  handleUpdate: Function;
  maxX: number;
  maxY: number;
  renders: boolean;
}) {
  const params = useParams();
  const [lastSlot, setLastSlot] = useState<HTMLElement | null>();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (lastSlot) {
      lastSlot.style.backgroundColor = "white";
    }
    setLastSlot(document.getElementById(x.toString() + "-" + y.toString()));
    if (x && y) {
    }
  }, [x, y]);

  useEffect(() => {
    if (lastSlot && props.renders) {
      lastSlot.style.backgroundColor = "red";
    }
  }, [lastSlot]);

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
          unit_uuid: props.unit_uuid,
          action: {
            type: props.action,
            target: {
              x: x,
              y: y,
            },
          },
        }),
      }
    );
    response.then((x) => {
      if (x.status === 201) {
        x.json().then((res) => {
          if (res.status === "OK") {
            props.handleUpdate();
          }
        });
      }
    });
  }

  return (
    <div className=" w-12/12 inline-flex">
      <input
        value={x}
        className=" w-4/12"
        type="number"
        name="X"
        id="X"
        placeholder="X"
        min={0}
        max={props.maxX - 1}
        onChange={(e) => {
          if (!Number.isNaN(e.currentTarget.valueAsNumber)) {
            setX(Number.parseInt(e.currentTarget.value));
          } else {
            setX(0);
          }
        }}
      />
      <input
        value={y}
        className=" w-4/12"
        type="number"
        name="Y"
        id="Y"
        placeholder="Y"
        min={0}
        max={props.maxY - 1}
        onChange={(e) => {
          if (!Number.isNaN(e.currentTarget.valueAsNumber)) {
            setY(Number.parseInt(e.currentTarget.value));
          } else {
            setY(0);
          }
        }}
      />
      <Button
        className=" w-4/12"
        onClick={() => {
          handleClick();
        }}
      >
        {props.action}
      </Button>
    </div>
  );
}
