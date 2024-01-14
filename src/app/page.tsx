"use client";
import LoginComponent from "@/components/Login/loginComponent";
import { Alert, Button, Dropdown } from "flowbite-react";
import { setSelectedUnit, prueba } from "@/lib/redux/store";

export default function Home() {
	return (
		<main>
			<LoginComponent></LoginComponent>
		</main>
	);
}
