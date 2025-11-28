// Phaser game config
const gameConfig = {
    type: Phaser.AUTO,
    parent: "game",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    backgroundColor: "#111",
    scene: [
        BootScene,
        MenuScene,
        FunctionalDifficultyScene,
        FunctionalMapScene,
        BusinessBuilderScene,

        // ----------------------------------------------------
        // 👇 ADD THESE FIVE LINES (Escape Room Scenes)
        // ----------------------------------------------------
        EscapeRoomMenuScene,
        EscapeRoomRoom1Scene,
        EscapeRoomRoom2Scene,
        EscapeRoomRoom3Scene,
        EscapeRoomRoom4Scene
        // ----------------------------------------------------
    ]
};

let BusinessArcade = new Phaser.Game(gameConfig);
