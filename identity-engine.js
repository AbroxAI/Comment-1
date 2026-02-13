// identity-engine.js
// -------------------------------------------------
// Manages personas per post and ensures realism
// -------------------------------------------------

// Fixed Admin Persona
const Admin = {
    name: "Profit Hunter 🌐",
    avatar: "static/admin.jpg",
    isAdmin: true
};

// Avatar sources for synthetic users
const AVATAR_SOURCES = [
    "https://i.pravatar.cc/150?img=",
    "https://api.dicebear.com/6.x/avataaars/svg?seed=",
    "https://api.multiavatar.com/"
];

// Name variants for realism
const NAME_VARIANTS = [
    "alex", "maria", "john", "lily", "max", "zoe", "leo", "emma", "sam", "ava",
    "oliver", "sophia", "jack", "mia", "liam", "isabella", "noah", "amelia"
];

// Suffixes / emojis for realism
const SUFFIXES = ["", " 💸", " 🌟", "🔥", "💯", "✨", "💀", "😎"];

// Post-specific synthetic persona pool
const POST_PERSONAS = {}; // { postId: [persona1, persona2, ...] }

// Generate a single synthetic persona
function generateSyntheticPersona(id) {
    const name = NAME_VARIANTS[Math.floor(Math.random() * NAME_VARIANTS.length)]
        + SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];

    const avatarSource = AVATAR_SOURCES[Math.floor(Math.random() * AVATAR_SOURCES.length)];
    const avatar = avatarSource + Math.floor(Math.random() * 1000);

    return {
        name,
        avatar,
        isAdmin: false
    };
}

// Get synthetic personas for a post (unique per post)
function getSyntheticPersonasForPost(postId, count = 35) {
    if (!POST_PERSONAS[postId]) {
        const pool = [];
        const usedNames = new Set();
        while (pool.length < count) {
            const persona = generateSyntheticPersona(pool.length);
            if (!usedNames.has(persona.name)) {
                pool.push(persona);
                usedNames.add(persona.name);
            }
        }
        POST_PERSONAS[postId] = pool;
    }
    return POST_PERSONAS[postId];
}

// Expose a function to get a persona: admin or synthetic
function getPersona({ type = "synthetic", postId = null } = {}) {
    if (type === "admin") return Admin;
    if (postId) {
        const pool = getSyntheticPersonasForPost(postId);
        const idx = Math.floor(Math.random() * pool.length);
        return pool[idx];
    }
    // fallback generic
    return generateSyntheticPersona(Math.floor(Math.random() * 1000));
}
