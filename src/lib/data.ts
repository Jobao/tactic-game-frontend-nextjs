import router from "next/router";
import { CustomResponseType, Game, GameUnit, LoginData, MoveAction, Unit, User } from "./interfaces";
import axios, { Axios } from "axios";

export async function Login(loginData: LoginData): Promise<{ access_token: string; user_uuid: string }> {
	const response = await fetch("http://localhost:8081/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginData),
	});
	let token = await response.json();
	return token;
}

export async function MovePlayer(unit_uuid: string, game_uuid: string, x: number, y: number) {
	let result = false;
	let response = fetch("http://localhost:8081/game/" + game_uuid + "/action", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
		body: JSON.stringify({
			unit_uuid: unit_uuid,
			action: {
				type: "MOVE",
				target: {
					x: x,
					y: y,
				},
			},
		}),
	});
	await response.then(async (x) => {
		if (x.status === 201) {
			await x.json().then((res) => {
				if (res.status === "OK") {
					result = true;
				}
			});
		}
	});

	return result;
}

export async function AttackPlayer(unit_uuid: string, game_uuid: string, x: number, y: number) {
	let result = false;
	let response = fetch("http://localhost:8081/game/" + game_uuid + "/action", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
		body: JSON.stringify({
			unit_uuid: unit_uuid,
			action: {
				type: "ATTACK",
				target: {
					x: x,
					y: y,
				},
			},
		}),
	});
	await response.then(async (x) => {
		if (x.status === 201) {
			await x.json().then((res) => {
				if (res.status === "OK") {
					result = true;
				}
			});
		}
	});

	return result;
}

export async function addNewUnit(name: string, class_id: string) {
	let result: { status: boolean; reason: string } = { status: false, reason: "" };
	const response = fetch("http://localhost:8081/user/unit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
		body: JSON.stringify({ name, class_id }),
	});

	await response.then(async (x) => {
		if (x.status === 201) {
			result.status = true;
		} else {
			if (x.status === 400) {
				result.status = false;
				result.reason = (await x.json()).message;
			}
		}
	});
	return result;
}

export async function getAllUnits() {
	let result: CustomResponseType<Unit[]> | undefined;
	const response = fetch("http://localhost:8081/user/unit", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
	});

	await response.then(async (res) => {
		if (res.ok) {
			await res.json().then((x: CustomResponseType<Unit[]>) => {
				result = x;
			});
		}
	});

	return result;
}

export async function getGameDetails(game_uuid: string) {
	let result: CustomResponseType<Game> | undefined;
	const response = fetch("http://localhost:8081/game/" + game_uuid, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
	});

	await response.then(async (res) => {
		if (res.ok) {
			await res.json().then((x: CustomResponseType<Game>) => {
				result = x;
			});
		}
	});
	return result;
}

export async function getUserData() {
	let result: User | undefined;
	const response = fetch("http://localhost:8081/user", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: sessionStorage.getItem("jwt") || "",
		},
	});

	await response.then(async (res) => {
		if (res.ok) {
			await res.json().then((x: User) => {
				result = x;
			});
		}
	});
	return result;
}
