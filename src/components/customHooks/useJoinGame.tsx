"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export async function useJoinGame(game_uuid: string) {
	var res = false;

	axios.post("http://localhost:8081/game/" + game_uuid + "/join", {}, { headers: { authorization: sessionStorage.getItem("jwt") } }).then((x) => {
		console.log(x.data);
	});
}
