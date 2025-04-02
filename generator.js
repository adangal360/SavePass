const Generator = {
    generate: function () {
        const length = parseInt(document.getElementById('password-length').value) || 12;
        const useUpper = document.getElementById('include-uppercase').checked;
        const useNumbers = document.getElementById('include-numbers').checked;
        const useSymbols = document.getElementById('include-symbols').checked;

        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+{}[]";

        let charset = lower;
        let requiredChars = [];

        if (useUpper) {
            charset += upper;
            requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
        }
        if (useNumbers) {
            charset += numbers;
            requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }
        if (useSymbols) {
            charset += symbols;
            requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }

        requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);

        let password = requiredChars.join('');
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        const input = document.getElementById("password");
        input.value = password;
        checkPasswordStrength();

        const strengthText = document.getElementById("password-strength").textContent;
        if (strengthText !== "Strong") {
            return this.generate();
        }

        navigator.clipboard.writeText(password);
    }
};