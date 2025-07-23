// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="2025-07-23.html">Today</a></li><li class="chapter-item expanded affix "><li class="part-title">2025-07</li><li class="chapter-item expanded "><a href="daily/2025-07-23.html"><strong aria-hidden="true">1.</strong> 07-23-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-22.html"><strong aria-hidden="true">2.</strong> 07-22-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-21.html"><strong aria-hidden="true">3.</strong> 07-21-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-20.html"><strong aria-hidden="true">4.</strong> 07-20-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-19.html"><strong aria-hidden="true">5.</strong> 07-19-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-18.html"><strong aria-hidden="true">6.</strong> 07-18-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-17.html"><strong aria-hidden="true">7.</strong> 07-17-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-16.html"><strong aria-hidden="true">8.</strong> 07-16-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-15.html"><strong aria-hidden="true">9.</strong> 07-15-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-14.html"><strong aria-hidden="true">10.</strong> 07-14-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-13.html"><strong aria-hidden="true">11.</strong> 07-13-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-12.html"><strong aria-hidden="true">12.</strong> 07-12-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-11.html"><strong aria-hidden="true">13.</strong> 07-11-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-10.html"><strong aria-hidden="true">14.</strong> 07-10-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-09.html"><strong aria-hidden="true">15.</strong> 07-09-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-08.html"><strong aria-hidden="true">16.</strong> 07-08-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-07.html"><strong aria-hidden="true">17.</strong> 07-07-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-06.html"><strong aria-hidden="true">18.</strong> 07-06-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-05.html"><strong aria-hidden="true">19.</strong> 07-05-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-04.html"><strong aria-hidden="true">20.</strong> 07-04-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-03.html"><strong aria-hidden="true">21.</strong> 07-03-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-02.html"><strong aria-hidden="true">22.</strong> 07-02-日刊</a></li><li class="chapter-item expanded "><a href="daily/2025-07-01.html"><strong aria-hidden="true">23.</strong> 07-01-日刊</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
