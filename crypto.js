const CryptoUtil = {
    secretKey: 'savepass-secret-key',

    encrypt: function (text) {
        try {
            return CryptoJS.AES.encrypt(text, this.secretKey).toString();
        } catch (e) {
            console.error('Encryption error:', e);
            return '';
        }
    },

    decrypt: function (cipherText) {
        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.error('Decryption error:', e);
            return '';
        }
    }
};