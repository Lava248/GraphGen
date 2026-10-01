/*
 * Set GRAPHGEN_API_URL to the deployed backend's Vercel URL before deploying
 * the frontend, for example: https://graphgen-api.vercel.app
 *
 * Leave it blank for local development; localhost then uses the local Express
 * server. This file contains no secret values and is safe to publish.
 */
window.GRAPHGEN_API_URL = "https://graphgen-backend.vercel.app";

window.GraphGenAPI = (() => {
    const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const configuredUrl = window.GRAPHGEN_API_URL.trim().replace(/\/$/, "");
    const baseUrl = isLocalHost ? "http://localhost:5000" : (configuredUrl || "");

    function url(path) {
        if (!baseUrl) {
            throw new Error("GraphGen API URL is not configured. Set GRAPHGEN_API_URL in js/api-config.js before deploying the frontend.");
        }

        return `${baseUrl}${path}`;
    }

    return { url };
})();
