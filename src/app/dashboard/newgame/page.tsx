import { Button, FloatingLabel } from "flowbite-react";

export default function NewGame() {
	return (
		<div className=" w-1/3">
			<FloatingLabel id="x" type="number" min={10} max={30} variant="filled" label="Size X" helperText="Minimo 10 - Maximo 30" />
			<FloatingLabel id="y" type="number" min={10} max={30} variant="filled" label="Size Y" helperText="Minimo 10 - Maximo 30" />

			<Button>Guardar</Button>
		</div>
	);
}
