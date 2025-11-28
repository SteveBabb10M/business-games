// ----------------------
// Random helpers
// ----------------------
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function pickRandom(array, count) {
    return shuffle(array).slice(0, count);
}

// ----------------------
// Timer utility
// ----------------------
class GameTimer {
    constructor() { this.startTime = null; }

    start() { this.startTime = Date.now(); }

    stop() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}

// ----------------------
// Score storage
// ----------------------
function saveBestScore(gameId, score, time) {
    let data = JSON.parse(localStorage.getItem("unit2_scores") || "{}");

    if (!data[gameId] || score > data[gameId].score) {
        data[gameId] = { score, time, date: new Date().toISOString() };
    }

    localStorage.setItem("unit2_scores", JSON.stringify(data));
}

function getBestScore(gameId) {
    let data = JSON.parse(localStorage.getItem("unit2_scores") || "{}");
    return data[gameId] || null;
}
