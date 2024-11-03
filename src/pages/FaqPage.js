class FaqPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #fff; /* Changed to match CorporatePage */
            background-color: #1e1e1e; /* Set background to black */
          }
  
          h2 {
            color: #fff; /* Change heading color to white */
            font-size: 2rem;
            margin: 0 0 20px;
            text-align: center;
          }
  
          .question {
            cursor: pointer;
            padding: 15px;
            margin: 10px 0;
            background-color: #1e1e1e; /* Blue background for questions */
            color: #fff;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
  
          .question:hover {
            background-color: #333; /* Darker blue on hover */
          }
  
          .answer {
            display: none;
            padding: 15px;
            margin: 10px 0;
            background-color: #333; /* Dark background for answers */
            border-radius: 5px;
            border-left: 5px solid #007BFF; /* Blue left border for answers */
            color: #ccc; /* Lighter text for answers */
          }

          .question.open .answer {
            display: block;
          }
        </style>
  
        <div class="page-content">
          <h2>Frequently Asked Questions</h2>
          <div class="faq">
            <div class="question">
              <h4>1. What are your cinema’s opening hours?</h4>
              <div class="answer">
                <p>Our cinema is open from 10 AM to 11 PM every day.</p>
              </div>
            </div>
            <div class="question">
              <h4>2. Do you offer discounts for students?</h4>
              <div class="answer">
                <p>Yes, we offer a 10% discount for students with valid ID on all tickets.</p>
              </div>
            </div>
            <div class="question">
              <h4>3. Can I purchase tickets online?</h4>
              <div class="answer">
                <p>Absolutely! Tickets can be purchased online through our website or app.</p>
              </div>
            </div>
            <div class="question">
              <h4>4. Are there any age restrictions for movies?</h4>
              <div class="answer">
                <p>Yes, some films have age restrictions. Please check the movie rating before purchasing tickets.</p>
              </div>
            </div>
            <div class="question">
              <h4>5. Is food and drink allowed in the cinema?</h4>
              <div class="answer">
                <p>Yes, you can bring snacks and drinks, but please be considerate of others.</p>
              </div>
            </div>
            <div class="question">
              <h4>6. What should I do if I lose my ticket?</h4>
              <div class="answer">
                <p>Please visit our customer service desk, and we will assist you in retrieving your ticket.</p>
              </div>
            </div>
            <div class="question">
              <h4>7. Are there special screenings for kids?</h4>
              <div class="answer">
                <p>Yes, we host special screenings for kids every Saturday morning.</p>
              </div>
            </div>
            <div class="question">
              <h4>8. Do you have wheelchair accessible seating?</h4>
              <div class="answer">
                <p>Yes, our cinema is fully accessible for guests with disabilities.</p>
              </div>
            </div>
            <div class="question">
              <h4>9. Can I reserve seats in advance?</h4>
              <div class="answer">
                <p>Yes, you can reserve your seats when purchasing tickets online.</p>
              </div>
            </div>
            <div class="question">
              <h4>10. How can I contact customer service?</h4>
              <div class="answer">
                <p>You can reach our customer service via phone, email, or through the contact form on our website.</p>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll(".question").forEach((question) => {
      question.addEventListener("click", () => {
        // Close any currently open answers
        this.shadowRoot.querySelectorAll(".question").forEach((q) => {
          if (q !== question) {
            q.classList.remove("open");
            q.querySelector(".answer").style.display = "none";
          }
        });

        // Toggle the clicked question's answer
        const answer = question.querySelector(".answer");
        if (question.classList.contains("open")) {
          question.classList.remove("open");
          answer.style.display = "none";
        } else {
          question.classList.add("open");
          answer.style.display = "block";
        }
      });
    });
  }
}

customElements.define("faq-page", FaqPage);
