// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const rememberMe = document.getElementById('rememberMe');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const socialButtons = document.querySelectorAll('.social-button');

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Change icon based on visibility
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Add shake animation
    loginForm.classList.add('shake');
    setTimeout(() => {
        loginForm.classList.remove('shake');
    }, 500);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Real-time validation
emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '';
    }
});

passwordInput.addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '';
    }
});

emailInput.addEventListener('input', function() {
    if (this.value && validateEmail(this.value)) {
        this.style.borderColor = '#10b981';
    } else {
        this.style.borderColor = '';
    }
    hideMessages();
});

passwordInput.addEventListener('input', function() {
    if (this.value && validatePassword(this.value)) {
        this.style.borderColor = '#10b981';
    } else {
        this.style.borderColor = '';
    }
    hideMessages();
});

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberMe.checked;
    
    // Hide previous messages
    hideMessages();
    
    // Validation
    if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return;
    }
    
    if (!validatePassword(password)) {
        showError('Password must be at least 6 characters long');
        passwordInput.focus();
        return;
    }
    
    // Show loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    
    // Simulate API call
    try {
        await simulateLogin(email, password, remember);
    } catch (error) {
        showError(error.message);
        loginButton.classList.remove('loading');
        loginButton.disabled = false;
    }
});

// Simulate login API call
function simulateLogin(email, password, remember) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials (in real app, this would be an API call)
            const demoEmail = 'demo@example.com';
            const demoPassword = 'password123';
            
            if (email === demoEmail && password === demoPassword) {
                showSuccess('Login successful! Redirecting...');
                
                // Store remember me preference
                if (remember) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('savedEmail', email);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('savedEmail');
                }
                
                // Set logged in status
                localStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to dashboard after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
                resolve();
            } else {
                reject(new Error('Invalid email or password. Try: demo@example.com / password123'));
            }
        }, 1500); // Simulate network delay
    });
}

// Social login handlers
socialButtons.forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
        
        // Add loading state
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            alert(`${provider} login clicked! In a real application, this would redirect to ${provider} OAuth.`);
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
        }, 500);
    });
});


// Create particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add shake animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    const savedEmail = localStorage.getItem('savedEmail');
    const rememberMeValue = localStorage.getItem('rememberMe');
    
    if (savedEmail && rememberMeValue === 'true') {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }
});

// Add keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Allow Enter key to submit form when focused on inputs
    if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Add input animations
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

