// realism-engine.js
// ============================================================
// REALISM ENGINE v2
// Generates live synthetic comments for bubble-renderer.js
// Works with identity-personas.js & bubble-renderer.js
// ============================================================

const realismConfig = {
    minInterval: 2000, // min 2s between comments
    maxInterval: 8000, // max 8s
    trendingProbability: 0.3, // chance a comment triggers replies
    maxReplies: 5
};

let realismActive = true;

// ================= RANDOM DELAY HELPER =================
function randomDelay() {
    return realismConfig.minInterval + Math.random() * (realismConfig.maxInterval - realismConfig.minInterval);
}

// ================= GENERATE LIVE COMMENT =================
function generateLiveComment(baseText = null) {
    if (!realismActive) return;

    const persona = getRandomPersona();
    const text = baseText || generateHumanComment(persona, "Yo this looks solid!");
    const timestamp = generateTimestamp();

    // Render the comment bubble
    renderBubble(persona, text, timestamp);

    // Possibly trigger trending replies
    if (Math.random() < realismConfig.trendingProbability) {
        const replyCount = Math.floor(Math.random() * realismConfig.maxReplies) + 1;
        for (let i = 0; i < replyCount; i++) {
            setTimeout(() => {
                const replyPersona = getRandomPersona();
                const replyText = generateHumanComment(replyPersona, "Agreed!");
                renderBubble(replyPersona, replyText, generateTimestamp());
            }, 300 + Math.random() * 1000);
        }
    }

    // Schedule next comment
    setTimeout(() => generateLiveComment(), randomDelay());
}

// ================= START / STOP REALISM =================
function startRealism() { 
    if (!realismActive) {
        realismActive = true;
        generateLiveComment();
    }
}
function stopRealism() { realismActive = false; }

// ================= EXPORTS =================
window.startRealism = startRealism;
window.stopRealism = stopRealism;
window.generateLiveComment = generateLiveComment;

// ================= AUTO START =================
startRealism();
