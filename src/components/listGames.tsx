"use client";
import { useEffect, useState } from "react";
import { Game } from "@/lib/interfaces";
import PlayGameButton from "./playGameButton";
import React from "react";
import { useRouter } from "next/navigation";

export default function ListGames() {
  const [games, setGames] = useState<[Game]>();
  const [loading, setloading] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    setloading(true);
    const response = fetch("http://localhost:8081/game/allgamesbyuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("jwt") || "",
      },
    });

    response.then((res) => {
      if (res.status === 200) {
        res.json().then((j) => {
          setGames(j);
          setloading(false);
        });
      }
    });
  }, []);

  if (!loading) {
    return (
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Game ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Finalizado
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {games?.map((x) => {
                return (
                  <tr
                    key={x._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {x._id}
                    </th>
                    <td className="px-6 py-4">{x.isEnd ? "SI" : "NO"}</td>
                    <td className="px-6 py-4">
                      <PlayGameButton
                        {...{ game_uuid: x._id, router: router }}
                      ></PlayGameButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
