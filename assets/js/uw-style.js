var uw_utils = {
    ready: function (fn) {
        if (typeof fn !== "function") return;
        if (document.readyState === "complete") {
            return fn();
        }
        document.addEventListener("DOMContentLoaded", fn, false);
    },
    toggleBooleanAttr: function (el, attr) {
        var current_value, new_value;
        if (el.hasAttribute(attr)) {
            current_value = el.getAttribute(attr);
            new_value = current_value == "true" ? false : true;
            el.setAttribute(attr, new_value);
        }
    },
    getSiblings: function (el) {
        var siblings = [];
        var sibling = el.parentNode.firstChild;
        for (; sibling; sibling = sibling.nextSibling) {
            if (sibling.nodeType === 1 && sibling !== el) {
                siblings.push(sibling);
            }
        }
        return siblings;
    },
};
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports.ready = uw_utils.ready;
    module.exports.toggleBooleanAttr = uw_utils.toggleBooleanAttr;
    module.exports.getSiblings = uw_utils.getSiblings;
}

uw_utils.ready(function () {
    var initMenuButton = function () {
        uw_menu_button.addEventListener("click", function (e) {
            uw_menu.classList.toggle("uw-is-visible");
            uw_utils.toggleBooleanAttr(uw_menu, "aria-hidden");
            uw_utils.toggleBooleanAttr(this, "aria-expanded");
            return false;
        });
    };
    var initDropdowns = function () {
        var dropdown_buttons = uw_menu.querySelectorAll(".uw-dropdown > a");
        if (dropdown_buttons.length == 0) {
            return;
        }
        [].forEach.call(dropdown_buttons, function (el) {
            var parent = el.parentNode;
            var child_menu = parent.querySelector(".uw-child-menu");
        
            el.addEventListener("mouseover", function (e) {
                e.preventDefault();
                parent.classList.add("uw-is-active");
                uw_utils.toggleBooleanAttr(this, "aria-expanded");
                uw_utils.toggleBooleanAttr(child_menu, "aria-hidden");
            });

            el.addEventListener("click", function (e) {
                e.preventDefault();
            });
        
            parent.addEventListener("mouseleave", function (e) {
                var relatedTarget = e.relatedTarget || e.toElement;
        
                // Check if the mouse is outside both the triggering element and the dropdown
                if (!parent.contains(relatedTarget)) {
                    parent.classList.remove("uw-is-active");
                    uw_utils.toggleBooleanAttr(el, "aria-expanded");
                    uw_utils.toggleBooleanAttr(child_menu, "aria-hidden");
                }
            });
        });
    };     
    var main_nav_items = document.querySelectorAll("#uw-main-nav > li");
    var calcMainMenuWidth = function () {
        var main_nav_width = 0;
        [].forEach.call(main_nav_items, function (el) {
            main_nav_width = main_nav_width + parseInt(window.getComputedStyle(el).width, 10);
        });
        var add_width = 32;
        if (supportsGetComputedStyleWidth === undefined) supportsGetComputedStyleWidth = testGetComputedWidth();
        if (!supportsGetComputedStyleWidth) {
            add_width = parseInt(add_width + (main_nav_items.length * 2 - 2) * 15.2, 10);
        }
        main_nav_width = main_nav_width + add_width;
        return main_nav_width;
    };
    var testGetComputedWidth = function () {
        var test_el = document.getElementById("test-get-computed-style-width");
        if (!test_el) {
            test_el = document.createElement("div");
            test_el.setAttribute("id", "test.js-get-computed-style-width");
            document.body.appendChild(test_el);
        }
        if (parseInt(window.getComputedStyle(test_el).width, 10) < 100) {
            return false;
        } else {
            return true;
        }
    };
    var uwMobileMenuResize = function () {
        if ("undefined" == typeof windowWidth) {
            windowWidth = 0;
        }
        if (windowWidth != window.innerWidth) {
            windowWidth = window.innerWidth;
            var min_mobile_breakpoint = 500,
                menu_width = calcMainMenuWidth();
            if (uw_menu.classList.contains("uw-is-visible")) {
                if (window.innerWidth < menu_width || window.innerWidth < min_mobile_breakpoint) {
                    uw_menu_button.classList.add("uw-is-visible");
                    uw_menu_button.setAttribute("aria-expanded", false);
                    uw_menu.classList.remove("uw-horizontal");
                    uw_menu.classList.add("uw-stacked");
                    uw_menu.classList.remove("uw-is-visible");
                    uw_menu.setAttribute("aria-hidden", true);
                }
                uw_menu.classList.remove("uw-hidden");
            } else {
                if (window.innerWidth > min_mobile_breakpoint) {
                    uw_menu.classList.add("uw-hidden", "uw-is-visible", "uw-horizontal");
                    uw_menu.classList.remove("uw-stacked");
                    menu_width = calcMainMenuWidth();
                    if (window.innerWidth > menu_width) {
                        uw_menu.classList.remove("uw-hidden");
                        uw_menu.setAttribute("aria-hidden", false);
                        uw_menu_button.classList.remove("uw-is-visible");
                        uw_menu_button.setAttribute("aria-expanded", true);
                    } else {
                        uw_menu.classList.remove("uw-is-visible", "uw-hidden", "uw-horizontal");
                        uw_menu.classList.add("uw-stacked");
                    }
                } else {
                    uw_menu.classList.remove("uw-horizontal");
                    uw_menu.classList.add("uw-stacked");
                }
            }
        }
    };
    var uw_menu_button = document.getElementById("uw-top-menus-button"),
        uw_menu = document.getElementById("uw-top-menus"),
        windowWidth,
        supportsGetComputedStyleWidth;
        initMenuButton();
    if (uw_menu) {
        uw_menu.classList.add("uw-display-none");
        uw_menu.classList.add("uw-hidden");
        initDropdowns();
        uwMobileMenuResize();
        window.setTimeout(function () {
            uwMobileMenuResize();
        }, 150);
        window.addEventListener("resize", uwMobileMenuResize);
    }
});

