class BusinessBuilderScene extends Phaser.Scene {
    constructor() {
        super("BusinessBuilderScene");
    }

    create() {
        // ===== DATA SETUP =====
        // Business ideas
        this.businessIdeas = [
            {
                id: "cupcakes",
                key: "idea_cupcakes",
                name: "Cupcake Bakery",
                description: "A small local cupcake business selling to nearby customers.",
                bestTypes: ["soletrader"],
                okTypes: ["partnership"],
                bestSectors: ["tertiary"],
                okSectors: [],
                recommendedAreas: ["sales", "marketing", "operations", "finance"]
            },
            {
                id: "bikerepair",
                key: "idea_bikerepair",
                name: "Bike Repair Service",
                description: "Repairing bicycles for local commuters and cyclists.",
                bestTypes: ["soletrader", "partnership"],
                okTypes: [],
                bestSectors: ["tertiary"],
                okSectors: [],
                recommendedAreas: ["operations", "sales", "finance"]
            },
            {
                id: "onlineclothes",
                key: "idea_onlineclothes",
                name: "Online Clothing Shop",
                description: "Selling clothes through an online store.",
                bestTypes: ["ltd"],
                okTypes: ["partnership"],
                bestSectors: ["tertiary"],
                okSectors: ["secondary"],
                recommendedAreas: ["marketing", "sales", "logistics", "finance"]
            },
            {
                id: "dogwalking",
                key: "idea_dogwalking",
                name: "Dog Walking Service",
                description: "Walking and caring for pets in the local area.",
                bestTypes: ["soletrader"],
                okTypes: [],
                bestSectors: ["tertiary"],
                okSectors: [],
                recommendedAreas: ["operations", "marketing", "finance"]
            },
            {
                id: "cafe",
                key: "idea_cafe",
                name: "Local Café",
                description: "A small café serving drinks and snacks.",
                bestTypes: ["soletrader", "partnership"],
                okTypes: ["ltd"],
                bestSectors: ["tertiary"],
                okSectors: ["secondary"],
                recommendedAreas: ["operations", "sales", "marketing", "finance", "hr"]
            },
            {
                id: "landscaping",
                key: "idea_landscaping",
                name: "Landscaping & Gardening",
                description: "Designing and maintaining outdoor spaces for clients.",
                bestTypes: ["soletrader", "partnership"],
                okTypes: [],
                bestSectors: ["tertiary"],
                okSectors: ["primary"],
                recommendedAreas: ["operations", "sales", "finance", "logistics"]
            }
        ];

        // Ownership types
        this.ownershipTypes = [
            { id: "soletrader",   key: "type_soletrader",   name: "Sole Trader" },
            { id: "partnership",  key: "type_partnership",  name: "Partnership" },
            { id: "ltd",          key: "type_ltd",          name: "Private Limited Company" },
            { id: "franchise",    key: "type_franchise",    name: "Franchise" }
        ];

        // Sectors
        this.sectors = [
            { id: "primary",   key: "sector_primary",   name: "Primary (extracting raw materials)" },
            { id: "secondary", key: "sector_secondary", name: "Secondary (manufacturing)" },
            { id: "tertiary",  key: "sector_tertiary",  name: "Tertiary (services)" }
        ];

        // Functional areas
        this.functionalAreas = [
            { id: "hr",         key: "icon_hr",         name: "Human Resources" },
            { id: "marketing",  key: "icon_marketing",  name: "Marketing" },
            { id: "sales",      key: "icon_sales",      name: "Sales" },
            { id: "operations", key: "icon_operations", name: "Operations" },
            { id: "logistics",  key: "icon_logistics",  name: "Logistics" },
            { id: "finance",    key: "icon_finance",    name: "Finance" }
        ];

        // State
        this.currentStage = 1;
        this.stageObjects = [];
        this.selectedIdea = null;
        this.selectedType = null;
        this.selectedSector = null;
        this.selectedAreas = new Set();
        this.totalScore = 0;

        // ===== BACKGROUND & HUD =====
        this.add.image(640, 360, "background_main")
            .setDisplaySize(1280, 720);

        this.add.text(640, 40, "Build the Business", {
            fontFamily: "Arial",
            fontSize: "40px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        this.scoreText = this.add.text(1180, 40, "Score: 0", {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(1, 0.5);

        // Back to menu
        const backBtn = this.add.image(100, 40, "button_small_orange")
            .setInteractive({ cursor: "pointer" })
            .setScale(1.0);

        this.add.text(100, 40, "Menu", {
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

        // Start at stage 1
        this.showStage1();
    }

    // ===== Utility: tracking stage objects =====
    clearStage() {
        if (this.stageObjects) {
            this.stageObjects.forEach(obj => obj.destroy());
        }
        this.stageObjects = [];
    }

    track(obj) {
        this.stageObjects.push(obj);
        return obj;
    }

    updateScoreDisplay() {
        this.scoreText.setText("Score: " + this.totalScore);
    }

    // =========================
// STAGE 1: CHOOSE IDEA
// =========================
showStage1() {
    this.clearStage();
    this.currentStage = 1;

    const panel = this.track(
        this.add.image(640, 150, "panel_large")
            .setDisplaySize(900, 220)
    );

    const title = this.track(
        this.add.text(640, 90, "Stage 1 – Choose a Business Idea", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5)
    );

    const instructions = this.track(
        this.add.text(640, 150,
            "Click on a business idea. Think about the type of business and who the customers are.",
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                wordWrap: { width: 820 }
            }).setOrigin(0.5)
    );

    // Positions for the 6 idea cards (2 rows of 3)
    const positions = [
        { x: 280, y: 340 },
        { x: 640, y: 340 },
        { x: 1000, y: 340 },
        { x: 280, y: 540 },
        { x: 640, y: 540 },
        { x: 1000, y: 540 }
    ];

    this.businessIdeas.forEach((idea, index) => {
        const pos = positions[index];

        // FORCE image to display at a proper size
        const img = this.track(
            this.add.image(pos.x, pos.y, idea.key)
                .setInteractive({ cursor: "pointer" })
                .setDisplaySize(150, 150)     // ← FIXED SIZE (no more tiny boxes)
        );

        const label = this.track(
            this.add.text(pos.x, pos.y + 160, idea.name, {
                fontFamily: "Arial",
                fontSize: "18px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                wordWrap: { width: 260 }
            }).setOrigin(0.5)
        );

        // Hover behaviour
        img.on("pointerover", () => {
            if (this.selectedIdea !== idea) {
                img.setDisplaySize(165, 165);  // slight enlarge
            }
        });

        img.on("pointerout", () => {
            if (this.selectedIdea === idea) {
                img.setDisplaySize(170, 170);  // selected stays enlarged
            } else {
                img.setDisplaySize(150, 150);  // normal size
            }
        });

        // Click selection behaviour
        img.on("pointerup", () => {
            this.sound.play("click");
            this.selectedIdea = idea;

            // Reset all others
            this.businessIdeas.forEach((other, i2) => {
                const otherPos = positions[i2];
                // Find the corresponding image by position match
                const otherImg = this.stageObjects.find(o =>
                    o.x === otherPos.x && o.y === otherPos.y
                );
                if (otherImg && other !== idea) {
                    otherImg.setDisplaySize(150, 150);
                }
            });

            // Highlight selected
            img.setDisplaySize(170, 170);

            // Update description box
            this.ideaDescriptionText.setText(idea.description);

            // Enable the next button
            nextBtn.setAlpha(1);
            nextBtn.setInteractive({ cursor: "pointer" });
        });
    });

    // Description text box under the instruction panel
    this.ideaDescriptionText = this.track(
        this.add.text(640, 210, "", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#ffffcc",
            stroke: "#000000",
            strokeThickness: 3,
            align: "center",
            wordWrap: { width: 820 }
        }).setOrigin(0.5)
    );

    // Next button (disabled initially)
    const nextBtn = this.track(
        this.add.image(1180, 650, "button_medium_green")
            .setScale(1.0)
            .setAlpha(0.4)
    );

    const nextLabel = this.track(
        this.add.text(1180, 650, "Next", {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5)
    );

    nextBtn.on("pointerover", () => {
        if (nextBtn.input && nextBtn.input.enabled) {
            nextBtn.setScale(1.05);
        }
    });

    nextBtn.on("pointerout", () => nextBtn.setScale(1.0));

    nextBtn.on("pointerup", () => {
        if (!this.selectedIdea) return;
        this.sound.play("click");
        this.showStage2();
    });

    nextBtn.disableInteractive();
}

    showIdeaDescription(idea) {
        if (this.ideaDescriptionText) {
            this.ideaDescriptionText.setText(idea.description);
        }
    }

  // =========================
// STAGE 2: OWNERSHIP TYPE
// =========================
showStage2() {
    this.clearStage();
    this.currentStage = 2;

    const panel = this.track(
        this.add.image(640, 150, "panel_large")
            .setDisplaySize(900, 220)
    );

    const title = this.track(
        this.add.text(640, 90, "Stage 2 – Choose Ownership Type", {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5)
    );

    const instructions = this.track(
        this.add.text(640, 150,
            "Which ownership type fits this business best? Think about size, risk and control.",
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                wordWrap: { width: 820 }
            }).setOrigin(0.5)
    );

    // Icon positions
    const positions = [
        { x: 280, y: 380 },
        { x: 540, y: 380 },
        { x: 820, y: 380 },
        { x: 1080, y: 380 }
    ];

    this.ownershipTypes.forEach((type, index) => {
        const pos = positions[index];

        // FIX: Display ownership type icon cleanly
        const img = this.track(
            this.add.image(pos.x, pos.y, type.key)
                .setInteractive({ cursor: "pointer" })
                .setDisplaySize(200, 200)     // << 🟩 FIX: consistent icon size
        );

        // Label
        const label = this.track(
            this.add.text(pos.x, pos.y + 125, type.name, {
                fontFamily: "Arial",
                fontSize: "18px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                wordWrap: { width: 220 }
            }).setOrigin(0.5)
        );

        // Hover behaviour
        img.on("pointerover", () => {
            img.setDisplaySize(215, 215);     // slightly bigger hover
        });

        img.on("pointerout", () => {
            if (this.selectedType === type) {
                img.setDisplaySize(215, 215); // selected stays big
            } else {
                img.setDisplaySize(200, 200); // unselected returns to normal
            }
        });

        // Click behaviour
        img.on("pointerup", () => {
            this.sound.play("click");
            this.selectedType = type;

            // Reset all other icons
            this.ownershipTypes.forEach((other, i2) => {
                const pos2 = positions[i2];
                const otherImg = this.stageObjects.find(o =>
                    o.x === pos2.x && o.y === pos2.y
                );
                if (otherImg && other.id !== type.id) {
                    otherImg.setDisplaySize(200, 200);
                }
            });

            // Highlight selected one
            img.setDisplaySize(215, 215);

            nextBtn.setAlpha(1);
            nextBtn.setInteractive({ cursor: "pointer" });
        });
    });

    // Next button
    const nextBtn = this.track(
        this.add.image(1180, 650, "button_medium_green")
            .setScale(1.0)
            .setAlpha(0.4)
    );
    const nextLabel = this.track(
        this.add.text(1180, 650, "Next", {
            fontFamily: "Arial",
            fontSize: "22px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3
        }).setOrigin(0.5)
    );

    nextBtn.on("pointerover", () => {
        if (nextBtn.input && nextBtn.input.enabled) {
            nextBtn.setScale(1.05);
        }
    });
    nextBtn.on("pointerout", () => nextBtn.setScale(1.0));

    nextBtn.on("pointerup", () => {
        if (!this.selectedType) return;
        this.sound.play("click");
        this.scoreOwnershipChoice();
        this.updateScoreDisplay();
        this.showStage3();
    });

    nextBtn.disableInteractive();
}

    scoreOwnershipChoice() {
        if (!this.selectedIdea || !this.selectedType) return;
        const rules = this.selectedIdea;

        if (rules.bestTypes.includes(this.selectedType.id)) {
            this.totalScore += 3;
        } else if (rules.okTypes.includes(this.selectedType.id)) {
            this.totalScore += 2;
        } else {
            this.totalScore += 1;
        }
        this.sound.play("success");
    }

    // =========================
    // STAGE 3: SECTOR
    // =========================
    showStage3() {
        this.clearStage();
        this.currentStage = 3;

        const panel = this.track(
            this.add.image(640, 150, "panel_large")
                .setDisplaySize(900, 220)
        );

        const title = this.track(
            this.add.text(640, 90, "Stage 3 – Choose the Business Sector", {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 5
            }).setOrigin(0.5)
        );

        const instructions = this.track(
            this.add.text(640, 150,
                "Which sector does your business belong to? Primary, Secondary or Tertiary?",
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    wordWrap: { width: 820 }
                }).setOrigin(0.5)
        );

        const positions = [
            { x: 360, y: 400 },
            { x: 640, y: 400 },
            { x: 920, y: 400 }
        ];

        this.sectors.forEach((sector, index) => {
            const pos = positions[index];

            const img = this.track(
                this.add.image(pos.x, pos.y, sector.key)
                    .setInteractive({ cursor: "pointer" })
                    .setScale(0.9)
            );

            const label = this.track(
                this.add.text(pos.x, pos.y + 90, sector.name, {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    wordWrap: { width: 280 }
                }).setOrigin(0.5)
            );

            img.on("pointerover", () => {
                img.setScale(0.95);
            });

            img.on("pointerout", () => {
                if (this.selectedSector === sector) {
                    img.setScale(1.0);
                } else {
                    img.setScale(0.9);
                }
            });

            img.on("pointerup", () => {
                this.sound.play("click");
                this.selectedSector = sector;
                img.setScale(1.0);
                nextBtn.setAlpha(1);
                nextBtn.setInteractive({ cursor: "pointer" });
            });
        });

        const nextBtn = this.track(
            this.add.image(1180, 650, "button_medium_green")
                .setScale(1.0)
                .setAlpha(0.4)
        );
        const nextLabel = this.track(
            this.add.text(1180, 650, "Next", {
                fontFamily: "Arial",
                fontSize: "22px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3
            }).setOrigin(0.5)
        );

        nextBtn.on("pointerover", () => {
            if (nextBtn.input && nextBtn.input.enabled) {
                nextBtn.setScale(1.05);
            }
        });
        nextBtn.on("pointerout", () => nextBtn.setScale(1.0));

        nextBtn.on("pointerup", () => {
            if (!this.selectedSector) return;
            this.sound.play("click");
            this.scoreSectorChoice();
            this.updateScoreDisplay();
            this.showStage4();
        });

        nextBtn.disableInteractive();
    }

    scoreSectorChoice() {
        if (!this.selectedIdea || !this.selectedSector) return;
        const rules = this.selectedIdea;

        if (rules.bestSectors.includes(this.selectedSector.id)) {
            this.totalScore += 3;
        } else if (rules.okSectors.includes(this.selectedSector.id)) {
            this.totalScore += 2;
        } else {
            this.totalScore += 1;
        }
        this.sound.play("success");
    }

    // =========================
    // STAGE 4: FUNCTIONAL AREAS
    // =========================
    showStage4() {
        this.clearStage();
        this.currentStage = 4;
        this.selectedAreas = new Set();

        const panel = this.track(
            this.add.image(640, 150, "panel_large")
                .setDisplaySize(900, 230)
        );

        const title = this.track(
            this.add.text(640, 90, "Stage 4 – Choose Key Functional Areas", {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 5
            }).setOrigin(0.5)
        );

        const infoText = "Click on the functional areas that are MOST important for this business.\n" +
            "(You can choose several. Click again to deselect.)";
        const instructions = this.track(
            this.add.text(640, 150, infoText, {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                wordWrap: { width: 820 }
            }).setOrigin(0.5)
        );

        const positions = [
            { x: 260, y: 380 },
            { x: 520, y: 380 },
            { x: 780, y: 380 },
            { x: 1040, y: 380 },
            { x: 380, y: 580 },
            { x: 900, y: 580 }
        ];

        this.functionalAreas.forEach((area, index) => {
            const pos = positions[index];

            const img = this.track(
                this.add.image(pos.x, pos.y, area.key)
                    .setInteractive({ cursor: "pointer" })
                    .setScale(0.8)
            );

            const label = this.track(
                this.add.text(pos.x, pos.y + 80, area.name, {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    wordWrap: { width: 220 }
                }).setOrigin(0.5)
            );

            img.on("pointerup", () => {
                this.sound.play("click");
                if (this.selectedAreas.has(area.id)) {
                    this.selectedAreas.delete(area.id);
                    img.clearTint();
                    img.setScale(0.8);
                } else {
                    this.selectedAreas.add(area.id);
                    img.setTint(0x99ff99);
                    img.setScale(0.85);
                }
                nextBtn.setAlpha(this.selectedAreas.size > 0 ? 1 : 0.4);
                if (this.selectedAreas.size > 0) {
                    nextBtn.setInteractive({ cursor: "pointer" });
                } else {
                    nextBtn.disableInteractive();
                }
            });

            img.on("pointerover", () => {
                if (!this.selectedAreas.has(area.id)) {
                    img.setScale(0.85);
                }
            });
            img.on("pointerout", () => {
                if (!this.selectedAreas.has(area.id)) {
                    img.setScale(0.8);
                }
            });
        });

        const nextBtn = this.track(
            this.add.image(1180, 650, "button_medium_green")
                .setScale(1.0)
                .setAlpha(0.4)
        );
        const nextLabel = this.track(
            this.add.text(1180, 650, "Finish", {
                fontFamily: "Arial",
                fontSize: "22px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3
            }).setOrigin(0.5)
        );

        nextBtn.on("pointerover", () => {
            if (nextBtn.input && nextBtn.input.enabled) {
                nextBtn.setScale(1.05);
            }
        });
        nextBtn.on("pointerout", () => nextBtn.setScale(1.0));

        nextBtn.on("pointerup", () => {
            if (this.selectedAreas.size === 0) return;
            this.sound.play("click");
            this.scoreFunctionalAreas();
            this.updateScoreDisplay();
            this.showSummary();
        });

        nextBtn.disableInteractive();
    }

    scoreFunctionalAreas() {
        if (!this.selectedIdea) return;
        const recommended = new Set(this.selectedIdea.recommendedAreas);
        let scoreGained = 0;

        // Reward for picking recommended areas
        this.selectedAreas.forEach(id => {
            if (recommended.has(id)) {
                scoreGained += 2;
            } else {
                scoreGained += 1;
            }
        });

        // Bonus if they picked at least 3 recommended
        let correctCount = 0;
        this.selectedAreas.forEach(id => {
            if (recommended.has(id)) correctCount++;
        });
        if (correctCount >= 3) {
            scoreGained += 2;
        }

        this.totalScore += scoreGained;
        this.sound.play("success");
    }

    // =========================
    // STAGE 5: SUMMARY
    // =========================
    showSummary() {
        this.clearStage();
        this.currentStage = 5;

        const overlay = this.track(
            this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.5)
        );

        const panel = this.track(
            this.add.image(640, 360, "panel_large")
                .setDisplaySize(900, 480)
        );

        // Badge based on final score
        let badgeKey = "badge_bronze";
        let message = "Good effort building your business!";

        if (this.totalScore >= 18) {
            badgeKey = "badge_gold";
            message = "Excellent business planning – Gold badge!";
        } else if (this.totalScore >= 12) {
            badgeKey = "badge_silver";
            message = "Strong business plan – Silver badge!";
        }

        const badge = this.track(
            this.add.image(640, 210, badgeKey)
                .setScale(0.8)
        );

        const summaryTitle = this.track(
            this.add.text(640, 320, message, {
                fontFamily: "Arial",
                fontSize: "26px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
                wordWrap: { width: 800 }
            }).setOrigin(0.5)
        );

        const ideaName = this.selectedIdea ? this.selectedIdea.name : "N/A";
        const typeName = this.selectedType ? this.selectedType.name : "N/A";
        const sectorName = this.selectedSector ? this.selectedSector.name : "N/A";

        const areasList = Array.from(this.selectedAreas).map(id => {
            const area = this.functionalAreas.find(a => a.id === id);
            return area ? area.name : id;
        }).join(", ");

        const detailsText = `Business Idea: ${ideaName}
Ownership Type: ${typeName}
Sector: ${sectorName}
Key Functional Areas: ${areasList || "None selected"}

Total Score: ${this.totalScore}`;

        const details = this.track(
            this.add.text(640, 410, detailsText, {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
                lineSpacing: 6,
                wordWrap: { width: 800 }
            }).setOrigin(0.5)
        );

        const retryBtn = this.track(
            this.add.image(540, 540, "button_medium_green")
                .setScale(0.9)
                .setInteractive({ cursor: "pointer" })
        );
        const menuBtn = this.track(
            this.add.image(740, 540, "button_medium_orange")
                .setScale(0.9)
                .setInteractive({ cursor: "pointer" })
        );

        const retryLabel = this.track(
            this.add.text(540, 540, "Play Again", {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3
            }).setOrigin(0.5)
        );
        const menuLabel = this.track(
            this.add.text(740, 540, "Menu", {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3
            }).setOrigin(0.5)
        );

        retryBtn.on("pointerup", () => {
            this.sound.play("click");
            this.totalScore = 0;
            this.updateScoreDisplay();
            this.selectedIdea = null;
            this.selectedType = null;
            this.selectedSector = null;
            this.selectedAreas = new Set();
            this.showStage1();
        });

        menuBtn.on("pointerup", () => {
            this.sound.play("click");
            this.scene.start("MenuScene");
        });
    }
}