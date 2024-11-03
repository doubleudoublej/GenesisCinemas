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
            color: #333;
            background-color: #f5f5f5;
          }
  
          h2 {
            color: #333;
            font-size: 2rem;
            margin: 0 0 10px;
            text-align: center;
          }
  
          .category {
            margin: 20px 0;
          }
  
          .question {
            cursor: pointer;
            padding: 15px;
            margin: 10px 0;
            background-color: #007BFF;
            color: #fff;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
  
          .question:hover {
            background-color: #0056b3;
          }
  
          .answer {
            display: none;
            padding: 15px;
            margin: 10px 0;
            background-color: #eee;
            border-radius: 5px;
            border-left: 5px solid #007BFF;
          }

          .question.open .answer {
            display: block;
          }

        </style>
  
        <div class="page-content">
          <h2>FAQ Page</h2>
          <div class="faq">
            <div class="category">
              <h3>Category 1</h3>
              <div class="question">
                <h4>Question 1.1</h4>
                <div class="answer">
                  <p>Answer to question 1.1.</p>
                </div>
              </div>
              <div class="question">
                <h4>Question 1.2</h4>
                <div class="answer">
                  <p>Answer to question 1.2.</p>
                </div>
              </div>
            </div>
            <div class="category">
              <h3>Category 2</h3>
              <div class="question">
                <h4>Question 2.1</h4>
                <div class="answer">
                  <p>Answer to question 2.1.</p>
                </div>
              </div>
              <div class="question">
                <h4>Question 2.2</h4>
                <div class="answer">
                  <p>Answer to question 2.2.</p>
                </div>
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
