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
            text-align: center;
          }

          h1 {
            color: #333;
            font-size: 3rem;
            margin: 0 0 10px;
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

          form {
            border: 2px solid #333; /* Encapsulated in a bolded line */
            padding: 20px; /* Add padding inside the border */
            margin: 0 auto; /* Center the form */
            text-align: left; /* Align text to left within form */
            width: 600px; /* Set a specific width */
            box-sizing: border-box; /* Ensure padding and border are included in the width */
          }

        </style>
  
          <div class="page-content">
            <h1><strong><u>Corporate Inquiry</u></strong></h1>
              <p>Please fill out the form below for any corporate inquiries, and we'll get back to you as soon as possible.</p>
                <div class = "form">
                  <form id="corporate-form">
                    <h2><strong>Personal Details</strong></h2>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" placeholder="Your Message" required></textarea>

                    <h2><strong>Movie Booking Details</strong></h2>
                    <label for="movie-title">Movie Title:</label>
                    <input type="text" id="movie-title" name="movie-title" placeholder="Movie Title" required>
                    <label for="event-date">Event Date:</label>
                    <input type="date" id="event-date" name="event-date" required>
                    <label for="event-name">Event Name (Optional):</label>
                    <input type="text" id="event-name" name="event-name" placeholder="Event Name (Optional)">
                    <label for="number-of-pax">Number of Pax:</label>
                    <input type="number" id="number-of-pax" name="number-of-pax" placeholder="Number of Pax" required>
                    <label for="preferred-time">Preferred Time:</label>
                    <input type="time" id="preferred-time" name="preferred-time" required>
                    <button type="submit">Submit</button>
                    <div id="error-message" class="error"></div>
                  </form>
                </div>
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
    const eventDateInput = this.shadowRoot.querySelector("#event-date").value;
    const eventDate = eventDateInput ? new Date(eventDateInput) : null;
    const numberOfPax = parseInt(
      this.shadowRoot.querySelector("#number-of-pax").value,
      10
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to compare dates correctly

    let errorMessages = [];

    // Check if all fields are filled
    if (!name) {
      errorMessages.push("Name is required.");
    }
    if (!email) {
      errorMessages.push("Email is required.");
    }
    if (!message) {
      errorMessages.push("Message is required.");
    }
    if (!eventDateInput) {
      errorMessages.push("Event date is required.");
    } else if (eventDate <= today) {
      // Check if the event date is not today or in the past
      errorMessages.push("Event date must be in the future.");
    }

    // Check if the number of pax is valid (aka >0)
    if (numberOfPax <= 9) {
      errorMessages.push("Number of Pax cannot be less than 10.");
    }

    // Check if email format is valid
    if (email && !/^\S+@[a-zA-Z]{3,}(\.[a-zA-Z]{2,}){1,2}$/.test(email)) {
      errorMessages.push("Please enter a valid email address.");
    }

    if (errorMessages.length > 0) {
      this.showPopup(errorMessages.join("\n"));
    } else {
      this.submitForm();
    }
  }

  showPopup(message) {
    // Create the popup container
    const popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.backgroundColor = "white";
    popupContainer.style.padding = "20px";
    popupContainer.style.border = "2px solid #333";
    popupContainer.style.zIndex = "1000";
    popupContainer.style.textAlign = "center";

    // Create the message element
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.style.whiteSpace = "pre-line"; // To handle newlines correctly

    // Custom styling for the error message
    messageElement.style.color = "red"; // Change the text color
    messageElement.style.fontSize = "20px"; // Change the font size
    messageElement.style.fontWeight = "bold"; // Optional: Make the text bold

    // Create the OK button
    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.marginTop = "10px";
    okButton.addEventListener("click", () => {
      popupContainer.remove(); // Remove the popup when OK is clicked
    });

    popupContainer.appendChild(messageElement);
    popupContainer.appendChild(okButton);
    this.shadowRoot.appendChild(popupContainer); // Append the popup to the shadow DOM
  }

  submitForm() {
    // Collect form data and send it to the server
    const formData = new FormData(
      this.shadowRoot.querySelector("#corporate-form")
    );
    fetch("./src/services/form_submit.php", {
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
