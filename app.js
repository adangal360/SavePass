function showAddSection() {
    document.getElementById('add-account').style.display = 'block';
    document.getElementById('manage-accounts').style.display = 'none';
}

function showManageSection() {
    document.getElementById('add-account').style.display = 'none';
    document.getElementById('manage-accounts').style.display = 'block';
    if (typeof Storage !== 'undefined') {
        Storage.displayAccounts();
    }
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthIndicator = document.getElementById('password-strength');
    let score = 0;

    if (password.length >= 8 && password.length < 12) score++;
    else if (password.length >= 12) score += 2;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (!password) {
        strengthIndicator.textContent = '';
        strengthIndicator.style.color = '';
    } else if (score <= 1) {
        strengthIndicator.textContent = 'Weak';
        strengthIndicator.style.color = 'red';
    } else if (score <= 3) {
        strengthIndicator.textContent = 'Medium';
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.style.color = 'green';
    }
}

function togglePasswordVisibility() {
    const input = document.getElementById("password");
    const button = input.nextElementSibling;
    const icon = button.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function copyPassword(button) {
    const password = button.getAttribute('data-password');
    navigator.clipboard.writeText(password)
        .then(() => alert('Password copied!'))
        .catch(() => alert('Failed to copy password.'));
}

function clearValidationErrors() {
    const fields = ['application', 'username', 'password'];
    fields.forEach(id => {
        document.getElementById(id).classList.remove('input-error');
    });
}

function validateFormInputs() {
    clearValidationErrors();
    let isValid = true;
    ['application', 'username', 'password'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
            el.classList.add('input-error');
            isValid = false;
        }
    });
    return isValid;
}

window.onload = showAddSection;

function toggleGeneratorOptions() {
    const panel = document.getElementById("generator-settings");
    if (panel.style.display === "none") {
        panel.style.display = "block";
    } else {
        Generator.generate();
    }
}