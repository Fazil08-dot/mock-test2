const questions = [
      const questions = [
            { question: "The dimensional formula for Planck's constant (h) is?", options: ["M L^2 T^-1", "M^2 L^2 T^-1", "M L^3 T^-1", "M^2 L^2 T^-2"], correctAnswer: 0 },
            { question: "What is the SI unit of the magnetic flux?", options: ["Weber", "Tesla", "Henry", "Volt-second"], correctAnswer: 0 },
            { question: "The dimensions of the universal gravitational constant (G) are?", options: ["M^-1 L^3 T^-2", "M L^2 T^-2", "M^2 L^-2 T^-2", "M L^3 T^-2"], correctAnswer: 0 },
            { question: "What is the dimensional formula for the coefficient of viscosity?", options: ["M L^-1 T^-1", "M L^-1 T^-2", "M L^-1 T^-3", "M L^2 T^-1"], correctAnswer: 0 },
            { question: "Which of the following has the same dimensional formula as velocity?", options: ["Force", "Momentum", "Acceleration", "Pressure"], correctAnswer: 2 },
            { question: "The SI unit of moment of inertia is?", options: ["kg m²", "kg m", "kg m³", "m²"], correctAnswer: 0 },
            { question: "What is the dimensional formula of pressure?", options: ["M L^-1 T^-2", "M L^-2 T^-2", "M L^-1 T^-1", "M^2 L T^-3"], correctAnswer: 1 },
            { question: "Which of the following physical quantities has no dimensions?", options: ["Refractive index", "Gravitational constant", "Surface tension", "Young's modulus"], correctAnswer: 0 },
            { question: "The dimension of the spring constant (k) in Hooke's law is?", options: ["M L T^-2", "M L^-1 T^-2", "M L^2 T^-2", "M L T^-1"], correctAnswer: 1 },
            { question: "The dimensional formula of the constant in Coulomb’s law (k) is?", options: ["M^-1 L^3 T^2", "M^2 L^-3 T^-2", "M L^-3 T^2", "M L^3 T^-2"], correctAnswer: 0 },
            { question: "The SI unit of dielectric constant is?", options: ["No unit", "Farad", "Coulomb", "Ampere"], correctAnswer: 0 },
            { question: "Which of the following physical quantities has dimensions of [M^1 L^3 T^-2]?", options: ["Work", "Power", "Gravitational potential energy", "Torque"], correctAnswer: 2 },
            { question: "What is the dimensional formula of permeability of free space (μ₀)?", options: ["M L T^-2 A^-2", "M L^2 T^-3 A^-2", "M L^3 T^-2 A^-2", "M L^2 T^-3 A^-1"], correctAnswer: 0 },
            { question: "The dimensional formula for the Planck's length is?", options: ["L", "M^1 L^2 T^-3", "M L^2 T^-2", "M^1 L^-1 T^0"], correctAnswer: 0 },
            { question: "The dimensions of energy density are?", options: ["M L^-1 T^-2", "M L^-2 T^-2", "M^2 L^-1 T^-2", "M L^-2 T^-1"], correctAnswer: 1 },
            { question: "What is the dimensional formula of the Stefan-Boltzmann constant?", options: ["M L^2 T^-3 K^-4", "M L^-1 T^-3 K^-2", "M L^3 T^-2 K^-4", "M L^-2 T^-3 K^-4"], correctAnswer: 0 },
            { question: "The SI unit of energy is Joules, but what is the dimension of 1 Joule?", options: ["M L^2 T^-2", "M^2 L T^-2", "M L^2 T^-3", "M L T^-2"], correctAnswer: 0 },
            { question: "The dimensional formula for magnetic field strength (H) is?", options: ["M T^-2 A^-1", "M L T^-2 A^-1", "M L^-2 T^-3 A", "M L T^-1 A^-1"], correctAnswer: 1 },
            { question: "The SI unit of gravitational potential energy is?", options: ["Joule", "Newton-meter", "Kilogram-meter", "Kilogram-metre²/s²"], correctAnswer: 0 },
            { question: "What is the dimension of acceleration due to gravity (g)?", options: ["M T^-2", "M L T^-2", "L T^-2", "M^2 L^-1 T^-2"], correctAnswer: 2 },
            { question: "The dimension of molar mass is?", options: ["M L^2 T^-1", "M T^-1", "M L^3 T^-1", "M L^3 T^-2"], correctAnswer: 0 },
            { question: "What is the SI unit of electric field strength?", options: ["Volt/meter", "Newton/Coulomb", "Tesla", "Coulomb/meter^2"], correctAnswer: 0 },
            { question: "Which of the following has no physical dimensions?", options: ["Angle", "Velocity", "Force", "Torque"], correctAnswer: 0 }
        ];
        
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timer;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit-btn");
    const timerElement = document.getElementById("time-left");
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");
    const correctElement = document.getElementById("correct");
    const incorrectElement = document.getElementById("incorrect");
    const progressElement = document.getElementById("progress");
    
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        optionsElement.innerHTML = currentQuestion.options
            .map((option, index) => `<button class="option" data-index="${index}">${option}</button>`)
            .join("");
        startTimer();
        updateProgress();
    }
    
    function startTimer() {
        timeLeft = 60;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitAnswer();
            }
        }, 1000);
    }
    
    function submitAnswer() {
        clearInterval(timer);
        const selectedOption = document.querySelector(".option.selected");
        if (selectedOption && selectedOption.dataset.index == questions[currentQuestionIndex].correctAnswer) {
            score++;
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        questionElement.style.display = "none";
        optionsElement.style.display = "none";
        submitButton.style.display = "none";
        resultElement.style.display = "block";
        scoreElement.innerText = score;
        correctElement.innerText = correctAnswers;
        incorrectElement.innerText = incorrectAnswers;
    }
    
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressElement.style.width = `${progress}%`;
    }
    
    optionsElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("option")) {
            document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));
            e.target.classList.add("selected");
            submitButton.disabled = false;
        }
    });
    
    submitButton.addEventListener("click", submitAnswer);
    
    document.getElementById("retry-btn").addEventListener("click", () => {
        location.reload();
    });
    
    loadQuestion();
    