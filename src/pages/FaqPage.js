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
          }
  
          .category {
            margin: 20px 0;
          }
  
          .question {
            cursor: pointer;
            padding: 10px;
            margin: 10px 0;
            background-color: #ddd;
            border-radius: 5px;
          }
  
          .answer {
            display: none;
            padding: 10px;
            margin: 10px 0;
            background-color: #eee;
            border-radius: 5px;
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
        this.shadowRoot.querySelectorAll(".answer").forEach((answer) => {
          answer.style.display = "none";
        });

        // Open the clicked question's answer
        const answer = question.querySelector(".answer");
        answer.style.display = "block";
      });
    });
  }
}

customElements.define("faq-page", FaqPage);
