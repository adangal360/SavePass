# SavePass - Password Manager

## Project Vision  
**SavePass** is a secure, easy-to-use single-page web application designed to help users-especially those with limited technical experience-manage their login credentials safely and efficiently.  
It focuses on privacy, usability, and clarity, requiring no server-side storage and providing strong password practices via built-in generation and encryption.

## Background & Purpose  
In today’s digital-first world, users are often overwhelmed by the number of accounts they manage. Many resort to reusing weak passwords or storing them insecurely.  
**SavePass** helps mitigate these risks by offering a lightweight, privacy-focused, and accessible password manager. It’s ideal for everyday users, students, and anyone seeking a personal solution without relying on commercial tools.

## Key Features
- **AES-Encrypted Password Storage** (CryptoJS)
- **Password Strength Checker** with visual indicators
- **Customizable Password Generator** (length, symbols, numbers, etc.)
- **Tagging System** to organize accounts (e.g., school, personal, work)
- **Tag-Based Filtering** for account browsing
- **Import/Export Credentials via JSON**
- **SPA Architecture**

## Technologies Used
- **HTML5**, **CSS3**
- **JavaScript ES6+**
- [CryptoJS](https://github.com/brix/crypto-js) for AES encryption

## How to Use
1. Open `index.html` in your browser
2. Enter your **Application**, **Username**, **Password**, and optional **Tag**
3. Use the **Generate Password** tool if needed
4. Click **Save Account** to store it (encrypted)
5. Switch to **Manage Accounts** to view, filter, or copy passwords
6. Use **Export/Import JSON** to back up or load data

## Testing & Compatibility
- Fully tested on latest **Chrome**, **Firefox**, and **Edge**
- Works entirely **offline** — no internet required
- Supports special characters, long/short inputs, and error validation

## Author
Anubhav Dangal

## Credits
- **[CryptoJS](https://github.com/brix/crypto-js)** by Jeff Mott et al. — AES encryption used for secure local password storage
