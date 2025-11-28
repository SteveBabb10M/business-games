/**
 * EscapeRoomState.js
 * ---------------------------------------------------------
 * Centralised state manager for the Escape Room system.
 * Handles difficulty, progress, variation tracking and resets.
 * Works alongside all EscapeRoomRoom#Scene.js files.
 * ---------------------------------------------------------
 */

class EscapeRoomState {

    constructor(scene) {
        this.scene = scene;

        // Initialise registry values if not present
        if (!this.scene.registry.has("escapeDifficulty")) {
            this.scene.registry.set("escapeDifficulty", "Standard");
        }

        if (!this.scene.registry.has("escapeProgress")) {
            this.scene.registry.set("escapeProgress", 0);   // 0 = not started
        }

        if (!this.scene.registry.has("escapeUsedVariations")) {
            this.scene.registry.set("escapeUsedVariations", {
                room1: [],
                room2: [],
                room3: [],
                room4: []
            });
        }
    }


    // --------------------------------------------------------------
    // DIFFICULTY MANAGEMENT
    // --------------------------------------------------------------
    getDifficulty() {
        return this.scene.registry.get("escapeDifficulty");
    }

    setDifficulty(level) {
        this.scene.registry.set("escapeDifficulty", level);
    }

    cycleDifficulty() {
        const current = this.getDifficulty();

        let next = "Easy";
        if (current === "Easy") next = "Standard";
        else if (current === "Standard") next = "Hard";
        else if (current === "Hard") next = "Easy";

        this.setDifficulty(next);
        return next;
    }


    // --------------------------------------------------------------
    // PROGRESSION MANAGEMENT
    // --------------------------------------------------------------
    getProgress() {
        return this.scene.registry.get("escapeProgress");
    }

    setProgress(stageNumber) {
        this.scene.registry.set("escapeProgress", stageNumber);
    }

    resetProgress() {
        this.scene.registry.set("escapeProgress", 0);
    }


    // --------------------------------------------------------------
    // VARIATION MANAGEMENT (optional but helpful)
    // --------------------------------------------------------------
    /**
     * Pick a variation number from 1..maxVariations
     * Ensures variety but allows repeats if needed.
     */
    chooseVariation(roomKey, maxVariations = 3) {
        const used = this.scene.registry.get("escapeUsedVariations");
        const roomHistory = used[roomKey];

        // All variations used → reset
        if (roomHistory.length >= maxVariations) {
            used[roomKey] = [];
            this.scene.registry.set("escapeUsedVariations", used);
        }

        // Choose unused variation
        let choice;
        do {
            choice = Phaser.Math.Between(1, maxVariations);
        } while (used[roomKey].includes(choice));

        // Save choice
        used[roomKey].push(choice);
        this.scene.registry.set("escapeUsedVariations", used);

        return choice;
    }


    // --------------------------------------------------------------
    // RESET THE ENTIRE ESCAPE ROOM
    // --------------------------------------------------------------
    fullReset() {
        this.resetProgress();
        this.scene.registry.set("escapeDifficulty", "Standard");
        this.scene.registry.set("escapeUsedVariations", {
            room1: [],
            room2: [],
            room3: [],
            room4: []
        });
    }
}