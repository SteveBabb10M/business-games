class FunctionalMapScene extends Phaser.Scene {
    constructor() {
        super("FunctionalMapScene");
    }

    create(data) {

        // ===== Difficulty settings =====
        this.difficulty = data.difficulty || "easy";

        // Descriptions for HARD mode
        this.descriptions = {
            hr: "Recruits staff, handles training & wellbeing.",
            marketing: "Promotes products & runs advertising.",
            sales: "Sells products to customers.",
            operations: "Produces goods/services.",
            logistics: "Transports & delivers goods.",
            finance: "Manages money coming in & out."
        };

        // Hint letters for MEDIUM mode
        this.hintLetters = {
            hr: "H",
            marketing: "M",
            sales: "S",
            operations: "O",
            logistics: "L",
            finance: "F"
        };

        // ===== Background =====
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // ===== Title =====
        this.add.text(640, 40, "Functional Areas of a Business", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // ===== Instructions =====
        this.add.text(640, 90, this.getInstructionText(), {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4
        }).setOrigin(0.5);

        // ===== Back button =====
        const backBtn = this.add.image(100, 40, "button_small_orange")
            .setInteractive({ cursor: "pointer" })
            .setScale(1.0);

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
            this.scene.start("FunctionalDifficultyScene");
        });

        // ===== Score =====
        this.totalIcons = 6;
        this.placedCorrect = 0;
        this.mistakes = 0;

        this.scoreText = this.add.text(1180, 40, "Score: 0 / 6", {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(1, 0.5);

        // ===== Randomised panel positions =====
        let panelPositions = [
            { x: 260, y: 260 },
            { x: 640, y: 260 },
            { x: 1020, y: 260 },
            { x: 260, y: 460 },
            { x: 640, y: 460 },
            { x: 1020, y: 460 }
        ];

        panelPositions = this.shuffleArray(panelPositions);

        // ===== Functional areas =====
        const areaDefs = [
            { id: "hr",         name: "Human Resources", iconKey: "icon_hr" },
            { id: "marketing",  name: "Marketing",        iconKey: "icon_marketing" },
            { id: "sales",      name: "Sales",            iconKey: "icon_sales" },
            { id: "operations", name: "Operations",       iconKey: "icon_operations" },
            { id: "logistics",  name: "Logistics",        iconKey: "icon_logistics" },
            { id: "finance",    name: "Finance",          iconKey: "icon_finance" }
        ];

        this.slots = {};
        this.icons = [];

        // ===== Create panels in random order =====
        areaDefs.forEach(def => {
            const pos = panelPositions.shift();
            const x = pos.x;
            const y = pos.y;

            const panel = this.add.image(x, y, "panel_medium")
                .setInteractive({ dropZone: true })
                .setDisplaySize(300, 180)
                .setData("areaId", def.id);

            // EASY → show full labels
            // HARD → show descriptions
            // MEDIUM → hide label, show big faint hint
            let labelText = def.name;
            if (this.difficulty === "hard") {
                labelText = this.descriptions[def.id];
            }

            const label = this.add.text(x, y + 45, labelText, {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
                wordWrap: { width: 260 }
            }).setOrigin(0.5);

            // MEDIUM mode hint letter
            if (this.difficulty === "medium") {
                label.setVisible(false);

                const hint = this.add.text(x, y, this.hintLetters[def.id], {
                    fontFamily: "Arial",
                    fontSize: "90px",
                    color: "#ffffff66",
                    stroke: "#000000",
                    strokeThickness: 2
                }).setOrigin(0.5);

                panel.setData("hint", hint);
            }

            this.slots[def.id] = {
                x,
                y,
                panel,
                label,
                occupied: false
            };
        });

        // ===== Create draggable icons =====
        const shuffledIcons = this.shuffleArray([...areaDefs]);
        const startY = 630;
        const startXs = [200, 400, 600, 800, 1000, 1200];

        shuffledIcons.forEach((def, index) => {
            const icon = this.add.image(startXs[index], startY, def.iconKey)
                .setScale(0.6)
                .setInteractive({ cursor: "grab" });

            icon.setData("targetAreaId", def.id);
            icon.setData("startX", icon.x);
            icon.setData("startY", icon.y);
            icon.setData("placed", false);

            this.icons.push(icon);
        });

        // ===== Dragging =====
        this.input.setDraggable(this.icons);

        this.input.on("dragstart", (pointer, icon) => {
            if (icon.getData("placed")) return;
            icon.setScale(0.65);
            this.children.bringToTop(icon);
        });

        this.input.on("drag", (pointer, icon, dragX, dragY) => {
            if (icon.getData("placed")) return;
            icon.x = dragX;
            icon.y = dragY;
        });

        this.input.on("dragend", (pointer, icon) => {
            if (icon.getData("placed")) return;

            const targetId = icon.getData("targetAreaId");
            const slot = this.slots[targetId];

            const distance = Phaser.Math.Distance.Between(icon.x, icon.y, slot.x, slot.y);
            const snapRadius = 110;

            if (distance <= snapRadius && !slot.occupied) {
                // Correct placement
                icon.x = slot.x;
                icon.y = slot.y - 35;
                icon.setScale(0.55);
                icon.setData("placed", true);
                slot.occupied = true;

                if (this.difficulty !== "easy") {
                    slot.label.setVisible(true);

                    if (this.difficulty === "medium" && slot.panel.getData("hint")) {
                        slot.panel.getData("hint").setVisible(false);
                    }
                }

                this.placedCorrect++;
                this.updateScore();
                this.sound.play("success");

                this.tweens.add({
                    targets: slot.panel,
                    alpha: 0.5,
                    duration: 120,
                    yoyo: true
                });

                if (this.placedCorrect === this.totalIcons) {
                    this.onAllPlaced();
                }
            } else {
                // Incorrect
                this.mistakes++;
                this.sound.play("error");

                this.tweens.add({
                    targets: icon,
                    x: icon.getData("startX"),
                    y: icon.getData("startY"),
                    duration: 250,
                    ease: "Sine.easeInOut",
                    onComplete: () => icon.setScale(0.6)
                });
            }
        });
    }

    getInstructionText() {
        if (this.difficulty === "easy")   return "Match each icon to the correct labelled department.";
        if (this.difficulty === "medium") return "Use the faint hint letters to match icons.";
        if (this.difficulty === "hard")   return "Match icons to descriptions of each functional area.";
    }

    updateScore() {
        this.scoreText.setText(`Score: ${this.placedCorrect} / ${this.totalIcons}`);
    }

    // ===== Result Popup =====
    onAllPlaced() {
        let badgeKey = "badge_bronze";
        let message = "Good effort!";

        if (this.mistakes <= 1) {
            badgeKey = "badge_gold";
            message = "Excellent! Gold badge!";
        } else if (this.mistakes <= 4) {
            badgeKey = "badge_silver";
            message = "Well done! Silver badge!";
        }

        const overlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.65);
        overlay.setDepth(200);

        const panel = this.add.image(640, 360, "panel_small")
            .setDisplaySize(400, 330)
            .setDepth(201);

        const badge = this.add.image(640, 260, badgeKey)
            .setScale(0.5)
            .setDepth(202);

        this.add.text(640, 315, message, {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(202);

        this.add.text(640, 350, `Mistakes made: ${this.mistakes}`, {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(202);

        const retryBtn = this.add.image(580, 410, "button_small_green")
            .setScale(0.9)
            .setInteractive({ cursor: "pointer" })
            .setDepth(203);

        const menuBtn = this.add.image(700, 410, "button_small_orange")
            .setScale(0.9)
            .setInteractive({ cursor: "pointer" })
            .setDepth(203);

        this.add.text(580, 410, "Retry", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(204);

        this.add.text(700, 410, "Menu", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(204);

        retryBtn.on("pointerup", () => {
            this.sound.play("click");
            this.scene.restart();
        });

        menuBtn.on("pointerup", () => {
            this.sound.play("click");
            this.scene.start("MenuScene");
        });
    }

    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}