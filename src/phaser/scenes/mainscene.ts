import { GameObjects, Scene } from "phaser";
import { Game as GameData, GameUnit } from "@/lib/interfaces";
import CustomTile from "../classes/tile";
import Player from "../classes/player";
import { Menu } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import Rectangle from "phaser3-rex-plugins/plugins/utils/geom/rectangle/Rectangle";
import { Vector2 } from "phaser3-rex-plugins/plugins/utils/geom/types";

export default class MainScene extends Scene {
	constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
		super(config);
		this.selectedUnit = undefined;
	}
	data_game: GameData | undefined = undefined;
	dictionary: Map<string, CustomTile> = new Map();
	dictionary_player: Map<string, Player> = new Map();
	selectedUnit: Player | undefined;
	menu: Menu | undefined;
	rexUI!: UIPlugin;
	terrainLayer!: Phaser.Tilemaps.TilemapLayer | null;
	playerLayer!: Phaser.Tilemaps.TilemapLayer | null;
	map!: Phaser.Tilemaps.Tilemap;

	//controls;

	handleClickTile(tile: CustomTile) {
		if (this.selectedUnit) {
			this.dictionary
				.get(this.selectedUnit.unit_data.posX.toString() + "-" + this.selectedUnit.unit_data.posY.toString())
				?.clearTint();
			this.selectedUnit = undefined;
			this.menu = undefined;
		}
	}

	init(gameData: GameData) {
		this.data_game = gameData;
		this.selectedUnit = undefined;
	}
	preload() {
		this.load.image("pasto", "/tiles/pasto.png");
		this.load.image("piso", "/tiles/piso.png");
		this.load.spritesheet("playerTileset", "/sprites/Male 01-1.png", {
			frameHeight: 32,
			frameWidth: 32,
		});
		this.load.image("tiles", "/tilemaps/orthogonal/tmw_desert_spacing.png");

		/*this.load.spritesheet("tiles", "/tilemaps/orthogonal/tmw_desert_spacing.png", {
			frameHeight: 32,
			frameWidth: 32,
			spacing: 1,
			margin: 1,
		});*/
	}

	createMenu(scene: MainScene, items: any, onClick: Function) {
		const COLOR_PRIMARY = 0x4e342e;
		const COLOR_LIGHT = 0x7b5e57;
		const COLOR_DARK = 0x260e04;

		var exapndOrientation = "y";
		var easeOrientation = "y";
		var menu2 = new Menu(scene, {
			x: 10,
			y: 10,
			//orientation:{},
			subMenuSide: "right",

			//popup: false,
			items: items,
			createBackgroundCallback: (items) => {
				return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY);
			},
			createButtonCallback: (item, i, items) => {
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
		}); /*
		var menu = scene.rexUI.add.menu({
			x: 10,
			y: 10,
			//orientation:{},
			subMenuSide: "right",

			//popup: false,
			items: items,
			createBackgroundCallback: (items) => {
				return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY);
			},
			createButtonCallback: (item, i, items) => {
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

		return menu2;
	}

	create() {
		this.cameras.main.setBounds(0, 0, 800, 600);
		var graphics = this.add.graphics({
			lineStyle: {
				width: 2,
				color: 0xffffff,
				alpha: 1,
			},
		});
		graphics.setDepth(2);
		var map = this.make.tilemap({ tileHeight: 32, tileWidth: 32, height: 10, width: 10 });
		const tiles = map.addTilesetImage("Desert", "tiles", 32, 32, 1, 1);
		const playerTiles = map.addTilesetImage("playerTileset", "playerTileset", 32, 32);

		if (tiles) {
			this.terrainLayer = map.createBlankLayer("terreno", tiles, 0, 0);
			this.terrainLayer?.setDepth(1);
			this.terrainLayer?.setInteractive();
			this.terrainLayer?.setOrigin(0, 0);
			this.terrainLayer?.fill(29);
			this.terrainLayer?.forEachTile((tile: any) => {
				var bounds = tile.getBounds(this.cameras.main);
				graphics.strokeRect((bounds as Rectangle).x, (bounds as Rectangle).y, 32, 32);
			}, this.scene);

			this.terrainLayer?.on(
				"pointerdown",
				(pointer: Phaser.Input.Pointer, currently: any) => {
					/*const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Vector2;
					var c = this.terrainLayer?.getTileAtWorldXY(worldPoint.x, worldPoint.y);*/
					if (this.selectedUnit) {
						this.terrainLayer
							?.getTileAt(this.selectedUnit.unit_data.posX, this.selectedUnit.unit_data.posY)
							.setAlpha(1);
						this.selectedUnit = undefined;
					}
				},
				this
			);
		}

		if (true) {
			if (this.data_game) {
				for (let index = 0; index < this.data_game.placedUnitList.length; index++) {
					const element = this.data_game.placedUnitList[index];
					for (let unit = 0; unit < element.gameUnit.length; unit++) {
						const aux = element.gameUnit[unit];
						var p = new Player(this, aux.posX * 32, aux.posY * 32, "playerTileset", 0, aux);
						this.input.enableDebug(p);
					}
				}
			}
		}
	}

	update(time: number, delta: number): void {
		const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
		//this.layer?.worldToTileX()
	}
}
