// Function for the fundamentals exercise
function checkAnswers() {
    const answers = {
        claim: document.getElementById('claim').value.toLowerCase(),
        evidence: document.getElementById('evidence').value.toLowerCase(),
        reasoning: document.getElementById('reasoning').value.toLowerCase(),
        link: document.getElementById('link').value.toLowerCase()
    };

    const expectedAnswers = {
        claim: "we should implement a four-day work week",
        evidence: "studies have shown that it increases productivity and employee satisfaction",
        reasoning: "this could lead to happier, more efficient workplaces",
        link: "improve work-life balance for millions"
    };

    let feedback = "";
    let score = 0;

    for (let key in expectedAnswers) {
        if (answers[key].includes(expectedAnswers[key])) {
            feedback += `<p>✅ Your ${key} is correct!</p>`;
            score++;
        } else {
            feedback += `<p>❌ Your ${key} needs improvement. The expected answer was: "${expectedAnswers[key]}"</p>`;
        }
    }

    feedback += `<p>Your score: ${score}/4</p>`;
    if (score === 4) {
        feedback += "<p>Excellent job! You've correctly identified all components of the argument.</p>";
    } else {
        feedback += "<p>Keep practicing! Review the components you missed and try again.</p>";
    }

    document.getElementById('feedback').innerHTML = feedback;
}

// Function for the common errors quiz
document.addEventListener('DOMContentLoaded', (event) => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    if (quizContainer && resultsContainer && submitButton) {
        const quizData = [
            {
                question: "If we allow same-sex marriage, next people will want to marry their pets!",
                options: ["Ad Hominem", "Straw Man", "False Dichotomy", "Slippery Slope"],
                correct: "Slippery Slope"
            },
            {
                question: "I've been smoking for 30 years and I'm fine, so smoking can't be that bad for you.",
                options: ["Confirmation Bias", "Availability Heuristic", "Anecdotal Evidence", "Dunning-Kruger Effect"],
                correct: "Anecdotal Evidence"
            },
            {
                question: "You're just arguing against climate change because you work in the oil industry.",
                options: ["Ad Hominem", "Straw Man", "False Dichotomy", "Red Herring"],
                correct: "Ad Hominem"
            }
        ];

        function buildQuiz() {
            const output = [];
            quizData.forEach((questionData, index) => {
                const answers = [];
                for (let i = 0; i < questionData.options.length; i++) {
                    answers.push(
                        `<label>
                            <input type="radio" name="question${index}" value="${questionData.options[i]}">
                            ${questionData.options[i]}
                        </label>`
                    );
                }
                output.push(
                    `<div class="question">
                        <p>${questionData.question}</p>
                        <div class="answers">${answers.join('')}</div>
                    </div>`
                );
            });
            quizContainer.innerHTML = output.join('');
        }

        function showResults() {
            const answerContainers = quizContainer.querySelectorAll('.answers');
            let numCorrect = 0;

            quizData.forEach((questionData, index) => {
                const answerContainer = answerContainers[index];
                const selector = `input[name=question${index}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                if (userAnswer === questionData.correct) {
                    numCorrect++;
                    answerContainers[index].style.color = 'green';
                } else {
                    answerContainers[index].style.color = 'red';
                }
            });

            resultsContainer.innerHTML = `${numCorrect} out of ${quizData.length} correct`;
        }

        buildQuiz();
        submitButton.addEventListener('click', showResults);
    }
});

// Add more functions for other interactive elements as needed
