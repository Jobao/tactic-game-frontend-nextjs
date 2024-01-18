export default function NewGame() {
	return (
		<div>
			<input type="number" min={10} max={30} id="x" />
			<input type="number" min={10} max={30} id="y" />
		</div>
	);
}