uw_utils.ready(function () {
    var initMenuButton = function () {
        uw_menu_button.addEventListener("click", function (e) {
            uw_menu.classList.toggle("uw-is-visible");
            uw_utils.toggleBooleanAttr(uw_menu, "aria-hidden");
            uw_utils.toggleBooleanAttr(this, "aria-expanded");
            return false;
        });
    };
    var initDropdowns = function () {
        var dropdown_buttons = uw_menu.querySelectorAll(".uw-dropdown > a");
        if (dropdown_buttons.length == 0) {
            return;
        }
        [].forEach.call(dropdown_buttons, function (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                var parent = this.parentNode,
                    parent_siblings = uw_utils.getSiblings(parent),
                    child_menu = parent.querySelector(".uw-child-menu");
                parent.classList.toggle("uw-is-active");
                uw_utils.toggleBooleanAttr(this, "aria-expanded");
                uw_utils.toggleBooleanAttr(child_menu, "aria-hidden");
                [].forEach.call(parent_siblings, function (el) {
                    if (el.classList.contains("uw-dropdown")) {
                        el.classList.remove("uw-is-active");
                        el.querySelector("a:first-child").setAttribute("aria-expanded", false);
                        el.querySelector(".uw-child-menu").setAttribute("aria-hidden", true);
                    }
                });
            });
        });
    };
    var main_nav_items = document.querySelectorAll("#uw-main-nav > li");
    var calcMainMenuWidth = function () {
        var main_nav_width = 0;
        [].forEach.call(main_nav_items, function (el) {
            main_nav_width = main_nav_width + parseInt(window.getComputedStyle(el).width, 10);
        });
        var add_width = 32;
        if (supportsGetComputedStyleWidth === undefined) supportsGetComputedStyleWidth = testGetComputedWidth();
        if (!supportsGetComputedStyleWidth) {
            add_width = parseInt(add_width + (main_nav_items.length * 2 - 2) * 15.2, 10);
        }
        main_nav_width = main_nav_width + add_width;
        return main_nav_width;
    };
    var testGetComputedWidth = function () {
        var test_el = document.getElementById("test-get-computed-style-width");
        if (!test_el) {
            test_el = document.createElement("div");
            test_el.setAttribute("id", "test-get-computed-style-width");
            document.body.appendChild(test_el);
        }
        if (parseInt(window.getComputedStyle(test_el).width, 10) < 100) {
            return false;
        } else {
            return true;
        }
    };
    var uwMobileMenuResize = function () {
        if ("undefined" == typeof windowWidth) {
            windowWidth = 0;
        }
        if (windowWidth != window.innerWidth) {
            windowWidth = window.innerWidth;
            var min_mobile_breakpoint = 500,
                menu_width = calcMainMenuWidth();
            if (uw_menu.classList.contains("uw-is-visible")) {
                if (window.innerWidth < menu_width || window.innerWidth < min_mobile_breakpoint) {
                    uw_menu_button.classList.add("uw-is-visible");
                    uw_menu_button.setAttribute("aria-expanded", false);
                    uw_menu.classList.remove("uw-horizontal");
                    uw_menu.classList.add("uw-stacked");
                    uw_menu.classList.remove("uw-is-visible");
                    uw_menu.setAttribute("aria-hidden", true);
                }
                uw_menu.classList.remove("uw-hidden");
            } else {
                if (window.innerWidth > min_mobile_breakpoint) {
                    uw_menu.classList.add("uw-hidden", "uw-is-visible", "uw-horizontal");
                    uw_menu.classList.remove("uw-stacked");
                    menu_width = calcMainMenuWidth();
                    if (window.innerWidth > menu_width) {
                        uw_menu.classList.remove("uw-hidden");
                        uw_menu.setAttribute("aria-hidden", false);
                        uw_menu_button.classList.remove("uw-is-visible");
                        uw_menu_button.setAttribute("aria-expanded", true);
                    } else {
                        uw_menu.classList.remove("uw-is-visible", "uw-hidden", "uw-horizontal");
                        uw_menu.classList.add("uw-stacked");
                    }
                } else {
                    uw_menu.classList.remove("uw-horizontal");
                    uw_menu.classList.add("uw-stacked");
                }
            }
        }
    };
    var uw_menu_button = document.getElementById("uw-sub-menus-button"),
        uw_menu = document.getElementById("uw-sub-menus"),
        windowWidth,
        supportsGetComputedStyleWidth;
        initMenuButton();
    if (uw_menu) {
        uw_menu.classList.add("uw-display-none");
        uw_menu.classList.add("uw-hidden");
        initDropdowns();
        uwMobileMenuResize();
        window.setTimeout(function () {
            uwMobileMenuResize();
        }, 150);
        window.addEventListener("resize", uwMobileMenuResize);
    }
});

