class EscapeRoomRoom3Scene extends Phaser.Scene {
    constructor() {
        super("EscapeRoomRoom3Scene");
    }

    create() {

        // Background
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 70, "Escape Room – Stage 3: Functional Areas", {
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
        // Load Variations
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
        // CODE ENTRY BOX
        // ---------------------------------------------------------
        this.codeText = this.add.text(640, 540, "Enter Code:", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.codeEntry = this.add.text(640, 590, "_ _ _", {
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
            "Which department handles MONEY?\n\n" +
            "A) Marketing\nB) Finance\nC) Customer Service",
        {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "B";  
        this.codeText.setText("CODE = B");
    }

    loadEasyVariation2() {
        this.add.text(640, 210,
            "Which department MAKES the product?\n\n" +
            "A) Operations\nB) Marketing\nC) HR",
        {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A"; 
        this.codeText.setText("CODE = A");
    }

    loadEasyVariation3() {
        this.add.text(640, 210,
            "Match the task:\n\n" +
            "Creates adverts → _______",
        {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "MARKETING"; 
        this.codeText.setText("CODE = MARKETING");
    }


    // ============================================================
    // STANDARD MODE VARIATIONS
    // ============================================================
    loadStandardVariation1() {
        this.add.text(640, 210,
            "Which department sets PRICES?\n\n" +
            "A) HR\nB) Finance\nC) Operations",
        {
            fontFamily: "Arial",
            fontSize: "29px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");
    }

    loadStandardVariation2() {
        this.add.text(640, 210,
            "Which department talks to CUSTOMERS?\n\n" +
            "A) Customer Service\nB) Finance\nC) Logistics",
        {
            fontFamily: "Arial",
            fontSize: "29px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "A";
        this.codeText.setText("CODE = A");
    }

    loadStandardVariation3() {
        this.add.text(640, 210,
            "Which department is MISSING?\n\n" +
            "Sales → Marketing → ______ → Operations",
        {
            fontFamily: "Arial",
            fontSize: "29px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "FINANCE";
        this.codeText.setText("CODE = FINANCE");
    }


    // ============================================================
    // HARD MODE VARIATIONS
    // ============================================================
    loadHardVariation1() {
        this.add.text(640, 200,
            "Choose the 3 departments involved BEFORE selling a new product:\n\n" +
            "A) HR, Finance, Legal\n" +
            "B) Marketing, Finance, Operations\n" +
            "C) Logistics, Finance, Customer Service",
        {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        // Correct set: M F O (Marketing, Finance, Operations)
        this.expectedCode = "MFO";
        this.codeText.setText("CODE = MFO");
    }

    loadHardVariation2() {
        this.add.text(640, 200,
            "Which area decides HOW the product is MADE?\n\n" +
            "A) Marketing\nB) Operations\nC) HR",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");
    }

    loadHardVariation3() {
        this.add.text(640, 200,
            "Which TWO departments work together on CUSTOMER FEEDBACK?\n\n" +
            "A) Customer Service + Marketing\n" +
            "B) Finance + Operations\n" +
            "C) HR + IT",
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
    // CODE CHECKER
    // ============================================================
    checkCode(userCode) {

        if (userCode.toUpperCase() === this.expectedCode) {

            this.sound.play("success");

            // Progress to stage 4
            this.registry.set("escapeProgress", 4);

            this.add.text(640, 650, "Correct! Proceeding to Stage 4...", {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#00ff00"
            }).setOrigin(0.5);

            this.time.delayedCall(1500, () => {
                this.scene.start("EscapeRoomRoom4Scene");
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