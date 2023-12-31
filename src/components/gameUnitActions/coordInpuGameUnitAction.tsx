"use client";
import { Button } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "flowbite-react";

export function CoordInputGameUnitAction(props: {
  action: string;
  unit_uuid: string;
  handleUpdate: Function;
}) {
  const params = useParams();
  const [x, setX] = useState(Number);
  const [y, setY] = useState(Number);
  const [lastSlot, setLastSlot] = useState<HTMLElement | null>();

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
          } else {
          }
        });
      }
    });
  }
  return (
    <div className=" w-12/12 inline-flex">
      <input
        className=" w-4/12"
        type="number"
        name="X"
        id="X"
        placeholder="X"
        min={0}
        onChange={(e) => {
          setX(Number.parseInt(e.currentTarget.value));
          if (y) {
            if (lastSlot) {
              lastSlot.style.backgroundColor = "white";
            }
            setLastSlot(
              document.getElementById(x.toString() + "-" + y.toString())
            );
            if (lastSlot) {
              lastSlot.style.backgroundColor = "red";
            }
          }
        }}
      />
      <input
        className=" w-4/12"
        type="number"
        name="Y"
        id="Y"
        placeholder="Y"
        min={0}
        onChange={(e) => {
          setY(Number.parseInt(e.currentTarget.value));
          if (x) {
            if (lastSlot) {
              lastSlot.style.backgroundColor = "white";
            }
            setLastSlot(
              document.getElementById(x.toString() + "-" + y.toString())
            );
            if (lastSlot) {
              lastSlot.style.backgroundColor = "red";
            }
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
