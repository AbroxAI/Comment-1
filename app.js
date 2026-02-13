// app.js
// ============================================================
// ABROX COMMUNITY MAIN CONTROLLER
// Connects:
// - identity-personas.js
// - bubble-renderer.js
// - realism-engine-v11.js
// Controls boot, reactions, duplicate safety, interaction
// ============================================================

// ======== GLOBAL COMMUNITY STATE ========
const COMMUNITY_STATE = {
    initialized: false,
    totalRendered: 0,
    maxVisibleBubbles: 120, // prevent DOM overload
    postHistory: new Map()  // postId => Set(replies)
};

// ======== DUPLICATE GUARD PER POST ========
function isDuplicate(postId, text) {
    if (!COMMUNITY_STATE.postHistory.has(postId)) {
        COMMUNITY_STATE.postHistory.set(postId, new Set());
    }

    const replies = COMMUNITY_STATE.postHistory.get(postId);

    if (replies.has(text)) {
        return true;
    }

    replies.add(text);
    return false;
}

window.isDuplicate = isDuplicate;

// ======== BUBBLE RENDER HOOK ========
const originalRenderBubble = window.renderBubble;

window.renderBubble = function(persona, text, timestamp, isOwn = false) {
    if (!persona || !text) return;

    // Call original renderer
    originalRenderBubble(persona, text, timestamp, isOwn);

    COMMUNITY_STATE.totalRendered++;

    // Limit total visible bubbles to prevent lag
    const container = document.querySelector("#chat-container");
    if (container && container.children.length > COMMUNITY_STATE.maxVisibleBubbles) {
        container.removeChild(container.firstChild);
    }

    // Randomly trigger organic reaction (not every time)
    if (Math.random() < 0.18) {
        if (window.triggerTrendingReactionV11) {
            window.triggerTrendingReactionV11(text);
        }
    }
};

// ======== COMMUNITY BOOT SEQUENCE ========
function bootCommunity() {
    if (COMMUNITY_STATE.initialized) return;

    console.log("🚀 Booting Abrox Binary Options Community...");

    // Initial organic spread
    if (window.postFromPoolV11) {
        window.postFromPoolV11(35);
    }

    // Start continuous chatter
    if (window.simulateRandomCrowdV11) {
        window.simulateRandomCrowdV11(7000);
    }

    COMMUNITY_STATE.initialized = true;
}

window.bootCommunity = bootCommunity;

// ======== USER MESSAGE HANDLER ========
function handleUserMessage(inputText) {
    if (!inputText || !inputText.trim()) return;

    const persona = {
        name: "You",
        avatar: "🧑‍💻",
        region: "global"
    };

    const timestamp = generateTimestamp();

    window.renderBubble(persona, inputText.trim(), timestamp, true);

    // Community reacts to user
    setTimeout(() => {
        if (window.triggerTrendingReactionV11) {
            window.triggerTrendingReactionV11(inputText);
        }
    }, 1200 + Math.random() * 1500);
}

window.handleUserMessage = handleUserMessage;

// ======== AUTO START AFTER DOM LOAD ========
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        bootCommunity();
    }, 800);
});
