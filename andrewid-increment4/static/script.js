// ── GREETING ──
const now = new Date();
const hours = now.getHours();

function greeting(h) {
    if (h < 5 || h >= 20) return "Good night";
    else if (h < 12) return "Good morning";
    else if (h < 18) return "Good afternoon";
    else return "Good evening";
}

const greetingEl = document.getElementById("greeting");
if (greetingEl) {
    greetingEl.textContent = greeting(hours) + ", Welcome to the MonoMuse Museum";
}

// ── COPYRIGHT YEAR ──
const copyYear = document.getElementById("copyYear");
if (copyYear) {
    copyYear.textContent = "Copyright © " + now.getFullYear();
}

// ── ACTIVE NAV BAR ──
function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}
ActiveNav();

// ── VIEW MORE / LESS (EXPLORE SECTION) ──
const viewMore = document.getElementById("viewMore");
const viewLess = document.getElementById("viewLess");
const exploreSection = document.getElementById("exploreSection");

if (viewMore && viewLess && exploreSection) {

    viewMore.addEventListener("click", function () {
        exploreSection.style.display = "block";
        viewMore.style.display = "none";
        viewLess.style.display = "inline-block";
    });

    viewLess.addEventListener("click", function () {
        exploreSection.style.display = "none";
        viewMore.style.display = "inline-block";
        viewLess.style.display = "none";
    });
}

// ── SHOW CHECKOUT (tickets page) ──
function showCheckout(type, price) {
    const checkoutSection = document.getElementById("checkoutSection");
    if (!checkoutSection) return;

    checkoutSection.style.display = "block";
    document.getElementById("checkoutTitle").textContent = "Checkout";
    document.getElementById("ticketSummary").textContent =
        `Selected: ${type} ticket — $${price}`;

    checkoutSection.scrollIntoView({ behavior: "smooth" });
}

// ── SUBMIT ALERT ──
function submitTicket() {
    alert("Redirecting to payment system.");
}