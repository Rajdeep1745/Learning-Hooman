// Navbar Fix Script
/*
document.addEventListener("DOMContentLoaded", function () {
  console.log("Navbar fix script loaded");

  // Get the navbar toggler button
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    console.log("Navbar elements found");

    // Add click event listener as backup
    navbarToggler.addEventListener("click", function (e) {
      console.log("Navbar toggler clicked");

      // Toggle the collapse class manually if Bootstrap doesn't work
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      } else {
        navbarCollapse.classList.add("show");
        navbarToggler.setAttribute("aria-expanded", "true");
      }
    });

    // Log the current state
    console.log(
      "Navbar toggler aria-expanded:",
      navbarToggler.getAttribute("aria-expanded")
    );
    console.log("Navbar collapse classes:", navbarCollapse.className);
  } else {
    console.log("Navbar elements not found");
    console.log("Toggler:", navbarToggler);
    console.log("Collapse:", navbarCollapse);
  }
});
*/
