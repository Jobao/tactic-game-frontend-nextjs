import styles from "@/app/dashboard/styles.module.css";
import ListGames from "@/components/listGames";
import Link from "next/link";
export default function Dashboard() {
	return (
		<>
			<ListGames></ListGames>

			<hr />
			<Link href={"/dashboard/profile"}>Profile</Link>
		</>
	);
}
