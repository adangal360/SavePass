const Storage = {
    getAccounts: function () {
        const data = localStorage.getItem('accounts');
        return data ? JSON.parse(data) : [];
    },

    saveAccounts: function (accounts) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    },

    saveAccount: function () {
        if (!validateFormInputs()) {
            alert("Please fill in all required fields.");
            return;
        }

        const application = document.getElementById('application').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const tag = document.getElementById('tag') ? document.getElementById('tag').value.trim() : "";

        const encryptedPassword = CryptoUtil.encrypt(password);
        const accounts = this.getAccounts();
        accounts.push({ application, username, password: encryptedPassword, tag });
        this.saveAccounts(accounts);

        alert('Account saved!');
        document.getElementById('application').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('tag').value = '';
        document.getElementById('password-strength').textContent = '';
        clearValidationErrors();

        this.displayAccounts();
        this.populateTagFilter();
    },

    displayAccounts: function () {
        const list = document.getElementById('account-list');
        list.innerHTML = '';
        const accounts = this.getAccounts();

        if (accounts.length === 0) {
            list.innerHTML = '<li>No accounts saved.</li>';
            return;
        }

        accounts.forEach((acc, index) => {
            const li = document.createElement('li');

            const appName = document.createElement('strong');
            appName.textContent = acc.application;
            appName.style.cursor = 'pointer';

            const details = document.createElement('div');
            details.className = 'account-details';
            details.style.display = 'none';

            const decryptedPassword = CryptoUtil.decrypt(acc.password);
            const sanitizedPassword = decryptedPassword
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            const sanitizedTag = acc.tag
                ? acc.tag.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                : '—';

            details.innerHTML = `
                <span>Username: ${acc.username}</span>
                <span>Password: ${decryptedPassword}</span>
                <span>Tag: ${sanitizedTag}</span>
                <button onclick="copyPassword(this)" data-password="${sanitizedPassword}">Copy Password</button>
                <button onclick="Storage.deleteAccount(${index})" class="delete-btn">Delete</button>
            `;

            appName.onclick = () => {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            };

            li.appendChild(appName);
            li.appendChild(details);
            list.appendChild(li);
        });
    },

    deleteAccount: function (index) {
        const accounts = this.getAccounts();
        if (confirm("Are you sure you want to delete this account?")) {
            accounts.splice(index, 1);
            this.saveAccounts(accounts);
            this.displayAccounts();
            this.populateTagFilter();
        }
    },

    exportToJSON: function () {
        const accounts = this.getAccounts();
        const blob = new Blob([JSON.stringify(accounts, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'savepass_accounts.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    importFromJSON: function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedAccounts = JSON.parse(e.target.result);
                const existing = this.getAccounts();
                const merged = [...existing, ...importedAccounts];
                this.saveAccounts(merged);
                alert('Accounts imported successfully!');
                this.displayAccounts();
                this.populateTagFilter();
            } catch (err) {
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    },

    populateTagFilter: function () {
        const accounts = this.getAccounts();
        const tags = [...new Set(accounts.map(acc => acc.tag).filter(Boolean))];
        const dropdown = document.getElementById("tag-filter");

        dropdown.innerHTML = '<option value="all">All</option>';
        tags.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.textContent = tag;
            dropdown.appendChild(option);
        });
    },

    filterByTag: function () {
        const selectedTag = document.getElementById("tag-filter").value;
        const accounts = this.getAccounts();
        const filtered = selectedTag === "all"
            ? accounts
            : accounts.filter(acc => acc.tag === selectedTag);

        const list = document.getElementById("account-list");
        list.innerHTML = '';

        if (filtered.length === 0) {
            list.innerHTML = '<li>No accounts found for selected tag.</li>';
            return;
        }

        filtered.forEach((acc, index) => {
            const li = document.createElement('li');

            const appName = document.createElement('strong');
            appName.textContent = acc.application;
            appName.style.cursor = 'pointer';

            const details = document.createElement('div');
            details.className = 'account-details';
            details.style.display = 'none';

            const decryptedPassword = CryptoUtil.decrypt(acc.password);
            const sanitizedPassword = decryptedPassword
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            const sanitizedTag = acc.tag
                ? acc.tag.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                : '—';

            details.innerHTML = `
                <span>Username: ${acc.username}</span>
                <span>Password: ${decryptedPassword}</span>
                <span>Tag: ${sanitizedTag}</span>
                <button onclick="copyPassword(this)" data-password="${sanitizedPassword}">Copy Password</button>
                <button onclick="Storage.deleteAccount(${index})" class="delete-btn">Delete</button>
            `;

            appName.onclick = () => {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            };

            li.appendChild(appName);
            li.appendChild(details);
            list.appendChild(li);
        });
    }
};