// realism-engine.js
// -------------------------------------------------
// Controls synthetic activity timing + realism
// Requires:
// - identity-engine.js
// - bubble-renderer.js
// -------------------------------------------------

const RealismEngine = (() => {

    let container = null;
    let intervalId = null;
    let postId = null;

    // Realistic message pool
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
        "Timing was perfect",
        "Watching closely"
    ];

    /**
     * Start synthetic activity for a post
     * @param {HTMLElement} targetContainer
     * @param {String} id - postId
     */
    function start(targetContainer, id) {
        if (!targetContainer || !id) return;

        container = targetContainer;
        postId = id;

        stop(); // clear previous intervals if any

        intervalId = setInterval(generateActivity, randomInterval());
    }

    /**
     * Stop activity
     */
    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    /**
     * Generate one realistic comment
     */
    function generateActivity() {
        if (!container || !postId) return;

        const shouldAdminReply = Math.random() < 0.05; // admin replies occasionally

        const persona = shouldAdminReply
            ? getPersona({ type: "admin" })
            : getPersona({ type: "synthetic", postId });

        // Random message, possibly with typos
        let message = messagePool[Math.floor(Math.random() * messagePool.length)];
        if (Math.random() < 0.1) message = introduceTypos(message);

        BubbleRenderer.render(persona, message, container);

        // Restart interval with new random timing
        clearInterval(intervalId);
        intervalId = setInterval(generateActivity, randomInterval());
    }

    /**
     * Random interval 6–18 sec
     */
    function randomInterval() {
        return Math.floor(Math.random() * 12000) + 6000;
    }

    /**
     * Introduce minor typos for realism
     */
    function introduceTypos(text) {
        const chars = text.split('');
        if (chars.length < 3) return text;
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = String.fromCharCode(chars[idx].charCodeAt(0) + 1);
        return chars.join('');
    }

    return {
        start,
        stop
    };

})();
