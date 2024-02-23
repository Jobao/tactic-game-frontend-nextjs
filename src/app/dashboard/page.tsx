"use client";
import styles from "@/app/dashboard/styles.module.css";
import MyCurrentGames from "@/components/user/myCurrentGames";
import ViewPublicGames from "@/components/user/viewPublicGames";
import Link from "next/link";
import { useState } from "react";
export default function Dashboard() {
	const [update, setUpdate] = useState<boolean>(true);

	function handleJoin() {
		setUpdate(!update);
	}
	return (
		<>
			<MyCurrentGames {...{ onJoined: update }}></MyCurrentGames>
			<ViewPublicGames {...{ handleJoin: handleJoin, update: update }}></ViewPublicGames>

			<hr />
			<Link href={"/dashboard/profile"}>Profile</Link>
			<Link href={"/dashboard/newgame"}>New Game</Link>
		</>
	);
}