uw_utils.ready(function () {
    function add_searchform_to_access() {
        var uw_search_list_items = document.querySelectorAll(".uw-nav-menu > ul li.uw-search-list-item"),
            uw_main_ul = document.querySelectorAll(".uw-nav-menu:not(.uw-nav-menu-secondary) > ul")[0],
            uw_search_form = document.querySelectorAll("header .uw-search-form")[0];
        if (window.matchMedia("(max-width: 31.2em)").matches && uw_search_list_items.length < 1 && uw_search_form) {
            var uw_search_li_el = document.createElement("li"),
                uw_main_ul_first_child = uw_main_ul.firstElementChild;
            uw_search_li_el.classList.add("page_item");
            uw_search_li_el.classList.add("uw-search-list-item");
            uw_search_li_el.appendChild(uw_search_form);
            uw_main_ul.insertBefore(uw_search_li_el, uw_main_ul_first_child);
        } else if (window.matchMedia("(min-width: 31.25em)").matches && uw_search_list_items.length > 0) {
            var uw_search_form_in_nav = document.querySelectorAll(".uw-nav-menu .uw-search-form")[0],
                uw_header_search = document.querySelectorAll(".uw-header-search")[0],
                uw_search_list_item = uw_search_list_items[0];
            if (!uw_search_form_in_nav) return false;
            uw_header_search.appendChild(uw_search_form_in_nav);
            uw_search_list_item.parentNode.removeChild(uw_search_list_item);
        }
    }
    function mediaQueriesSupported() {
        return typeof window.matchMedia != "undefined" || typeof window.msMatchMedia != "undefined";
    }
    var uw_main_menu_ul = document.querySelectorAll(".uw-main-nav > nav > ul");
    if (uw_main_menu_ul.length && mediaQueriesSupported()) {
        add_searchform_to_access();
        window.addEventListener(
            "resize",
            function () {
                var uw_search_form_in_nav = document.querySelectorAll(".uw-nav-menu .uw-search-form")[0];
                add_searchform_to_access();
            },
            false
        );
    }
});
uw_utils.ready(function () {
    var uw_breakpoint = 640;
    var side_nav_menu = document.querySelectorAll(".uw-side-nav")[0];
    var side_nav_button = document.querySelectorAll(".uw-side-nav-button")[0];
    var side_nav_menu_hidden_class = "uw-side-nav-is-hidden";
    var side_nav_menu_open_class = "uw-side-menu-open";
    var overlay = document.querySelectorAll(".uw-overlay")[0];
    window.uwShowSideNavMenu = function () {
        overlay.classList.remove("uw-is-active");
        side_nav_menu.parentNode.classList.remove(side_nav_menu_hidden_class);
    };
    window.uwHideSideNavMenu = function () {
        if (!side_nav_menu.parentNode.classList.contains(side_nav_menu_open_class)) {
            side_nav_menu.parentNode.classList.add(side_nav_menu_hidden_class);
        } else {
            overlay.classList.add("uw-is-active");
        }
    };
    var sideNavMenuToggle = function () {
        if (window.innerWidth > uw_breakpoint) {
            uwShowSideNavMenu();
        } else {
            uwHideSideNavMenu();
        }
    };
    if (side_nav_menu) {
        sideNavMenuToggle();
        window.addEventListener("resize", sideNavMenuToggle);
    }
    var toggle_side_nav_menu = function () {
        var el = side_nav_menu.parentNode;
        el.classList.toggle(side_nav_menu_hidden_class);
        el.classList.toggle(side_nav_menu_open_class);
        if (el.classList.contains(side_nav_menu_hidden_class)) {
            overlay.classList.remove("uw-is-active");
        } else {
            overlay.classList.add("uw-is-active");
            bindOverlayEvents();
        }
    };
    if (side_nav_button) side_nav_button.addEventListener("click", toggle_side_nav_menu);
    var body_for_overlay = document.querySelectorAll("body .uw-overlay.uw-is-active")[0];
    var clearMenuOverlay = function () {
        toggle_side_nav_menu();
    };
    var bindOverlayEvents = function () {
        var body_for_overlay = document.querySelectorAll("body .uw-overlay.uw-is-active")[0];
        body_for_overlay.addEventListener("click", clearMenuOverlay);
        body_for_overlay.addEventListener("touchend", clearMenuOverlay);
    };
    if (body_for_overlay) {
        bindOverlayEvents();
    }
});