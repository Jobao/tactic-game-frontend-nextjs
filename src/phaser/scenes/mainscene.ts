import { Scene } from "phaser";
import { Game as GameData, GameUnit } from "@/lib/interfaces";
import CustomTile from "../classes/tile";
import Player from "../classes/player";

export default class MainScene extends Scene {
	constructor() {
		super();
		this.selectedUnit = undefined;
	}
	data_game: GameData | undefined = undefined;
	dictionary: Map<string, CustomTile> = new Map();
	dictionary_player: Map<string, Player> = new Map();
	selectedUnit: GameUnit | undefined;

	handleSelectedUnit(unit: GameUnit) {
		if (this.selectedUnit) {
			if (this.selectedUnit.unitBase_uuid !== unit.unitBase_uuid) {
				this.dictionary.get(this.selectedUnit.posX.toString() + "-" + this.selectedUnit.posY.toString())?.clearTint();
				this.selectedUnit = unit;
				this.dictionary
					.get(this.selectedUnit.posX.toString() + "-" + this.selectedUnit.posY.toString())
					?.setTint(0x86bfda);
			}
		} else {
			this.selectedUnit = unit;
			this.dictionary
				.get(this.selectedUnit.posX.toString() + "-" + this.selectedUnit.posY.toString())
				?.setTint(0x86bfda);
		}
	}

	handleClickTile(tile: CustomTile) {
		if (this.selectedUnit) {
			this.dictionary.get(this.selectedUnit.posX.toString() + "-" + this.selectedUnit.posY.toString())?.clearTint();
		}
	}

	init(gameData: GameData) {
		this.data_game = gameData;
		this.selectedUnit = undefined;
	}
	preload() {
		this.load.image("pasto", "/tiles/pasto.png");
		this.load.image("piso", "/tiles/piso.png");
		this.load.spritesheet("player", "/sprites/Male 01-1.png", {
			frameHeight: 32,
			frameWidth: 32,
		});
	}

	create() {
		if (this.data_game) {
			for (let x = 0; x < this.data_game.sizeX; x++) {
				for (let y = 0; y < this.data_game.sizeY; y++) {
					this.dictionary.set(
						x.toString() + "-" + y.toString(),
						new CustomTile(this, x * 32, y * 32, 32, 32, "piso", 0, this.handleClickTile.bind(this))
						//El porque el bind https://stackoverflow.com/a/2025814
					);
				}
			}
			for (let index = 0; index < this.data_game.placedUnitList.length; index++) {
				const element = this.data_game.placedUnitList[index];
				for (let unit = 0; unit < element.gameUnit.length; unit++) {
					const aux = element.gameUnit[unit];
					new Player(this, aux.posX * 32, aux.posY * 32, "player", 0, aux, this.handleSelectedUnit.bind(this));
				}
			}
		}
	}

	update(time: number, delta: number): void {}
}
