class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        // Background stretched to full screen
        this.add.image(640, 360, "background_main")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 120, "Business Builder Arcade", {
            fontFamily: "Arial",
            fontSize: "56px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // Menu button options
       const buttons = [
   { label: "Build the Business", texture: "button_large_blue", scene: "BusinessBuilderScene" },
   { label: "Functional Areas Quiz", texture: "button_large_green", scene: "FunctionalDifficultyScene" },
    { label: "Escape Room",               texture: "button_large_orange",scene: "EscapeRoomMenuScene" },
    { label: "Mystery Evidence Board",    texture: "button_large_blue",  scene: null }
];


        let y = 280;

        buttons.forEach(btn => {
            // Button image
            const button = this.add.image(640, y, btn.texture)
                .setScale(1.1)
                .setInteractive({ cursor: "pointer" });

            // Label
            this.add.text(640, y, btn.label, {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }).setOrigin(0.5);

            // Hover effects
            button.on("pointerover", () => button.setScale(1.15));
            button.on("pointerout", () => button.setScale(1.1));

            // Click (disabled for now — no scenes yet)
            button.on("pointerup", () => {
                this.sound.play("click");

                if (btn.scene) {
                    this.scene.start(btn.scene);
                } else {
                    console.warn("Scene not created yet:", btn.label);
                }
            });

            y += 120;
        });
    }
}
