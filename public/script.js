// Global state
let currentUser = null;
let currentTool = null;
let flashcards = [];
let currentCardIndex = 0;
let sessionScore = 0;
let correctAnswers = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeEventListeners();
    handleToolNavigation();
});

// Authentication functions
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/user-status');
        const data = await response.json();
        
        if (data.email) {
            currentUser = data;
            updateAuthUI(true);
            updateUsageInfo();
        } else {
            updateAuthUI(false);
        }
    } catch (error) {
        updateAuthUI(false);
    }
}

function updateAuthUI(isLoggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenu = document.getElementById('userMenu');
    const userEmail = document.getElementById('userEmail');

    if (isLoggedIn && currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (signupBtn) signupBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');
        if (userEmail) userEmail.textContent = currentUser.email;
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (signupBtn) signupBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

function updateUsageInfo() {
    const usageInfo = document.getElementById('usageInfo');
    const requestsRemaining = document.getElementById('requestsRemaining');
    
    if (usageInfo && requestsRemaining && currentUser) {
        if (currentUser.isSubscribed) {
            requestsRemaining.textContent = 'Premium: Unlimited requests';
        } else {
            requestsRemaining.textContent = `Free: ${currentUser.requestsRemaining} requests remaining`;
        }
        usageInfo.classList.remove('hidden');
    }
}

// Event listeners
function initializeEventListeners() {
    // Navigation buttons
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const premiumBtn = document.getElementById('premiumBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '/login.html';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = '/signup.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    if (premiumBtn) {
        premiumBtn.addEventListener('click', () => {
            window.location.href = '/premium.html';
        });
    }

    // Tool boxes
    const toolBoxes = document.querySelectorAll('.tool-box');
    toolBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const tool = box.getAttribute('data-tool');
            if (tool) {
                navigateToTool(tool);
            }
        });
    });

    // Auth forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Flashcard forms
    const flashcardForm = document.getElementById('flashcardForm');
    const quizForm = document.getElementById('quizForm');
    const loadFlashcards = document.getElementById('loadFlashcards');
    const startSession = document.getElementById('startSession');

    if (flashcardForm) {
        flashcardForm.addEventListener('submit', handleFlashcardGeneration);
    }

    if (quizForm) {
        quizForm.addEventListener('submit', handleQuizGeneration);
    }

    if (loadFlashcards) {
        loadFlashcards.addEventListener('click', loadUserFlashcards);
    }

    if (startSession) {
        startSession.addEventListener('click', startStudySession);
    }

    // Study session controls
    const revealAnswer = document.getElementById('revealAnswer');
    const nextCard = document.getElementById('nextCard');
    const markCorrect = document.getElementById('markCorrect');
    const markIncorrect = document.getElementById('markIncorrect');

    if (revealAnswer) {
        revealAnswer.addEventListener('click', () => {
            document.getElementById('cardAnswer').classList.remove('hidden');
            revealAnswer.classList.add('hidden');
            document.getElementById('markCorrect').classList.remove('hidden');
            document.getElementById('markIncorrect').classList.remove('hidden');
        });
    }

    if (markCorrect) {
        markCorrect.addEventListener('click', () => {
            correctAnswers++;
            nextCardInSession();
        });
    }

    if (markIncorrect) {
        markIncorrect.addEventListener('click', () => {
            nextCardInSession();
        });
    }

    if (nextCard) {
        nextCard.addEventListener('click', nextCardInSession);
    }

    // Premium plan buttons
    const planButtons = document.querySelectorAll('[data-plan]');
    planButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.getAttribute('data-plan');
            initiatePremiumPayment(plan);
        });
    });

    // Modal close
    const modal = document.getElementById('upgradeModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}

// Tool navigation
function handleToolNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const tool = urlParams.get('tool');
    
    if (tool) {
        showTool(tool);
    }
}

function navigateToTool(tool) {
    if (!currentUser) {
        window.location.href = '/login.html';
        return;
    }
    
    window.location.href = `/flashcards.html?tool=${tool}`;
}

function showTool(tool) {
    // Hide all tool sections
    const toolSections = document.querySelectorAll('.tool-section');
    toolSections.forEach(section => section.classList.add('hidden'));
    
    // Show selected tool
    const selectedTool = document.getElementById(tool);
    if (selectedTool) {
        selectedTool.classList.remove('hidden');
        currentTool = tool;
        
        // Update title
        const toolTitle = document.getElementById('toolTitle');
        if (toolTitle) {
            const titles = {
                'flashcard-generator': 'Flashcard Generator',
                'quiz-generator': 'Quiz Generator',
                'my-flashcards': 'My Flashcards',
                'study-session': 'Study Session'
            };
            toolTitle.textContent = titles[tool] || 'Flashcard Tools';
        }
    }
}

// Authentication handlers
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = '/';
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Login failed. Please try again.');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = '/';
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Signup failed. Please try again.');
    }
}

