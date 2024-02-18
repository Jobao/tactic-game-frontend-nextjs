import styles from "@/app/dashboard/styles.module.css";
import MyCurrentGames from "@/components/user/myCurrentGames";
import ViewPublicGames from "@/components/user/viewPublicGames";
import Link from "next/link";
export default function Dashboard() {
	return (
		<>
			<MyCurrentGames></MyCurrentGames>
			<ViewPublicGames></ViewPublicGames>

			<hr />
			<Link href={"/dashboard/profile"}>Profile</Link>
			<Link href={"/dashboard/newgame"}>New Game</Link>
		</>
	);
}
/*
<ListGames {...{ header: "Current Games", public: false }}></ListGames>
			<hr />
			<ListGames {...{ header: "Created Games", public: false }}></ListGames>
			<hr />
			<ListGames {...{ header: "Public Games", public: true }}></ListGames>


*/
