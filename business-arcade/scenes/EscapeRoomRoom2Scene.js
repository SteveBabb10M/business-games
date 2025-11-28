class EscapeRoomRoom2Scene extends Phaser.Scene {
    constructor() {
        super("EscapeRoomRoom2Scene");
    }

    create() {

        // Background
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 70, "Escape Room – Stage 2: Types of Business", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5);


        // ---------------------------------------------------------
        // Difficulty + Random Variation
        // ---------------------------------------------------------
        const difficulty = this.registry.get("escapeDifficulty");
        const variation = Phaser.Math.Between(1, 3);

        this.expectedCode = null;


        // ---------------------------------------------------------
        // Load Puzzle
        // ---------------------------------------------------------
        if (difficulty === "Easy") {
            if (variation === 1) this.loadEasyVariation1();
            if (variation === 2) this.loadEasyVariation2();
            if (variation === 3) this.loadEasyVariation3();
        }

        if (difficulty === "Standard") {
            if (variation === 1) this.loadStandardVariation1();
            if (variation === 2) this.loadStandardVariation2();
            if (variation === 3) this.loadStandardVariation3();
        }

        if (difficulty === "Hard") {
            if (variation === 1) this.loadHardVariation1();
            if (variation === 2) this.loadHardVariation2();
            if (variation === 3) this.loadHardVariation3();
        }


        // ---------------------------------------------------------
        // CODE ENTRY
        // ---------------------------------------------------------
        this.codeText = this.add.text(640, 530, "Enter Code:", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.codeEntry = this.add.text(640, 580, "_ _ _ _ _", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#00ff00"
        }).setOrigin(0.5);


        this.input.keyboard.on("keydown", (event) => {
            if (!this.expectedCode) return;

            let current = this.codeEntry.text.replace(/\s+/g, "");
            if (current.includes("_")) current = "";

            if (event.key.length === 1) {
                current += event.key.toUpperCase();
                this.codeEntry.setText(current);

                if (current.length === this.expectedCode.length) {
                    this.checkCode(current);
                }
            }
        });

        this.addBackButton();
    }


    // ============================================================
    // EASY MODE VARIATIONS
    // ============================================================
    loadEasyVariation1() {
        this.add.text(640, 210,
            "Sort into PRIVATE, PUBLIC, NOT-FOR-PROFIT:\n\n" +
            "• Tesco\n• Fire Service\n• Shelter Charity",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        // Code for correct sector order
        this.expectedCode = "PPN";   // Private – Public – NFP
        this.codeText.setText("CODE = PPN");
    }

    loadEasyVariation2() {
        this.add.text(640, 210,
            "Which one is PUBLIC sector?\n\nA) Tesco\nB) Fire Service\nC) McDonald's",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");
    }

    loadEasyVariation3() {
        this.add.text(640, 210,
            "Which one is NOT-FOR-PROFIT?\n\nA) Tesco\nB) Shelter\nC) Fire Service",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "B"; // Shelter
        this.codeText.setText("CODE = B");
    }


    // ============================================================
    // STANDARD MODE VARIATIONS
    // ============================================================
    loadStandardVariation1() {
        this.add.text(640, 210,
            "Why does the PUBLIC sector Fire Service exist?\n\n" +
            "A) To make profit\nB) To provide a service\nC) To compete with private firms",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");
    }

    loadStandardVariation2() {
        this.add.text(640, 210,
            "Match organisation to purpose:\n\n" +
            "Tesco → Profit\nFire Service → ______\nShelter Charity → Cause Support",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        // correct answers: SERVICE
        this.expectedCode = "SERVICE";
        this.codeText.setText("CODE = SERVICE");
    }

    loadStandardVariation3() {
        this.add.text(640, 210,
            "Which is PRIVATE sector?\n\nA) Fire Service\nB) Tesco\nC) Shelter Charity",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");
    }


    // ============================================================
    // HARD MODE VARIATIONS
    // ============================================================
    loadHardVariation1() {
        this.add.text(640, 200,
            "Decide the sector from clues:\n\n" +
            "• Funded by government\n" +
            "• Provides emergency response\n" +
            "• Not for profit\n\n" +
            "A) Private\nB) Public\nC) Charity",
            {
                fontFamily: "Arial",
                fontSize: "26px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "B"; // Fire Service = Public
        this.codeText.setText("CODE = B");
    }

    loadHardVariation2() {
        this.add.text(640, 200,
            "Which organisation does NOT set profit aims?\n\n" +
            "A) Tesco\nB) Fire Service\nC) Shelter Charity",
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        // Both B & C don't set profit aims, choose main one
        this.expectedCode = "BC";
        this.codeText.setText("CODE = BC");
    }

    loadHardVariation3() {
        this.add.text(640, 200,
            "Put these in the correct SECTOR ORDER:\n\n" +
            "1) Shelter\n2) Tesco\n3) Fire Service\n\n" +
            "A) Public → Private → NFP\n" +
            "B) Private → Public → NFP\n" +
            "C) NFP → Private → Public",
            {
                fontFamily: "Arial",
                fontSize: "26px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        this.expectedCode = "C"; // Shelter=NFP, Tesco=Private, Fire Service=Public
        this.codeText.setText("CODE = C");
    }


    // ============================================================
    // CODE CHECKER
    // ============================================================
    checkCode(userCode) {

        if (userCode.toUpperCase() === this.expectedCode) {

            this.sound.play("success");

            // Progress to stage 3
            this.registry.set("escapeProgress", 3);

            this.add.text(640, 650, "Correct! Proceeding to Stage 3...", {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#00ff00"
            }).setOrigin(0.5);

            this.time.delayedCall(1500, () => {
                this.scene.start("EscapeRoomRoom3Scene");
            });

        } else {

            this.sound.play("error");

            this.add.text(640, 650, "Incorrect Code!", {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#ff0000"
            }).setOrigin(0.5);
        }
    }


    // ============================================================
    // BACK BUTTON
    // ============================================================
    addBackButton() {

        const backBtn = this.add.image(100, 650, "button_large_blue")
            .setScale(0.6)
            .setInteractive({ cursor: "pointer" });

        this.add.text(100, 650, "Back", {
            fontFamily: "Arial",
            fontSize: "24px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5);

        backBtn.on("pointerover", () => backBtn.setScale(0.65));
        backBtn.on("pointerout", () => backBtn.setScale(0.6));

        backBtn.on("pointerup", () => {
            this.sound.play("click");
            this.scene.start("EscapeRoomMenuScene");
        });
    }

}