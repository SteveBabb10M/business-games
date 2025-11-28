class FunctionalDifficultyScene extends Phaser.Scene {
    constructor() {
        super("FunctionalDifficultyScene");
    }

    create() {
        // Background
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 120, "Select Difficulty", {
            fontFamily: "Arial",
            fontSize: "50px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        const options = [
            { label: "EASY",   color: "button_large_green",  difficulty: "easy"   },
            { label: "MEDIUM", color: "button_large_orange", difficulty: "medium" },
            { label: "HARD",   color: "button_large_blue",   difficulty: "hard"   }
        ];

        let y = 260;

        options.forEach(opt => {
            const btn = this.add.image(640, y, opt.color)
                .setInteractive({ cursor: "pointer" })
                .setScale(1.0);

            this.add.text(640, y, opt.label, {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }).setOrigin(0.5);

            btn.on("pointerover", () => btn.setScale(1.05));
            btn.on("pointerout", () => btn.setScale(1.0));

            btn.on("pointerup", () => {
                this.sound.play("click");
                this.scene.start("FunctionalMapScene", { difficulty: opt.difficulty });
            });

            y += 130;
        });

        // Back Button
        const backBtn = this.add.image(100, 40, "button_small_orange")
            .setScale(1.0)
            .setInteractive({ cursor: "pointer" });

        this.add.text(100, 40, "Back", {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5);

        backBtn.on("pointerover", () => backBtn.setScale(1.05));
        backBtn.on("pointerout", () => backBtn.setScale(1.0));
        backBtn.on("pointerup", () => {
            this.sound.play("click");
            this.scene.start("MenuScene");
        });
    }
}