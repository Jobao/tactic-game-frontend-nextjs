"use client";
import { Button, FloatingLabel, Label, RangeSlider, ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
class createGameDto {
	sizeX!: number;
	sizeY!: number;
	minUnits!: number;
	maxUnits!: number;
	isPublic!: boolean;
}
export default function NewGame() {
	const [sizeX, setSizeX] = useState(15);
	const [sizeY, setSizeY] = useState(15);
	const [minUnits, setMinUnits] = useState(1);
	const [maxUnits, setMaxUnits] = useState(7);
	const [isPublic, setIsPublic] = useState(false);
	const [autoStart, setAutoStart] = useState(false);
	function handleClick() {
		var c: createGameDto = new createGameDto();

		c.sizeX = sizeX;
		c.sizeY = sizeY;
		c.minUnits = minUnits;
		c.maxUnits = maxUnits;
		c.isPublic = isPublic;
		const response = fetch("http://localhost:8081/game/", {
			method: "POST",
			body: JSON.stringify(c),
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		});
	}

	return (
		<div className=" w-1/3 ">
			<div>
				<Label>Tamano X</Label>
				<RangeSlider
					min={10}
					max={30}
					value={sizeX}
					onChange={(x) => {
						setSizeX(Number.parseInt(x.target.value));
					}}
				></RangeSlider>
				<span>{sizeX}</span>
			</div>
			<div>
				<Label>Tamano Y</Label>
				<RangeSlider
					min={10}
					max={30}
					value={sizeY}
					onChange={(x) => {
						setSizeY(Number.parseInt(x.target.value));
					}}
				></RangeSlider>
				<span>{sizeY}</span>
			</div>
			<div>
				<Label>Cantidad Minima de Unidades</Label>
				<RangeSlider
					min={1}
					max={3}
					value={minUnits}
					onChange={(x) => {
						setMinUnits(Number.parseInt(x.target.value));
					}}
				></RangeSlider>
				<span>{minUnits}</span>
			</div>
			<div>
				<Label>Cantidad Maxima de unidades</Label>
				<RangeSlider
					min={7}
					max={9}
					value={maxUnits}
					onChange={(x) => {
						setMaxUnits(Number.parseInt(x.target.value));
					}}
				></RangeSlider>
				<span>{maxUnits}</span>
			</div>

			<ToggleSwitch checked={isPublic} label="Publico ?" onChange={setIsPublic} />
			<ToggleSwitch checked={autoStart} label="Auto Start ?" onChange={setAutoStart} />

			<Button
				onClick={() => {
					handleClick();
				}}
			>
				Crear
			</Button>
		</div>
	);
}
