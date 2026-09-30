// Mobile nav toggle. Desktop submenu (Products) opens on hover/focus via
// CSS alone — no JS needed there.
(function () {
	var toggle = document.querySelector(".nav-toggle");
	var nav = document.getElementById("primary-nav");
	if (!toggle || !nav) return;

	toggle.addEventListener("click", function () {
		var open = nav.classList.toggle("is-open");
		toggle.setAttribute("aria-expanded", open ? "true" : "false");
	});

	// Close the mobile menu if the viewport is widened past the breakpoint.
	window.addEventListener("resize", function () {
		if (window.innerWidth > 900 && nav.classList.contains("is-open")) {
			nav.classList.remove("is-open");
			toggle.setAttribute("aria-expanded", "false");
		}
	});
})();
