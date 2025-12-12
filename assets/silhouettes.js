// Inline SVG silhouette helpers (kept as simple, original shapes)
// Exported as strings to embed on pages without external images.

window.CHESS_SILHOUETTES = {
    king: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M56 16h8v10h10v8H64v10h-8V34H46v-8h10V16zm4 34c-16 0-28 12-28 26 0 11 7 20 17 24l-6 12h34l-6-12c10-4 17-13 17-24 0-14-12-26-28-26zm-40 62h80v8H20v-8z"/></svg>',
    queen: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 38l14 12 12-18 14 20 14-20 12 18 14-12-10 52H30L20 38zm18 58h44l4 14H34l4-14z"/></svg>',
    rook: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M26 22h16v14h10V22h16v14h10V22h16v18H26V22zm10 26h48l-6 46H42l-6-46zm-10 50h68v10H26V98z"/></svg>',
    bishop: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M60 14c-10 8-16 18-16 30 0 8 3 14 8 20l-10 12c-6 7-10 14-10 24h56c0-10-4-17-10-24L68 64c5-6 8-12 8-20 0-12-6-22-16-30zm-10 32h20v8H50v-8zm-30 62h80v8H20v-8z"/></svg>',
    knight: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M78 22c-14 0-24 10-34 18-6 5-12 10-20 12v10c8 0 14 3 18 8 4 6 5 12 5 20v10h46V86c0-10-3-18-8-26l6-8c4-5 5-10 3-16-2-8-8-14-16-14zm-24 28h18v8H54v-8zM26 108h72v8H26v-8z"/></svg>',
    pawn: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M60 18c-10 0-18 8-18 18 0 7 4 13 10 16-10 6-18 16-18 30h52c0-14-8-24-18-30 6-3 10-9 10-16 0-10-8-18-18-18zm-36 74h72v10H24V92z"/></svg>'
};

(function () {
    function renderSilhouettes(root) {
        if (!root || !root.querySelectorAll) return;
        root.querySelectorAll("[data-sil]").forEach(function (el) {
            var k = el.getAttribute("data-sil");
            if (window.CHESS_SILHOUETTES && window.CHESS_SILHOUETTES[k]) {
                el.innerHTML = window.CHESS_SILHOUETTES[k];
            }
        });
    }

    function run() {
        renderSilhouettes(document);
    }

    if (typeof document === "undefined") return;
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();
