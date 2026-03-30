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
$(document).ready(function(){

    // ── VIEW MORE BUTTON ──
    var viewMore = $("#viewMore");
    var viewLess = $("#viewLess");
    var explore  = $("#exploreSection");

    if (viewMore.length && viewLess.length && explore.length) {
        viewMore.click(function(){
            explore.slideDown();
            viewMore.hide();
            viewLess.show();
        });

        viewLess.click(function(){
            explore.slideUp();
            viewMore.show();
            viewLess.hide();
        });
    }

    // ── ACCORDION ──
    $(".panel").hide();

    $(".accordion").click(function(){
        $(".panel").not($(this).next()).slideUp();
        $(this).next().slideToggle();
    });

    // ── MAP ──
    if ($("#map").length && typeof L !== "undefined") {

        console.log("MAP IS INITIALIZING"); // debug

        var map = L.map("map").setView([40.4433, -79.9525], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        L.marker([40.4433, -79.9525])
            .addTo(map)
            .bindPopup("Carnegie Museum of Natural History")
            .openPopup();
    }

});
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

/* ── IMAGE GALLERY ── */
var galleryImg     = document.getElementById("galleryImg");
var galleryCaption = document.getElementById("galleryCaption");
var prevBtn        = document.getElementById("prevBtn");
var nextBtn        = document.getElementById("nextBtn");

if (galleryImg) {
    // Add your own images to the static folder and list them here
    var images = [
        { src: "../views/images/ DigitalDreams.png",  caption: "Exhibition 1: Digital Dreams explores art + AI + immersive design" },
        { src: "../views/images/TechArtFestival.jpg",  caption: "Exhibition 2: TechArt Festival explores robotics, AR, and interactive installations." },
        { src: "../views/images/ex3.jpeg",  caption: "Exhibiton 3: Visual Visions Fully immersive VR storytelling experiences" }
    ];

    var current = 0;

    function showImage(index) {
        galleryImg.style.opacity = "0";
        setTimeout(function() {
            galleryImg.src = images[index].src;
            galleryImg.alt = images[index].caption;
            galleryCaption.textContent = images[index].caption;
            galleryImg.style.opacity = "1";
        }, 200);
    }

    showImage(current);

    prevBtn.addEventListener("click", function() {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    nextBtn.addEventListener("click", function() {
        current = (current + 1) % images.length;
        showImage(current);
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