// Estado global de la aplicación
let currentState = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    timeLeft: 60,
    timer: null,
    startTime: null,
    questionStartTime: null,
    questionTimes: []
};

// Elementos del DOM
const elements = {
    startScreen: document.getElementById('start-screen'),
    questionScreen: document.getElementById('question-screen'),
    resultsScreen: document.getElementById('results-screen'),
    reviewScreen: document.getElementById('review-screen'),
    loadingOverlay: document.getElementById('loading-overlay'),
    
    startBtn: document.getElementById('start-btn'),
    nextBtn: document.getElementById('next-btn'),
    restartBtn: document.getElementById('restart-btn'),
    reviewBtn: document.getElementById('review-btn'),
    backToResultsBtn: document.getElementById('back-to-results'),
    
    questionNumber: document.getElementById('question-number'),
    timer: document.getElementById('timer'),
    progress: document.getElementById('progress'),
    questionText: document.getElementById('question-text'),
    codeBlock: document.getElementById('code-block'),
    codeContent: document.getElementById('code-content'),
    options: document.getElementById('options'),
    
    finalScore: document.getElementById('final-score'),
    percentage: document.getElementById('percentage'),
    correctCount: document.getElementById('correct-count'),
    incorrectCount: document.getElementById('incorrect-count'),
    avgTime: document.getElementById('avg-time'),
    detailedFeedback: document.getElementById('detailed-feedback'),
    
    reviewContent: document.getElementById('review-content')
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Event listeners
    elements.startBtn.addEventListener('click', startQuiz);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.reviewBtn.addEventListener('click', showReview);
    elements.backToResultsBtn.addEventListener('click', showResults);

    // Mostrar pantalla inicial
    showScreen('start');
}

function showScreen(screenName) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function startQuiz() {
    // Inicializar estado
    currentState.questions = getRandomQuestions(10);
    currentState.currentQuestionIndex = 0;
    currentState.answers = [];
    currentState.startTime = Date.now();
    currentState.questionTimes = [];
    
    // Mostrar pantalla de pregunta
    showScreen('question');
    
    // Cargar primera pregunta
    loadQuestion();
}

function loadQuestion() {
    const question = currentState.questions[currentState.currentQuestionIndex];
    
    // Actualizar número de pregunta y progreso
    elements.questionNumber.textContent = `Pregunta ${currentState.currentQuestionIndex + 1} de 10`;
    elements.progress.style.width = `${((currentState.currentQuestionIndex + 1) / 10) * 100}%`;
    
    // Mostrar pregunta
    elements.questionText.textContent = question.question;
    
    // Mostrar código si existe
    if (question.code) {
        elements.codeBlock.style.display = 'block';
        elements.codeContent.textContent = question.code;
    } else {
        elements.codeBlock.style.display = 'none';
    }
    
    // Generar opciones
    generateOptions(question);
    
    // Reiniciar timer
    startTimer();
    
    // Deshabilitar botón siguiente
    elements.nextBtn.disabled = true;
    
    // Registrar tiempo de inicio de pregunta
    currentState.questionStartTime = Date.now();
}

function generateOptions(question) {
    elements.options.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => selectOption(index));
        
        elements.options.appendChild(optionElement);
    });
}

function selectOption(selectedIndex) {
    // Remover selección previa
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Seleccionar nueva opción
    const selectedOption = document.querySelector(`[data-index="${selectedIndex}"]`);
    selectedOption.classList.add('selected');
    
    // Habilitar botón siguiente
    elements.nextBtn.disabled = false;
    
    // Guardar respuesta
    const questionTime = Date.now() - currentState.questionStartTime;
    currentState.questionTimes.push(questionTime);
    
    currentState.answers[currentState.currentQuestionIndex] = {
        questionId: currentState.questions[currentState.currentQuestionIndex].id,
        selectedAnswer: selectedIndex,
        isCorrect: selectedIndex === currentState.questions[currentState.currentQuestionIndex].correct,
        timeSpent: questionTime
    };
}

