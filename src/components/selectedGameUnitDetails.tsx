"use client";
import { GameUnit } from "@/lib/interfaces";
import SelectedGameUnitActions from "./selectedGameUnitActions";
import { useEffect, useState } from "react";
import useSessionStorage from "./customHooks/useGetSession";

export default function SelectedGameUnitDetails(props: {
  gameUnit: GameUnit | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleSelectUnit: Function;
}) {
  if (!props.gameUnit) {
    return <></>;
  }
  return (
    <div className="relative">
      <div>
        <SelectedGameUnitActions
          {...{
            showActions:
              props.gameUnit?.user_uuid === useSessionStorage("user_uuid"),
            gameUnit: props.gameUnit,
          }}
        ></SelectedGameUnitActions>
      </div>

      <div className="absolute right-0">
        <button
          type="button"
          className="  text-red-900 bg-yellow-300"
          onClick={() => props.handleSelectUnit(undefined)}
        >
          X
        </button>
      </div>
    </div>
  );
}
