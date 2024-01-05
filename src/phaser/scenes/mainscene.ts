import { Scene } from "phaser";
import { Game as GameData } from "@/lib/interfaces";

export default class MainScene extends Scene {
  constructor() {
    super();
  }

  preload() {}
  init(gameData: GameData) {}
  create() {}

  update(time: number, delta: number): void {}
}
