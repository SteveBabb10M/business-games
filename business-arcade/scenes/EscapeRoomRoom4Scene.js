class EscapeRoomRoom4Scene extends Phaser.Scene {
    constructor() {
        super("EscapeRoomRoom4Scene");
    }

    create() {

        // Background
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 70, "Escape Room – Stage 4: Links Between Areas", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5);


        // ---------------------------------------------------------
        // Difficulty + Variation
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
        // CODE ENTRY UI
        // ---------------------------------------------------------
        this.codeText = this.add.text(640, 540, "Enter Code:", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.codeEntry = this.add.text(640, 590, "_ _ _ _", {
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
            "Which TWO departments must share information when selling a product?\n\n" +
            "A) Marketing + Sales\n" +
            "B) HR + Operations\n" +
            "C) IT + Legal",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }

    loadEasyVariation2() {
        this.add.text(640, 210,
            "Who reports CUSTOMER FEEDBACK back to Marketing?\n\n" +
            "A) Finance\nB) Customer Service\nC) HR",
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
            "Which department needs STOCK INFO from Operations?\n\n" +
            "A) Logistics\nB) Legal\nC) IT Support",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }


    // ============================================================
    // STANDARD MODE VARIATIONS
    // ============================================================
    loadStandardVariation1() {
        this.add.text(640, 200,
            "An email chain breaks:\n\n" +
            "Sales → Marketing → Operations → Finance → Sales\n\n" +
            "Who failed to pass on information?",
            {
                fontFamily: "Arial",
                fontSize: "26px",
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5);

        // The broken part varies each play (keeps replayability)
        const options = ["Marketing", "Operations", "Finance"];
        const chosen = Phaser.Utils.Array.GetRandom(options);

        this.expectedCode = chosen.toUpperCase();
        this.codeText.setText("CODE = " + this.expectedCode);
    }

    loadStandardVariation2() {
        this.add.text(640, 200,
            "Which TWO areas link when handling PAYMENTS?\n\n" +
            "A) Finance + Sales\n" +
            "B) HR + Marketing\n" +
            "C) Operations + IT Support",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }

    loadStandardVariation3() {
        this.add.text(640, 200,
            "Which THREE must work together to complete a big ORDER?\n\n" +
            "A) Sales + Operations + Logistics\n" +
            "B) Marketing + HR + Legal\n" +
            "C) IT + Finance + Legal",
        {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }


    // ============================================================
    // HARD MODE VARIATIONS
    // ============================================================
    loadHardVariation1() {
        this.add.text(640, 200,
            "Match department to external link:\n\n" +
            "Finance → _____\n" +
            "Logistics → Suppliers\n" +
            "HR → Government (employment law)\n\n" +
            "A) Banks\nB) Customers\nC) Police",
        {
            fontFamily: "Arial",
            fontSize: "25px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A"; // Finance → banks
        this.codeText.setText("CODE = A");
    }

    loadHardVariation2() {
        this.add.text(640, 200,
            "Which chain shows CORRECT information flow?\n\n" +
            "A) Customer Service → Sales → Marketing\n" +
            "B) Finance → Sales → Customer Service\n" +
            "C) HR → Operations → Logistics",
        {
            fontFamily: "Arial",
            fontSize: "25px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }

    loadHardVariation3() {
        this.add.text(640, 200,
            "Which FOUR areas work together to deliver a final product?\n\n" +
            "A) Sales + Purchasing + Operations + Logistics\n" +
            "B) HR + Legal + IT + Finance\n" +
            "C) Marketing + Finance + Legal + HR",
        {
            fontFamily: "Arial",
            fontSize: "25px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }


    // ============================================================
    // CODE CHECKER
    // ============================================================
    checkCode(userCode) {

        if (userCode.toUpperCase() === this.expectedCode) {

            this.sound.play("success");

            // Mark Escape Room as complete
            this.registry.set("escapeProgress", 4);

            this.add.text(640, 650, "Escape Room Complete!", {
                fontFamily: "Arial",
                fontSize: "30px",
                color: "#00ff00"
            }).setOrigin(0.5);

            this.time.delayedCall(1500, () => {
                this.scene.start("EscapeRoomMenuScene");
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