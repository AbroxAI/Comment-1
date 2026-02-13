// realism-engine.js
// -----------------------------
// Controls synthetic activity + realism
// Per-post unique personas, progressive injection, admin Q&A
// -----------------------------

const RealismEngine = (() => {

    const postData = {}; // store state per post

    // Large pool of realistic messages
    const messagePool = [
        "Wow this is solid 🔥",
        "Can someone explain this better?",
        "I tried this yesterday and it worked",
        "This makes sense actually",
        "Interesting strategy 🤔",
        "Who else is testing this?",
        "That entry was clean 💯",
        "Respect for sharing this",
        "I don't fully agree but okay",
        "This market is crazy lately",
        "Facts.",
        "That breakout was obvious",
        "Been waiting for this post",
        "Legend 🔥",
        "This helped a lot thanks",
        "Risky but smart",
        "Let’s see how it plays out",
        "Admin was right again 👀",
        "Timing was perfect",
        "Any tips for beginners?"
    ];

    /**
     * Start synthetic activity for a post
     * @param {HTMLElement} container
     * @param {String} postId
     * @param {Number} preloadCount - optional initial comment count
     */
    function start(container, postId, preloadCount = null) {
        if (!container || !postId) return;

        if (!postData[postId]) {
            postData[postId] = {
                usedMessages: new Set(),
                intervalId: null,
                container
            };
        }

        // Preload realistic comments
        const initialCount = preloadCount || randomInt(10, 35);
        for (let i = 0; i < initialCount; i++) {
            generateComment(postId);
        }

        // Start interval for progressive comments
        scheduleNext(postId);
    }

    /**
     * Stop synthetic activity for a post
     */
    function stop(postId) {
        if (postData[postId] && postData[postId].intervalId) {
            clearTimeout(postData[postId].intervalId);
            postData[postId].intervalId = null;
        }
    }

    /**
     * Generate a single realistic comment
     */
    function generateComment(postId) {
        const data = postData[postId];
        if (!data) return;

        const isAdminReply = Math.random() < 0.08; // 8% chance admin replies
        let personaType = isAdminReply ? "admin" : "synthetic";

        const persona = IdentityEngine.getPersona(postId, personaType);

        // Pick a unique message
        let message;
        let attempts = 0;
        do {
            message = messagePool[randomInt(0, messagePool.length - 1)];
            attempts++;
        } while (data.usedMessages.has(message) && attempts < 20);
        data.usedMessages.add(message);

        // Admin only replies if Q&A needed
        const replyOptions = isAdminReply ? { reply: true } : {};

        BubbleRenderer.render(persona, message, data.container, replyOptions);
    }

    /**
     * Schedule next synthetic comment
     */
    function scheduleNext(postId) {
        const data = postData[postId];
        if (!data) return;

        const delay = randomInt(6000, 18000); // 6–18s
        data.intervalId = setTimeout(() => {
            generateComment(postId);
            scheduleNext(postId);
        }, delay);
    }

    /**
     * Random integer helper
     */
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return { start, stop };

})();
