// DOM Elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Toggle between Sign Up and Sign In views
registerBtn?.addEventListener('click', () => container?.classList.add("active"));
loginBtn?.addEventListener('click', () => container?.classList.remove("active"));

// Handle Signup
const handleSignup = async (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            alert('Signup successful!');
        } else {
            alert('Signup failed: ' + (await response.text()));
        }
    } catch (error) {
        console.error('Signup Error:', error);
    }
};



// Handle Login
const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;

    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'main-page.html';
        } else {
            alert('Login failed: ' + (await response.text()));
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
};

// Attach Event Listeners
signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);
