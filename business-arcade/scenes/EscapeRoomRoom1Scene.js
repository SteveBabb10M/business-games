class EscapeRoomRoom1Scene extends Phaser.Scene {
    constructor() {
        super("EscapeRoomRoom1Scene");
    }

    create() {

        // Background
        this.add.image(640, 360, "background_scene")
            .setDisplaySize(1280, 720);

        // Title
        this.add.text(640, 70, "Escape Room – Stage 1: Aims & Objectives", {
            fontFamily: "Arial",
            fontSize: "42px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5);


        // ----------------------------------------------------------
        // GET DIFFICULTY + CHOOSE VARIATION
        // ----------------------------------------------------------
        const difficulty = this.registry.get("escapeDifficulty");
        let variation = Phaser.Math.Between(1, 3);


        // ----------------------------------------------------------
        // FIX: CODE ENTRY UI MUST BE CREATED BEFORE LOADING VARIATIONS
        // ----------------------------------------------------------
        this.codeText = this.add.text(640, 540, "Enter Code:", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.codeEntry = this.add.text(640, 590, "_ _ _ _ _", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#00ff00"
        }).setOrigin(0.5);


        // ----------------------------------------------------------
        // NOW WE CAN SAFELY LOAD PUZZLE VARIATIONS
        // ----------------------------------------------------------
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


        // ----------------------------------------------------------
        // KEYBOARD INPUT FOR ENTERING CODES
        // ----------------------------------------------------------
        this.expectedCode = null;

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

        // Back to menu
        this.addBackButton();
    }


    // ============================================================
    // EASY VARIATIONS
    // ============================================================
    loadEasyVariation1() {
        this.add.text(640, 200,
            "Sort into AIM or OBJECTIVE:\n\n• Make a profit\n• Increase sales by 10%\n• Become famous\n• Sell 200 items this month",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "SMART";
        this.codeText.setText("CODE: SMART");
    }

    loadEasyVariation2() {
        this.add.text(640, 200,
            "Which one is a SMART OBJECTIVE?\n\nA) Grow sales\nB) Increase sales by £500 by July\nC) Get better",
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
        this.add.text(640, 200,
            "Which is an AIM?\n\nA) Earn £400 this week\nB) Become market leader\nC) Sell 20 cakes by Friday",
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
    // STANDARD VARIATIONS
    // ============================================================
    loadStandardVariation1() {
        this.add.text(640, 200,
            "Which objective is NOT SMART?\n\nA) Increase profit by 15% in 6 months\nB) Grow customers by ‘a lot’\nC) Sell 100 units by August",
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
        this.add.text(640, 200,
            "Select correct AIM:\n\nA) Increase revenue by £200 this week\nB) Become the most popular bakery\nC) Sell 10 extra items today",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "B";
        this.codeText.setText("CODE = B");   // <- FIXED because codeText now exists
    }

    loadStandardVariation3() {
        this.add.text(640, 200,
            "Put these in order:\nAim → Objective → Action\n\nA) Make profit\nB) Sell 100 units in May\nC) Promote product on TikTok",
        {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "ABC";
        this.codeText.setText("CODE = ABC");
    }


    // ============================================================
    // HARD VARIATIONS
    // ============================================================
    loadHardVariation1() {
        this.add.text(640, 200,
            "Mission: ‘Provide the best bakery service.’\n\nWhich 2 are AIMS?\nA) Increase revenue by £100/week\nB) Become most loved bakery\nC) Provide excellent service",
        {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        this.expectedCode = "BC";
        this.codeText.setText("CODE = BC");
    }

    loadHardVariation2() {
        this.add.text(640, 200,
            "Which SMART part is missing?\n‘Sell 200 cupcakes by ____.’\n\nA) Measurable\nB) Time-bound\nC) Achievable",
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
            "Which objective is UNREALISTIC?\n\nA) Grow sales by 5%\nB) Sell 2000 cakes today\nC) Increase profit next month",
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
    // CODE CHECKER
    // ============================================================
    checkCode(userCode) {

        if (userCode.toUpperCase() === this.expectedCode) {

            this.sound.play("success");

            // Move to Stage 2
            this.registry.set("escapeProgress", 2);

            this.add.text(640, 650, "Correct! Proceeding to Stage 2...", {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#00ff00"
            }).setOrigin(0.5);

            this.time.delayedCall(1500, () => {
                this.scene.start("EscapeRoomRoom2Scene");
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