// identity-engine.js
// -----------------------------
// Manages synthetic personas + per-post uniqueness
// -----------------------------

const IdentityEngine = (() => {

    const postsData = {}; // stores used personas per post

    const TOTAL_PERSONAS = 1000;
    const AVATAR_SOURCES = [
        "https://i.pravatar.cc/150?img=",
        "https://api.dicebear.com/6.x/avataaars/svg?seed=",
        "https://api.multiavatar.com/"
    ];

    function generateSyntheticPersona(id) {
        const names = ["alex", "maria", "john", "lily", "max", "zoe", "leo", "emma", "sam", "ava"];
        const suffixes = ["", " 💸", " 🌟", "🔥", "💯", "✨", "💀", "😎"];
        const name = names[Math.floor(Math.random() * names.length)] +
                     suffixes[Math.floor(Math.random() * suffixes.length)];
        const avatarSource = AVATAR_SOURCES[Math.floor(Math.random() * AVATAR_SOURCES.length)];
        const avatar = avatarSource + Math.floor(Math.random() * 100);

        return { name, avatar, isAdmin: false };
    }

    // Ensure per-post unique synthetic persona
    function getPersona(postId, type = "synthetic") {
        if (!postsData[postId]) postsData[postId] = new Set();

        if (type === "admin") {
            return Personas.admin;
        }

        let persona;
        do {
            persona = generateSyntheticPersona();
        } while (postsData[postId].has(persona.name));

        postsData[postId].add(persona.name);
        return persona;
    }

    return { getPersona };

})();
