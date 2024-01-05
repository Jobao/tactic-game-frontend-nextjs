import { Scene, Tilemaps } from "phaser";

export default class CustomTile extends Phaser.GameObjects.TileSprite {
	constructor(
		scene: Scene,
		x: number,
		y: number,
		w: number,
		h: number,
		key: string,
		frame: string | number | undefined,
		handleClick: Function
	) {
		super(scene, x, y, w, h, key, frame);
		this.setInteractive();
		this.on("pointerdown", () => {
			handleClick(this);
		});
		scene.add.existing(this).setOrigin(0, 0);
	}
}