async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        currentUser = null;
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// Flashcard handlers
async function handleFlashcardGeneration(e) {
    e.preventDefault();
    
    const notes = document.getElementById('notes').value;
    const deckName = document.getElementById('deckName').value;
    const resultsDiv = document.getElementById('flashcardResults');
    
    if (!notes.trim()) {
        showError('Please enter study notes');
        return;
    }
    
    try {
        setLoading(e.target, true);
        
        const response = await fetch('/api/generate-flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notes, deckName })
        });
        
        const data = await response.json();
        
        if (data.requiresUpgrade) {
            showUpgradeModal();
            return;
        }
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        displayFlashcards(data.flashcards, resultsDiv);
        await checkAuthStatus(); // Update usage info
        
    } catch (error) {
        showError('Failed to generate flashcards. Please try again.');
    } finally {
        setLoading(e.target, false);
    }
}

async function handleQuizGeneration(e) {
    e.preventDefault();
    
    const notes = document.getElementById('quizNotes').value;
    const resultsDiv = document.getElementById('quizResults');
    
    if (!notes.trim()) {
        showError('Please enter study material');
        return;
    }
    
    try {
        setLoading(e.target, true);
        
        const response = await fetch('/api/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notes })
        });
        
        const data = await response.json();
        
        if (data.requiresUpgrade) {
            showUpgradeModal();
            return;
        }
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        displayQuiz(data.quiz, resultsDiv);
        await checkAuthStatus(); // Update usage info
        
    } catch (error) {
        showError('Failed to generate quiz. Please try again.');
    } finally {
        setLoading(e.target, false);
    }
}

async function loadUserFlashcards() {
    try {
        const response = await fetch('/api/get-flashcards');
        const data = await response.json();
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        displaySavedFlashcards(data.flashcards);
        
    } catch (error) {
        showError('Failed to load flashcards. Please try again.');
    }
}

