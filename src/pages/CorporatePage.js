class CorporatePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          /* Basic page styling */
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f5f5f5;
          }
  
          h2 {
            color: #333;
            font-size: 2rem;
            margin: 0 0 10px;
          }
  
          p {
            color: #555;
            font-size: 1rem;
            line-height: 1.5;
          }
  
          input, textarea, button {
            display: block;
            margin: 10px 0;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
          }

          button {
            background-color: #1e1e1e;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
  
          button:hover {
            background-color: #333;
          }
  
          .error {
            color: red;
            font-size: 0.9rem;
          }
        </style>
  
        <div class="page-content">
          <h2>Corporate Inquiry</h2>
          <p>Please fill out the form below for any corporate inquiries, and we'll get back to you as soon as possible.</p>
          <form id="corporate-form">
            <input type="text" id="name" name="name" placeholder="Your Name" required>
            <input type="email" id="email" name="email" placeholder="Your Email" required>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            
            <h3>Movie Booking Details</h3>
            <input type="text" id="movie-title" name="movie-title" placeholder="Movie Title" required>
            <input type="date" id="event-date" name="event-date" required>
            <input type="text" id="event-name" name="event-name" placeholder="Event Name (Optional)">
            <input type="number" id="number-of-pax" name="number-of-pax" placeholder="Number of Pax" required>
            <input type="time" id="preferred-time" name="preferred-time" required>
            
            <button type="submit">Submit</button>
            <div id="error-message" class="error"></div>
          </form>
        </div>
      `;

    this.shadowRoot
      .querySelector("#corporate-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.validateForm();
      });
  }

  validateForm() {
    const name = this.shadowRoot.querySelector("#name").value.trim();
    const email = this.shadowRoot.querySelector("#email").value.trim();
    const message = this.shadowRoot.querySelector("#message").value.trim();
    const eventDate = new Date(
      this.shadowRoot.querySelector("#event-date").value
    );
    const today = new Date();
    const errorMessageElement = this.shadowRoot.querySelector("#error-message");

    let errorMessage = "";

    // Check if all fields are filled
    if (!name || !email || !message || !eventDate) {
      errorMessage = "Please fill out all required fields.";
    }
    // Check if email format is valid
    else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorMessage = "Please enter a valid email address.";
    }
    // Check if the event date is not today or in the past
    else if (eventDate <= today) {
      errorMessage = "Event date must be in the future.";
    }

    if (errorMessage) {
      errorMessageElement.textContent = errorMessage;
    } else {
      errorMessageElement.textContent = "";
      // Submit the form data using fetch or your desired method
      this.submitForm();
    }
  }

  submitForm() {
    // Collect form data and send it to the server
    const formData = new FormData(
      this.shadowRoot.querySelector("#corporate-form")
    );
    fetch("form_submit.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Display the server response
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error submitting your form. Please try again later."
        );
      });
  }
}

customElements.define("corporate-page", CorporatePage);
