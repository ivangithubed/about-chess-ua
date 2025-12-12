(function () {
    // Page transition animation with View Transitions API
    if ('startViewTransition' in document) {
        // Use modern View Transitions API
        document.addEventListener("click", function (e) {
            var link = e.target.closest("a");
            if (!link) return;

            var href = link.getAttribute("href");
            // Only internal links, not hash links, not external
            if (href && !href.startsWith("#") && !href.startsWith("http") && !link.hasAttribute("target")) {
                e.preventDefault();
                
                document.startViewTransition(function() {
                    window.location.href = href;
                });
            }
        });
    } else {
        // Fallback: simple fade without white flash
        var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (!reduceMotion) {
            document.addEventListener("click", function (e) {
                var link = e.target.closest("a");
                if (!link) return;

                var href = link.getAttribute("href");
                if (href && !href.startsWith("#") && !href.startsWith("http") && !link.hasAttribute("target")) {
                    e.preventDefault();
                    
                    document.body.style.transition = "opacity 0.2s ease";
                    document.body.style.opacity = "0";
                    
                    setTimeout(function () {
                        window.location.href = href;
                    }, 200);
                }
            });
        }
    }

    // Mark current page in the top navigation
    var path = (location.pathname || "").replace(/\\/g, "/");
    var file = path.split("/").pop() || "index.html";

    document.querySelectorAll(".nav a[href]").forEach(function (a) {
        var href = a.getAttribute("href") || "";
        if (href === file || (file === "" && href === "index.html")) {
            a.setAttribute("aria-current", "page");
        }
    });

    // Mark current piece link in sub-navigation (pieces/*.html)
    document.querySelectorAll(".subnav a[href]").forEach(function (a) {
        var href = a.getAttribute("href") || "";
        if (href === file) {
            a.setAttribute("aria-current", "page");
        }
    });

    // Keep the active piece centered in the horizontal sub-navigation
    var subnav = document.querySelector(".subnav");
    if (subnav) {
        var currentPiece = subnav.querySelector('a[aria-current="page"]');
        if (currentPiece) {
            var reduceMotion =
                window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var behavior = reduceMotion ? "auto" : "smooth";

            requestAnimationFrame(function () {
                var navRect = subnav.getBoundingClientRect();
                var itemRect = currentPiece.getBoundingClientRect();
                var delta =
                    itemRect.left -
                    navRect.left -
                    (navRect.width / 2 - itemRect.width / 2);

                if (Math.abs(delta) > 1) {
                    subnav.scrollBy({ left: delta, behavior: behavior });
                }
            });
        }
    }

    // Mobile menu toggle
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !isOpen);
            nav.classList.toggle("active");
        });

        // Close menu when clicking a link
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                toggle.setAttribute("aria-expanded", "false");
                nav.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                toggle.setAttribute("aria-expanded", "false");
                nav.classList.remove("active");
            }
        });
    }

    // Smooth scroll only for same-page hash links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
            var id = (a.getAttribute("href") || "").slice(1);
            if (!id) return;
            var el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", "#" + id);
        });
    });
})();
