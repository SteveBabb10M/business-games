class EscapeRoomMenuScene extends Phaser.Scene {
    constructor() {
        super("EscapeRoomMenuScene");
    }


    create() {

        // Background
        this.add.image(640, 360, "background_main")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 120, "Escape Room Challenge", {
            fontFamily: "Arial",
            fontSize: "52px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // Current difficulty stored in global registry
        if (!this.registry.has("escapeDifficulty")) {
            this.registry.set("escapeDifficulty", "Standard");
        }

        if (!this.registry.has("escapeProgress")) {
            this.registry.set("escapeProgress", 0);  // room index: 0=no progress, 1=room1, 2=room2...
        }


        // -----------------------------
        // BUTTON LIST
        // -----------------------------
        const menuButtons = [
            { label: "Start Escape Room",      texture: "button_large_blue",   action: () => this.startGame() },
            { label: "Continue",               texture: "button_large_green",  action: () => this.continueGame() },
            { label: "Select Stage",           texture: "button_large_blue",   action: () => this.openStageSelect() },
            { label: "Difficulty: " + this.registry.get("escapeDifficulty"), texture: "button_large_orange", action: () => this.changeDifficulty() },
            { label: "Back to Main Menu",      texture: "button_large_blue",   action: () => this.scene.start("MenuScene") }
        ];

        let y = 260;

        menuButtons.forEach(btn => {
            const button = this.add.image(640, y, btn.texture)
                .setScale(1.1)
                .setInteractive({ cursor: "pointer" });

            const label = this.add.text(640, y, btn.label, {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }).setOrigin(0.5);

            button.on("pointerover", () => button.setScale(1.15));
            button.on("pointerout", () => button.setScale(1.1));

            button.on("pointerup", () => {
                this.sound.play("click");
                btn.action();
            });

            y += 110;
        });
    }


    // -----------------------------
    // ACTIONS
    // -----------------------------


    startGame() {
        this.registry.set("escapeProgress", 1);
        this.scene.start("EscapeRoomRoom1Scene");
    }


    continueGame() {
        const room = this.registry.get("escapeProgress");

        switch(room) {
            case 1: this.scene.start("EscapeRoomRoom1Scene"); break;
            case 2: this.scene.start("EscapeRoomRoom2Scene"); break;
            case 3: this.scene.start("EscapeRoomRoom3Scene"); break;
            case 4: this.scene.start("EscapeRoomRoom4Scene"); break;
            default:
                this.scene.start("EscapeRoomRoom1Scene");
        }
    }


    changeDifficulty() {
        const current = this.registry.get("escapeDifficulty");
        let next = "Easy";

        if (current === "Easy") next = "Standard";
        else if (current === "Standard") next = "Hard";
        else if (current === "Hard") next = "Easy";

        this.registry.set("escapeDifficulty", next);
        this.scene.restart();  // refresh menu text
    }


    openStageSelect() {
        this.showStageSelect = true;

        // Darken background
        const bg = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7);

        const box = this.add.rectangle(640, 360, 600, 400, 0x222222, 0.95)
            .setStrokeStyle(4, 0xffffff);

        this.add.text(640, 210, "Select Stage", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5);

        const stages = [
            { label: "Stage 1: Aims & Objectives",   scene: "EscapeRoomRoom1Scene" },
            { label: "Stage 2: Types of Business",   scene: "EscapeRoomRoom2Scene" },
            { label: "Stage 3: Functional Areas",    scene: "EscapeRoomRoom3Scene" },
            { label: "Stage 4: Links Between Areas", scene: "EscapeRoomRoom4Scene" }
        ];

        let y = 300;

        stages.forEach(s => {
            const btn = this.add.image(640, y, "button_large_blue")
                .setScale(1.0)
                .setInteractive({ cursor: "pointer" });

            this.add.text(640, y, s.label, {
                fontFamily: "Arial",
                fontSize: "26px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4
            }).setOrigin(0.5);

            btn.on("pointerover", () => btn.setScale(1.05));
            btn.on("pointerout", () => btn.setScale(1.0));

            btn.on("pointerup", () => {
                this.sound.play("click");
                this.scene.start(s.scene);
            });

            y += 90;
        });
    }

}