function startTimer() {
    currentState.timeLeft = 60;
    updateTimerDisplay();
    
    // Limpiar timer existente
    if (currentState.timer) {
        clearInterval(currentState.timer);
    }
    
    currentState.timer = setInterval(() => {
        currentState.timeLeft--;
        updateTimerDisplay();
        
        if (currentState.timeLeft <= 0) {
            // Tiempo agotado, pasar a siguiente pregunta
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    elements.timer.textContent = `${currentState.timeLeft}s`;
    
    // Cambiar color según tiempo restante
    elements.timer.className = 'timer';
    if (currentState.timeLeft <= 10) {
        elements.timer.classList.add('danger');
    } else if (currentState.timeLeft <= 20) {
        elements.timer.classList.add('warning');
    }
}

function timeUp() {
    clearInterval(currentState.timer);
    
    // Si no se seleccionó respuesta, marcar como incorrecta
    if (!currentState.answers[currentState.currentQuestionIndex]) {
        const questionTime = Date.now() - currentState.questionStartTime;
        currentState.questionTimes.push(questionTime);
        
        currentState.answers[currentState.currentQuestionIndex] = {
            questionId: currentState.questions[currentState.currentQuestionIndex].id,
            selectedAnswer: -1, // Sin respuesta
            isCorrect: false,
            timeSpent: questionTime
        };
    }
    
    // Avanzar automáticamente
    nextQuestion();
}

function nextQuestion() {
    clearInterval(currentState.timer);
    
    currentState.currentQuestionIndex++;
    
    if (currentState.currentQuestionIndex < currentState.questions.length) {
        // Mostrar loading
        showLoading();
        
        // Simular tiempo de carga
        setTimeout(() => {
            hideLoading();
            loadQuestion();
        }, 800);
    } else {
        // Quiz completado
        finishQuiz();
    }
}

function showLoading() {
    elements.loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    elements.loadingOverlay.style.display = 'none';
}

function finishQuiz() {
    // Calcular resultados
    const results = calculateResults();
    
    // Mostrar resultados
    displayResults(results);
    
    // Mostrar pantalla de resultados
    showScreen('results');
}

function calculateResults() {
    const correctAnswers = currentState.answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = currentState.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const totalTime = currentState.questionTimes.reduce((sum, time) => sum + time, 0);
    const avgTime = Math.round(totalTime / totalQuestions / 1000); // en segundos
    
    return {
        score: correctAnswers,
        total: totalQuestions,
        percentage: percentage,
        correctCount: correctAnswers,
        incorrectCount: totalQuestions - correctAnswers,
        avgTime: avgTime,
        answers: currentState.answers
    };
}

function displayResults(results) {
    // Actualizar elementos de resultados
    elements.finalScore.textContent = results.score;
    elements.percentage.textContent = `${results.percentage}%`;
    elements.correctCount.textContent = results.correctCount;
    elements.incorrectCount.textContent = results.incorrectCount;
    elements.avgTime.textContent = `${results.avgTime}s`;
    
    // Generar retroalimentación detallada
    generateDetailedFeedback(results);
}

function generateDetailedFeedback(results) {
    elements.detailedFeedback.innerHTML = '';
    
    currentState.questions.forEach((question, index) => {
        const answer = results.answers[index];
        const feedbackItem = document.createElement('div');
        feedbackItem.className = `feedback-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const questionNumber = index + 1;
        const status = answer.isCorrect ? 'Correcta' : 'Incorrecta';
        const userAnswer = answer.selectedAnswer >= 0 ? question.options[answer.selectedAnswer] : 'Sin respuesta';
        const correctAnswer = question.options[question.correct];
        
        feedbackItem.innerHTML = `
            <h4>Pregunta ${questionNumber}: ${status}</h4>
            <p><strong>Tu respuesta:</strong> ${userAnswer}</p>
            ${!answer.isCorrect ? `<p><strong>Respuesta correcta:</strong> ${correctAnswer}</p>` : ''}
            <p>${question.explanation}</p>
            <div class="reference">${question.reference}</div>
        `;
        
        elements.detailedFeedback.appendChild(feedbackItem);
    });
}

function showReview() {
    generateReviewContent();
    showScreen('review');
}

function generateReviewContent() {
    elements.reviewContent.innerHTML = '';
    
    currentState.questions.forEach((question, index) => {
        const answer = currentState.answers[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const questionNumber = index + 1;
        
        let optionsHTML = '';
        question.options.forEach((option, optIndex) => {
            let className = 'option-review';
            
            if (optIndex === answer.selectedAnswer) {
                className += ' user-answer';
            }
            
            if (optIndex === question.correct) {
                className += ' correct-answer';
            } else if (optIndex === answer.selectedAnswer && !answer.isCorrect) {
                className += ' incorrect-answer';
            }
            
            optionsHTML += `<div class="${className}">${option}</div>`;
        });
        
        reviewItem.innerHTML = `
            <h3>Pregunta ${questionNumber}</h3>
            <div class="question">${question.question}</div>
            ${question.code ? `<div class="code-block"><pre><code>${question.code}</code></pre></div>` : ''}
            <div class="options-review">
                ${optionsHTML}
            </div>
            <div class="explanation">
                <strong>Explicación:</strong> ${question.explanation}
                <br><small>${question.reference}</small>
            </div>
        `;
        
        elements.reviewContent.appendChild(reviewItem);
    });
}

function showResults() {
    showScreen('results');
}

function restartQuiz() {
    // Reiniciar estado
    currentState = {
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        timeLeft: 60,
        timer: null,
        startTime: null,
        questionStartTime: null,
        questionTimes: []
    };
    
    // Limpiar timer
    if (currentState.timer) {
        clearInterval(currentState.timer);
    }
    
    // Volver a pantalla inicial
    showScreen('start');
}

// Prevenir recarga accidental durante el quiz
window.addEventListener('beforeunload', function(e) {
    if (currentState.questions.length > 0 && currentState.currentQuestionIndex < currentState.questions.length) {
        e.preventDefault();
        e.returnValue = '';
    }
});
