class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {

        // -------------------
        // UI / BACKGROUNDS
        // -------------------
        this.load.image("background_main", "assets/ui/background_main.jpg");
        this.load.image("background_scene", "assets/ui/background_scene.jpg");

        this.load.image("button_large_blue",   "assets/ui/button_large_blue.png");
        this.load.image("button_large_green",  "assets/ui/button_large_green.png");
        this.load.image("button_large_orange", "assets/ui/button_large_orange.png");

        this.load.image("button_medium_blue",   "assets/ui/button_medium_blue.png");
        this.load.image("button_medium_green",  "assets/ui/button_medium_green.png");
        this.load.image("button_medium_orange", "assets/ui/button_medium_orange.png");

        this.load.image("button_small_blue",   "assets/ui/button_small_blue.png");
        this.load.image("button_small_green",  "assets/ui/button_small_green.png");
        this.load.image("button_small_orange", "assets/ui/button_small_orange.png");

        this.load.image("panel_large",  "assets/ui/panel_large.png");
        this.load.image("panel_medium", "assets/ui/panel_medium.png");
        this.load.image("panel_small",  "assets/ui/panel_small.png");
        this.load.image("textbox",      "assets/ui/textbox.png");

        // -------------------
        // FUNCTIONAL AREA ICONS
        // -------------------
        this.load.image("icon_hr",         "assets/icons/icon_hr.png");
        this.load.image("icon_marketing",  "assets/icons/icon_marketing.png");
        this.load.image("icon_sales",      "assets/icons/icon_sales.png");
        this.load.image("icon_operations", "assets/icons/icon_operations.png");
        this.load.image("icon_logistics",  "assets/icons/icon_logistics.png");
        this.load.image("icon_finance",    "assets/icons/icon_finance.png");

        // -------------------
        // CARDS
        // -------------------
        this.load.image("card_wide",      "assets/cards/card_wide.png");
        this.load.image("card_tall",      "assets/cards/card_tall.png");
        this.load.image("card_square",    "assets/cards/card_square.png");
        this.load.image("token_link",     "assets/cards/token_link.png");

        // -------------------
        // BUSINESS TYPES / SECTORS
        // -------------------
        this.load.image("type_soletrader",    "assets/business/type_soletrader.png");
        this.load.image("type_partnership",   "assets/business/type_partnership.png");
        this.load.image("type_ltd",           "assets/business/type_ltd.png");
        this.load.image("type_franchise",     "assets/business/type_franchise.png");

        this.load.image("sector_primary",     "assets/business/sector_primary.png");
        this.load.image("sector_secondary",   "assets/business/sector_secondary.png");
        this.load.image("sector_tertiary",    "assets/business/sector_tertiary.png");

        // -------------------
        // BUSINESS IDEAS
        // -------------------
        this.load.image("idea_cupcakes",     "assets/businessideas/idea_cupcakes.png");
        this.load.image("idea_bikerepair",   "assets/businessideas/idea_bikerepair.png");
        this.load.image("idea_onlineclothes","assets/businessideas/idea_onlineclothes.png");
        this.load.image("idea_dogwalking",   "assets/businessideas/idea_dogwalking.png");
        this.load.image("idea_cafe",         "assets/businessideas/idea_cafe.png");
        this.load.image("idea_landscaping",  "assets/businessideas/idea_landscaping.png");

        // -------------------
        // SCORE BADGES
        // -------------------
        this.load.image("badge_bronze",  "assets/scores/badge_bronze.png");
        this.load.image("badge_silver",  "assets/scores/badge_silver.png");
        this.load.image("badge_gold",    "assets/scores/badge_gold.png");

        // -------------------
        // ESCAPE ROOM
        // -------------------
        this.load.image("room_bg1",       "assets/escape/room_bg1.jpg");
        this.load.image("room_bg2",       "assets/escape/room_bg2.jpg");
        this.load.image("room_bg3",       "assets/escape/room_bg3.jpg");
        this.load.image("door_locked",    "assets/escape/door_locked.png");
        this.load.image("clue_envelope",  "assets/escape/clue_envelope.png");
        this.load.image("clue_stamp",     "assets/escape/clue_stamp.png");
        this.load.image("escape_lightbulb","assets/escape/escape_lightbulb.png");
        this.load.image("escape_key",     "assets/escape/escape_key.png");

        // -------------------
        // MYSTERY BOARD
        // -------------------
        this.load.image("evidence_board",      "assets/mystery/evidence_board.jpg");
        this.load.image("note_square",         "assets/mystery/note_square.png");
        this.load.image("note_wide",           "assets/mystery/note_wide.png");
        this.load.image("evidence_pin_red",    "assets/mystery/evidence_pin_red.png");
        this.load.image("evidence_pin_blue",   "assets/mystery/evidence_pin_blue.png");
        this.load.image("evidence_pin_green",  "assets/mystery/evidence_pin_green.png");
        this.load.image("evidence_pin_yellow", "assets/mystery/evidence_pin_yellow.png");
        this.load.image("string_connection",   "assets/mystery/string_connection.png");
        this.load.image("stamp_solved",        "assets/mystery/stamp_solved.png");
        this.load.image("stamp_failed",        "assets/mystery/stamp_failed.png");

        // -------------------
        // AUDIO
        // -------------------
        this.load.audio("click",   "assets/audio/click.mp3");
        this.load.audio("success", "assets/audio/success.mp3");
        this.load.audio("error",   "assets/audio/error.mp3");
        this.load.audio("bg_music","assets/audio/bg_music.mp3");
    }

    create() {
        this.scene.start("MenuScene");
    }
}
