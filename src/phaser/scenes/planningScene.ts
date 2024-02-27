import { Scene } from "phaser";
import Rectangle from "phaser3-rex-plugins/plugins/utils/geom/rectangle/Rectangle";
import { Game as GameData, GameUnit } from "@/lib/interfaces";

export default class PlanningScene extends Scene {
	constructor() {
		super();
	}
	terrainLayer!: Phaser.Tilemaps.TilemapLayer | null;

	preload() {
		this.load.spritesheet("playerTileset", "/sprites/Male 01-1.png", {
			frameHeight: 32,
			frameWidth: 32,
		});
		this.load.image("tiles", "/tilemaps/orthogonal/tmw_desert_spacing.png");
	}

	init(gameData: GameData) {}

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
		}
	}
}
