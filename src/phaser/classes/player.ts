import { GameUnit } from "@/lib/interfaces";
import { Scene } from "phaser";
import MainScene from "../scenes/mainscene";

export default class Player extends Phaser.GameObjects.Sprite {
	constructor(
		scene: MainScene,
		x: number,
		y: number,
		key: string,
		frame: string | number | undefined,
		_unit_data: GameUnit
	) {
		super(scene, x, y, key, frame);

		this.unit_data = _unit_data;
		this.setOrigin(0, 0);

		this.setDepth(2);
		this.setInteractive();
		this.on("pointerdown", () => {
			var tile = scene.terrainLayer?.getTileAt(this.unit_data.posX, this.unit_data.posY);

			//tile?.setAlpha(0.5);

			var items = [
				{
					name: "AA",
					children: [
						{
							name: "AA-0",
							children: [{ name: "AA-00" }, { name: "AA-01" }, { name: "AA-02" }],
						},
						{
							name: "AA-1",
							children: [{ name: "AA-10" }, { name: "AA-11" }, { name: "AA-12" }],
						},
						{
							name: "AA-2",
							children: [{ name: "AA-20" }, { name: "AA-21" }, { name: "AA-22" }],
						},
					],
				},
				{
					name: "BB",
					children: [{ name: "BB-0" }, { name: "BB-1" }, { name: "BB-2" }],
				},
				{
					name: "CC",
					children: [{ name: "CC-0" }, { name: "CC-1" }, { name: "CC-2" }],
				},
			];
			if (scene.selectedUnit) {
				if (scene.selectedUnit.unitBase_uuid !== this.unit_data.unitBase_uuid) {
					var oldTile = scene.terrainLayer?.getTileAt(scene.selectedUnit.posX, scene.selectedUnit.posY);
					//console.log(terrainLayer?.getTileAt(x, y));
					oldTile?.setAlpha(1);
					scene.selectedUnit = this.unit_data;
					tile?.setAlpha(0.5);
				}
			} else {
				scene.selectedUnit = this.unit_data;
				tile?.setAlpha(0.5);
			}
		});
		scene.add.existing(this);
	}

	unit_data: GameUnit;
}
