import { GameObjects, Scene } from "phaser";
import { Game as GameData, GameUnit } from "@/lib/interfaces";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import Button from "phaser3-rex-plugins/plugins/button";

export default class ScenePrueba extends Scene {
	constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);
	}
	rexUI!: UIPlugin;
	init(gameData: GameData) {
		console.log("init");
	}
	CreateMenu = function (scene: ScenePrueba, items: any, onClick: Function) {
		const COLOR_PRIMARY = 0x4e342e;
		const COLOR_LIGHT = 0x7b5e57;
		const COLOR_DARK = 0x260e04;

		var exapndOrientation = "y";
		var easeOrientation = "y";

		var menu = scene.rexUI.add.menu({
			//orientation:{},
			subMenuSide: "right",

			//popup: false,
			items: items,
			createBackgroundCallback: function (items) {
				return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY);
			},
			createButtonCallback: function (item, i, items) {
				return scene.rexUI.add.label({
					background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),
					text: scene.add.text(0, 0, item.name, {
						fontSize: "20px",
					}),
					icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
					space: {
						left: 10,
						right: 10,
						top: 10,
						bottom: 10,
						icon: 10,
					},
				});
			},
		});
		/*
		menu
			.on("button.over", function (button: any) {
				button.getElement("background").setStrokeStyle(1, 0xffffff);
			})
			.on("button.out", function (button: any) {
				button.getElement("background").setStrokeStyle();
			})
			.on("button.click", function (button: any) {
				onClick(button);
			})
			.on("popup.complete", function (subMenu: any) {
				console.log("popup.complete");
			})
			.on("scaledown.complete", function () {
				console.log("scaledown.complete");
			});
*/
		return menu;
	};

	create() {
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

		var scene = this;

		var print;
		print = this.add.text(0, 0, "Hola");
		var menu = this.CreateMenu(this, items, (x: any) => {
			console.log(x);
		});
	}
}
