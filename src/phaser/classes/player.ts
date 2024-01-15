import { GameUnit } from "@/lib/interfaces";
import { Scene } from "phaser";
import MainScene from "../scenes/mainscene";
import { Menu } from "phaser3-rex-plugins/templates/ui/ui-components";
import { STORE, setGameState, setSelectedUnit, setUnitData } from "@/lib/redux/store";

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
		this.mainScene = scene;
		this.unit_data = _unit_data;
		this.setOrigin(0, 0);

		this.setDepth(2);
		this.setInteractive();

		//this.menu = this.createMenu(scene, this.items, () => {});
		//this.mainScene.rexUI.hide(this.menu);
		this.on(
			"pointerdown",
			() => {
				let cacheStore = STORE.getState().value;
				if (cacheStore.gameState === 'NONE' || cacheStore.gameState === 'IDLE') {
					var tile = scene.terrainLayer?.getTileAt(this.unit_data.posX, this.unit_data.posY);
	
					if (cacheStore.unitData.unitBase_uuid !== '') {
						if (cacheStore.unitData.unitBase_uuid !== this.unit_data.unitBase_uuid) {
							var oldTile = scene.terrainLayer?.getTileAt(
								cacheStore.unitData.posX,
								cacheStore.unitData.posY
							);
							//console.log(terrainLayer?.getTileAt(x, y));
							oldTile?.setAlpha(1);
						}
					} 
					scene.selectedUnit = this;
					tile?.setAlpha(0.5);
					STORE.dispatch(setGameState('IDLE'))
					STORE.dispatch(setSelectedUnit(true));
					STORE.dispatch(setUnitData(scene.selectedUnit.unit_data))
				}
			},
			this
		);

		scene.add.existing(this);
	}

	unit_data: GameUnit;
	menu!: Menu | undefined;
	mainScene: MainScene;
	z: any;
	items = [
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

	openMenu() {
		this.menu = this.createMenu(this.mainScene, this.items, () => {});
	}

	closeMenu() {
		if (this.menu) {
			this.menu = undefined;
		}
	}
	createMenu(scene: MainScene, items: any, onClick: Function) {
		const COLOR_PRIMARY = 0x4e342e;
		const COLOR_LIGHT = 0x7b5e57;
		const COLOR_DARK = 0x260e04;

		var exapndOrientation = "y";
		var easeOrientation = "y";
		var menu2 = new Menu(scene, {
			x: 3,
			y: 3,
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
		menu.setDepth(5);*/
		menu2.setDepth(4);
		//menu2.collapse();
		return menu2;
	}

	updateUnitData(){
		this.unit_data = STORE.getState().value.unitData
	}
}
