console.log("SCRIPT IS LOADING");

/* ── NAV TOGGLE ── */
window.toggleNav = function() {
    var nav = document.getElementById("myNav");
    nav.className = (nav.className === "nav_bar") ? "nav_bar responsive" : "nav_bar";
};

/* ── SELECT DATE ── */
window.selectDate = function(date) {
    var input = document.getElementById("date");
    if (input) input.value = date;

    var section = document.getElementById("checkoutSection");
    if (!section) return;
    section.style.display = "block";

    updateOrderTotal();
    section.scrollIntoView({ behavior: "smooth" });
};

/* ── UPDATE ORDER TOTAL ── */
window.updateOrderTotal = function() {
    var selectedRadio = document.querySelector('input[name="ticketType"]:checked');
    var price = selectedRadio ? parseFloat(selectedRadio.getAttribute("data-price")) : 15;
    var qtyEl = document.getElementById("quantityInput");
    var qty = qtyEl ? parseInt(qtyEl.value, 10) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;
    var total = price * qty;

    var totalEl = document.getElementById("orderTotal");
    if (totalEl) {
        totalEl.textContent = total === 0 ? "Free" : "$" + total.toFixed(2);
    }

    var dateVal = document.getElementById("date") ? document.getElementById("date").value : "";
    var type = selectedRadio ? selectedRadio.value : "General";
    var summaryEl = document.getElementById("ticketSummary");
    if (summaryEl) {
        summaryEl.textContent = dateVal
            ? "Date: " + dateVal + "  |  " + type + " ticket"
            : type + " ticket";
    }
};

/* ── SUBMIT TICKET ── */
window.submitTicket = function() {
    var name  = (document.getElementById("nameInput")  || {}).value || "";
    var email = (document.getElementById("emailInput") || {}).value || "";
    var date  = (document.getElementById("date")       || {}).value || "";
    var qty   = (document.getElementById("quantityInput") || {}).value || "1";
    var selectedRadio = document.querySelector('input[name="ticketType"]:checked');
    var type  = selectedRadio ? selectedRadio.value : "General";

    name  = name.trim();
    email = email.trim();

    if (!name || !email || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    alert("Booking confirmed!\n\nName: " + name + "\nEmail: " + email + "\nDate: " + date + "\nTicket: " + type + " x" + qty + "\n\nSee you at MonoMuse!");

    document.getElementById("checkoutSection").style.display = "none";
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("quantityInput").value = "1";
    document.getElementById("date").value = "";
};

/* ── GREETING ── */
var greetingEl = document.getElementById("greeting");
if (greetingEl) {
    var h = new Date().getHours();
    var greetWord = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    greetingEl.textContent = greetWord + ", Welcome to MonoMuse";
}

/* ── COPYRIGHT ── */
var copyYear = document.getElementById("copyYear");
if (copyYear) {
    copyYear.textContent = "Copyright \u00A9 " + new Date().getFullYear();
}

/* ── VIEW MORE / LESS ── */
var viewMore = document.getElementById("viewMore");
var viewLess = document.getElementById("viewLess");
var explore  = document.getElementById("exploreSection");
if (viewMore && viewLess && explore) {
    viewMore.onclick = function() {
        explore.style.display = "block";
        viewMore.style.display = "none";
        viewLess.style.display = "inline-block";
    };
    viewLess.onclick = function() {
        explore.style.display = "none";
        viewMore.style.display = "inline-block";
        viewLess.style.display = "none";
    };
}

/* ── MAP ── */
var mapContainer = document.getElementById("map");
if (mapContainer && typeof L !== "undefined") {
    var map = L.map("map").setView([40.4433, -79.9525], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    L.marker([40.4433, -79.9525]).addTo(map)
        .bindPopup("Carnegie Museum of Natural History").openPopup();
}

/* ── GENERATE TICKET DATES (next 4 Saturdays) ── */
var tableBody = document.getElementById("dateTableBody");
if (tableBody) {
    var dates = [];
    var d = new Date();
    while (dates.length < 4) {
        d.setDate(d.getDate() + 1);
        if (d.getDay() === 6) {
            dates.push(new Date(d));
        }
    }

    dates.forEach(function(dateObj) {
        var formatted = dateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        var row = document.createElement("tr");

        var tdDate   = document.createElement("td");
        var tdTime   = document.createElement("td");
        var tdAvail  = document.createElement("td");
        var tdAction = document.createElement("td");
        var badge    = document.createElement("span");
        var btn      = document.createElement("button");

        tdDate.textContent  = formatted;
        tdTime.textContent  = "10:00 AM - 5:00 PM";
        badge.className     = "availability-badge";
        badge.textContent   = "Available";
        btn.className       = "btn-ticket";
        btn.textContent     = "Select Date";

        btn.addEventListener("click", (function(f) {
            return function() { selectDate(f); };
        })(formatted));

        tdAvail.appendChild(badge);
        tdAction.appendChild(btn);
        row.appendChild(tdDate);
        row.appendChild(tdTime);
        row.appendChild(tdAvail);
        row.appendChild(tdAction);
        tableBody.appendChild(row);
    });
}

/* ── LIVE ORDER TOTAL UPDATE ── */
document.addEventListener("change", function(e) {
    if (e.target.name === "ticketType" || e.target.id === "quantityInput") {
        updateOrderTotal();
    }
});
document.addEventListener("input", function(e) {
    if (e.target.id === "quantityInput") {
        updateOrderTotal();
    }
});