async function deleteFlashcard(id) {
    try {
        const response = await fetch('/api/delete-flashcard', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        
        const data = await response.json();
        
        if (data.success) {
            loadUserFlashcards(); // Reload flashcards
        } else {
            showError('Failed to delete flashcard');
        }
        
    } catch (error) {
        showError('Failed to delete flashcard. Please try again.');
    }
}

// Study session functions
function startStudySession() {
    if (flashcards.length === 0) {
        showError('No flashcards available. Generate some flashcards first!');
        return;
    }
    
    currentCardIndex = 0;
    correctAnswers = 0;
    sessionScore = 0;
    
    document.getElementById('sessionStats').classList.remove('hidden');
    document.getElementById('studyCard').classList.remove('hidden');
    
    updateSessionStats();
    showCurrentCard();
}

function showCurrentCard() {
    if (currentCardIndex >= flashcards.length) {
        endStudySession();
        return;
    }
    
    const card = flashcards[currentCardIndex];
    document.getElementById('cardQuestion').textContent = card.question;
    document.getElementById('cardAnswer').textContent = card.answer;
    
    // Reset card state
    document.getElementById('cardAnswer').classList.add('hidden');
    document.getElementById('revealAnswer').classList.remove('hidden');
    document.getElementById('markCorrect').classList.add('hidden');
    document.getElementById('markIncorrect').classList.add('hidden');
    document.getElementById('nextCard').classList.add('hidden');
}

function nextCardInSession() {
    currentCardIndex++;
    updateSessionStats();
    showCurrentCard();
}

function updateSessionStats() {
    document.getElementById('currentCard').textContent = currentCardIndex + 1;
    document.getElementById('totalCards').textContent = flashcards.length;
    
    if (flashcards.length > 0) {
        sessionScore = Math.round((correctAnswers / Math.max(currentCardIndex, 1)) * 100);
        document.getElementById('score').textContent = sessionScore;
    }
}

function endStudySession() {
    const finalScore = Math.round((correctAnswers / flashcards.length) * 100);
    showSuccess(`Study session completed! Final score: ${finalScore}% (${correctAnswers}/${flashcards.length})`);
    
    document.getElementById('studyCard').classList.add('hidden');
    document.getElementById('sessionStats').classList.add('hidden');
}

// Display functions
function displayFlashcards(flashcardData, container) {
    flashcards = flashcardData; // Store for study session
    
    container.innerHTML = `
        <h3>Generated Flashcards</h3>
        <div class="flashcard-deck">
            ${flashcardData.map((card, index) => `
                <div class="flashcard" data-index="${index}">
                    <div class="flashcard-inner">
                        <div class="flashcard-front">
                            <div class="card-label">Question</div>
                            <div class="card-text">${card.question}</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="card-label">Answer</div>
                            <div class="card-text">${card.answer}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="flashcard-actions">
            <button onclick="startStudySession()" class="action-btn">Start Study Session</button>
        </div>
    `;
    container.classList.remove('hidden');
    
    // Add hover effects to flashcards
    addFlashcardInteractivity();
}

function displaySavedFlashcards(flashcardData) {
    flashcards = flashcardData; // Store for study session
    const container = document.getElementById('savedFlashcards');
    
    if (flashcardData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No flashcards yet</h3>
                <p>Generate your first set of flashcards to get started!</p>
                <button onclick="navigateToTool('flashcard-generator')" class="action-btn">Generate Flashcards</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <h3>Your Flashcards (${flashcardData.length} cards)</h3>
            <div class="flashcard-deck">
                ${flashcardData.map((card, index) => `
                    <div class="flashcard" data-index="${index}">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <div class="card-label">Question</div>
                                <div class="card-text">${card.question}</div>
                                <button class="delete-btn" onclick="deleteFlashcard(${card.id})">×</button>
                            </div>
                            <div class="flashcard-back">
                                <div class="card-label">Answer</div>
                                <div class="card-text">${card.answer}</div>
                                <button class="delete-btn" onclick="deleteFlashcard(${card.id})">×</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="flashcard-actions">
                <button onclick="startStudySession()" class="action-btn">Start Study Session</button>
            </div>
        `;
    }
    
    container.classList.remove('hidden');
    addFlashcardInteractivity();
}

function displayQuiz(quizData, container) {
    let currentQuestion = 0;
    let quizScore = 0;
    
    function showQuestion() {
        const question = quizData[currentQuestion];
        container.innerHTML = `
            <h3>Quiz Question ${currentQuestion + 1}/${quizData.length}</h3>
            <div class="quiz-question">
                <h4>${question.question}</h4>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">${String.fromCharCode(65 + index)}. ${option}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback hidden" id="quizFeedback"></div>
                <button id="nextQuestion" class="action-btn hidden">Next Question</button>
            </div>
        `;
        
        // Add option click handlers
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedIndex = parseInt(e.target.getAttribute('data-index'));
                const isCorrect = selectedIndex === question.correct;
                
                if (isCorrect) {
                    quizScore++;
                    e.target.classList.add('correct');
                } else {
                    e.target.classList.add('incorrect');
                    options[question.correct].classList.add('correct');
                }
                
                options.forEach(opt => opt.disabled = true);
                
                const feedback = document.getElementById('quizFeedback');
                feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect. The correct answer is highlighted.';
                feedback.classList.remove('hidden');
                
                if (currentQuestion < quizData.length - 1) {
                    document.getElementById('nextQuestion').classList.remove('hidden');
                } else {
                    setTimeout(() => {
                        showQuizResults();
                    }, 2000);
                }
            });
        });
        
        const nextBtn = document.getElementById('nextQuestion');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentQuestion++;
                showQuestion();
            });
        }
    }
    
    function showQuizResults() {
        const percentage = Math.round((quizScore / quizData.length) * 100);
        container.innerHTML = `
            <h3>Quiz Complete!</h3>
            <div class="quiz-results">
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                    </div>
                    <p>You scored ${quizScore} out of ${quizData.length} questions correctly!</p>
                </div>
                <div class="quiz-actions">
                    <button onclick="handleQuizGeneration(event)" class="action-btn">Retake Quiz</button>
                    <button onclick="navigateToTool('flashcard-generator')" class="action-btn secondary">Generate More Flashcards</button>
                </div>
            </div>
        `;
    }
    
    container.classList.remove('hidden');
    showQuestion();
}

function addFlashcardInteractivity() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Payment functions
async function initiatePremiumPayment(plan) {
    if (!currentUser) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        const response = await fetch('/api/initiate-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscriptionType: plan })
        });
        
        const data = await response.json();
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        // Initialize Paystack payment
        const handler = PaystackPop.setup({
            key: data.publicKey,
            email: currentUser.email,
            amount: data.amount * 100, // Convert to kobo
            currency: 'KES',
            ref: data.paymentReference,
            callback: function(response) {
                verifyPayment(response.reference);
            },
            onClose: function() {
                console.log('Payment cancelled');
            }
        });
        
        handler.openIframe();
        
    } catch (error) {
        showError('Failed to initiate payment. Please try again.');
    }
}

async function verifyPayment(reference) {
    try {
        const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentReference: reference })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Payment successful! Your premium subscription is now active.');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showError('Payment verification failed. Please contact support.');
        }
    } catch (error) {
        showError('Payment verification failed. Please try again.');
    }
}

// Utility functions
function setLoading(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    } else {
        alert(message);
    }
}

function showSuccess(message) {
    // Create or update success message element
    let successDiv = document.getElementById('successMessage');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'successMessage';
        successDiv.className = 'success-message';
        document.body.appendChild(successDiv);
    }
    
    successDiv.textContent = message;
    successDiv.classList.remove('hidden');
    
    setTimeout(() => {
        successDiv.classList.add('hidden');
    }, 5000);
}

function showUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// URL parameter handling for tools page
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}