import { Game } from "phaser";
import { useState, useRef, useEffect } from "react";
import { Game as GameData } from "@/lib/interfaces";
import MainScene from "@/phaser/scenes/mainscene";

export default function PhaserGame(props: { gameData: GameData }) {
  const [game, setGame] = useState<Game | null>(null);
  const parentEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      if (game) {
        return;
      }
      if (!parentEl.current) {
        return;
      }

      const newGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: parentEl.current,
        title: "game",
        width: 800,
        height: 600,
        scene: [],
      });
      newGame.scene.add("main", MainScene, false);
      setGame(newGame);
    }
    initPhaser();
  }, []);

  useEffect(() => {
    if (game) {
      game.scene.start("main", props.gameData);
    }
  }, [game]);

  return <div ref={parentEl} className="gameContainer w-screen h-1/2 block" />;
}
