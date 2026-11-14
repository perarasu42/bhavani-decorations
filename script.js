// IMPORTANT: Replace this with the business's correct WhatsApp number.
    // Use country code + number, digits only. Example for India: 917418952773
    const WHATSAPP_NUMBER = "917418952773";

    document.getElementById("year").textContent = new Date().getFullYear();

    document.querySelectorAll(".event-link").forEach(link => {
      link.addEventListener("click", () => {
        const eventName = link.getAttribute("data-event");
        document.getElementById("eventType").value = eventName;
      });
    });

    const dateInput = document.getElementById("eventDate");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localToday;

    document.getElementById("bookingForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;

      if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
        document.getElementById("formMessage").textContent = "Please update the WhatsApp business number in the website script.";
        return;
      }

      const data = new FormData(form);
      const message = [
        "Hello Bhavani Decorations! I would like to enquire about an event booking.",
        "",
        "Name: " + data.get("customerName"),
        "Phone: " + data.get("phone"),
        "Event: " + data.get("eventType"),
        "Event date: " + data.get("eventDate"),
        "Location: " + data.get("location"),
        "Decoration requirements: " + (data.get("requirements") || "Not specified")
      ].join("\n");

      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
