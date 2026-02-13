// realism-engine.js
// ============================================================
// TELEGRAM-LIKE REALISM ENGINE
// Works with identity-personas.js & bubble-renderer.js
// Handles typing simulation, last-seen updates, emoji reactions
// Adds human-like delays and realism cues
// ============================================================

// ================= TYPING SIMULATION =================
const TypingQueue = new Map(); // personaName -> timeoutId

function simulateTyping(persona, baseText, callback) {
    if (!persona) return;
    const words = baseText.split(" ");
    let idx = 0;

    function typeNext() {
        if (idx < words.length) {
            idx++;
            const delay = 150 + Math.random() * 150; // 150-300ms per word
            TypingQueue.set(persona.name, setTimeout(typeNext, delay));
        } else {
            TypingQueue.delete(persona.name);
            if (callback) callback();
        }
    }

    typeNext();
}

// ================= LAST SEEN DYNAMICS =================
function updateLastSeen(persona) {
    if (!persona) return;
    const now = Date.now();
    // Randomly move lastSeen forward a bit
    const variance = 1000 * (30 + Math.random() * 300); // 30-330 sec
    persona.lastSeen = now - variance;
}

// Auto-update last seen for all personas
function autoUpdateLastSeen() {
    SyntheticPool.forEach(p => {
        if (maybe(0.02)) updateLastSeen(p); // small chance per tick
    });
    setTimeout(autoUpdateLastSeen, 5000);
}

// ================= EMOJI / REALISM REACTIONS =================
function addEmojiReaction(persona, bubbleEl) {
    if (!bubbleEl || !persona) return;
    if (maybe(0.3)) {
        const emoji = random(EMOJIS);
        const span = document.createElement("span");
        span.className = "tg-bubble-emoji";
        span.textContent = emoji;
        span.style.marginLeft = "4px";
        bubbleEl.appendChild(span);
    }
}

// ================= HUMAN-LIKE DELAY =================
function humanDelay(min=300, max=1200) {
    return min + Math.random() * (max - min);
}

// ================= REALISM TICK =================
function realismTick() {
    SyntheticPool.forEach(p => {
        // Occasionally simulate typing for trending posts
        if (maybe(0.005)) {
            const trendingText = "🔥 Hot market move!";
            simulateTyping(p, trendingText, () => {
                // Once typing completes, push comment to bubble renderer
                if (typeof renderBubble === "function") {
                    const comment = generateHumanComment(p, trendingText);
                    renderBubble(p, comment);
                }
            });
        }

        // Small chance to update last seen dynamically
        if (maybe(0.02)) updateLastSeen(p);
    });

    setTimeout(realismTick, 3000);
}

// ================= EXPORTS =================
function startRealismEngine() {
    autoUpdateLastSeen();
    realismTick();
}

function stopRealismEngine() {
    // Clear all typing timeouts
    TypingQueue.forEach(id => clearTimeout(id));
    TypingQueue.clear();
}

// Optional helper for UI to display "typing..." indicator
function showTypingIndicator(persona, containerEl) {
    if (!containerEl) return;
    let indicator = containerEl.querySelector(`.tg-typing-${persona.name}`);
    if (!indicator) {
        indicator = document.createElement("div");
        indicator.className = `tg-bubble tg-bubble-typing tg-typing-${persona.name}`;
        indicator.textContent = "typing...";
        indicator.style.opacity = "0.5";
        containerEl.appendChild(indicator);
    }

    // Remove after short random time
    setTimeout(() => {
        if (indicator && indicator.parentNode) indicator.parentNode.removeChild(indicator);
    }, 1000 + Math.random() * 2000);
}
