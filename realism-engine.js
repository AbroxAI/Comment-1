// realism-engine.js
// -----------------------------
// Controls synthetic activity with realism
// -----------------------------

const RealismEngine = (() => {

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

    // Generate a synthetic comment for a post
    function generateComment(postId, container) {
        if (!container) return;

        const isAdminReply = Math.random() < 0.08; // 8% chance admin replies

        // Decide type: admin or synthetic
        const persona = isAdminReply ? IdentityEngine.getPersona(postId, "admin") 
                                     : IdentityEngine.getPersona(postId, "synthetic");

        // Pick random message
        const text = messagePool[Math.floor(Math.random() * messagePool.length)];

        // If admin reply, mark as threaded
        BubbleRenderer.render(persona, text, container, { reply: isAdminReply });
    }

    // Start synthetic activity for a post
    function start(postId, container, initialCount = 10) {
        if (!container) return;

        // Preload initial comments
        for (let i = 0; i < initialCount; i++) {
            generateComment(postId, container);
        }

        // Continue generating comments progressively
        const intervalId = setInterval(() => {
            generateComment(postId, container);
        }, randomInterval());

        return intervalId; // can be used to stop
    }

    function randomInterval() {
        return Math.floor(Math.random() * 12000) + 6000; // 6–18 seconds
    }

    return { start };

})();
