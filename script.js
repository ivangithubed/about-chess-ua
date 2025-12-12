(function () {
    // Page transition animation - ONLY for desktop Chrome/Edge
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    var isChromiumDesktop = !isMobile && 'startViewTransition' in document && 
                           (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Edg') > -1);
    
    if (isChromiumDesktop) {
        // Use View Transitions API only on desktop Chrome/Edge
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
    }
    // No fallback - on mobile and Firefox just use default browser navigation

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

    // Scroll animations for non-home pages
    if (!document.body.classList.contains("home")) {
        var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (!reduceMotion && 'IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        entry.target.classList.remove('animate-out');
                    } else {
                        // Check if element was previously visible
                        if (entry.target.classList.contains('animate-in')) {
                            entry.target.classList.remove('animate-in');
                            entry.target.classList.add('animate-out');
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements to animate
            var animatedSelectors = [
                '.panel',
                '.piece-card',
                '.timeline .item',
                '.piece-intro',
                '.piece-hero',
                '.kicker',
                'h1',
                'h2',
                '.lead',
                '.hero-actions',
                '.note'
            ];

            animatedSelectors.forEach(function(selector) {
                document.querySelectorAll(selector).forEach(function(el) {
                    el.classList.add('scroll-animate');
                    observer.observe(el);
                });
            });
        }
    }
})();
