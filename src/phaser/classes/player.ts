import { GameUnit } from "@/lib/interfaces";
import { Scene } from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
	constructor(
		scene: Scene,
		x: number,
		y: number,
		key: string,
		frame: string | number | undefined,
		_unit_data: GameUnit,
		handleSelect: Function
	) {
		super(scene, x, y, key, frame);
		this.unit_data = _unit_data;
		this.setOrigin(0, 0);
		scene.add.existing(this);
		this.depth = 1;
		this.setInteractive();
		this.on("pointerdown", () => {
			handleSelect(this.unit_data);
		});
	}

	unit_data: GameUnit;
}
