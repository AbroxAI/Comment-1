// identity-engine.js
// -----------------------------
// Manages personas for posts and admin identity
// -----------------------------

const IdentityEngine = (() => {

    // Store personas per postId to avoid duplicates
    const posts = {};

    // Get a persona (admin or synthetic) for a post
    function getPersona(postId, type = "synthetic") {

        if (!posts[postId]) {
            posts[postId] = {
                usedPersonas: new Set()
            };
        }

        const used = posts[postId].usedPersonas;

        if (type === "admin") return Personas.admin;

        return Personas.generateSyntheticPersona(postId, used);
    }

    return {
        getPersona,
        posts
    };

})();
