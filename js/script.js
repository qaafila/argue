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
            feedback += `<p class="correct">✅ Your ${key} is correct!</p>`;
            score++;
        } else {
            feedback += `<p class="incorrect">❌ Your ${key} needs improvement. The expected answer was: "${expectedAnswers[key]}"</p>`;
        }
    }

    feedback += `<p>Your score: ${score}/4</p>`;
    if (score === 4) {
        feedback += "<p class="correct">Excellent job! You've correctly identified all components of the argument.</p>";
    } else {
        feedback += "<p>Keep practicing! Review the components you missed and try again.</p>";
    }

    document.getElementById('feedback').innerHTML = feedback;
}

// Expanded quiz for common errors
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
    },
    {
        question: "Either you're with us, or you're against us.",
        options: ["False Dichotomy", "Bandwagon Fallacy", "Appeal to Authority", "Post Hoc Ergo Propter Hoc"],
        correct: "False Dichotomy"
    },
    {
        question: "Everyone's talking about how great this new diet is, so it must work!",
        options: ["Appeal to Popularity", "Appeal to Nature", "False Cause", "Genetic Fallacy"],
        correct: "Appeal to Popularity"
    },
    {
        question: "If we don't act now, our entire economy will collapse!",
        options: ["Slippery Slope", "Appeal to Fear", "Hasty Generalization", "Circular Reasoning"],
        correct: "Appeal to Fear"
    },
    {
        question: "That scientific study can't be trusted because it was funded by a corporation.",
        options: ["Genetic Fallacy", "Appeal to Nature", "Tu Quoque", "No True Scotsman"],
        correct: "Genetic Fallacy"
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
    document.getElementById('quiz').innerHTML = output.join('');
}

function showResults() {
    const answerContainers = document.querySelectorAll('.answers');
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

    document.getElementById('results').innerHTML = `You got ${numCorrect} out of ${quizData.length} correct`;
}

// Initialize quiz when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('quiz')) {
        buildQuiz();
        document.getElementById('submit').addEventListener('click', showResults);
    }
});

// Function for essay structure exercise
function checkEssayStructure() {
    const correctOrder = [
        "introduction",
        "thesis",
        "body1",
        "body2",
        "body3",
        "conclusion"
    ];

    const userOrder = Array.from(document.querySelectorAll('#essay-structure .draggable'))
        .map(el => el.getAttribute('data-part'));

    let feedback = "";
    let score = 0;

    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] === correctOrder[i]) {
            feedback += `<p class="correct">✅ Correct: ${userOrder[i]} is in the right place.</p>`;
            score++;
        } else {
            feedback += `<p class="incorrect">❌ Incorrect: ${userOrder[i]} should be ${correctOrder[i]}.</p>`;
        }
    }

    feedback += `<p>Your score: ${score}/${correctOrder.length}</p>`;
    if (score === correctOrder.length) {
        feedback += "<p class="correct">Excellent job! You've arranged the essay structure correctly.</p>";
    } else {
        feedback += "<p>Keep practicing! Review the correct structure and try again.</p>";
    }

    document.getElementById('structure-feedback').innerHTML = feedback;
}

// Add drag and drop functionality
function addDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.drag-container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Initialize drag and drop when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.drag-container')) {
        addDragAndDrop();
        document.getElementById('check-structure').addEventListener('click', checkEssayStructure);
    }
});
