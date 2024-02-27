const crypto = require('crypto');

// Function to encrypt a value into a 16-digit format
function encryptValue(value) {
    const key = crypto.scryptSync('secret-key', 'salt', 32); // Generate key
    const iv = crypto.randomBytes(16); // Generate IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedValue = cipher.update(value, 'utf8', 'hex');
    encryptedValue += cipher.final('hex');
    return iv.toString('hex') + encryptedValue; // Include IV in the output
}

// Function to decrypt the original value from the encoded value
function backToOriginalValue(encodedValue) {
    try {
        const key = crypto.scryptSync('secret-key', 'salt', 32); // Generate key
        const iv = Buffer.from(encodedValue.substring(0, 32), 'hex'); // Extract IV
        const encryptedData = encodedValue.substring(32); // Extract encrypted data
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let originalValue = decipher.update(encryptedData, 'hex', 'utf8');
        originalValue += decipher.final('utf8');
        return originalValue;
    } catch (error) {
        console.error("Decryption error:", error);
        return null; // Return null on decryption error
    }
}

// Example usage
const originalValue = "Suvrodeb";
const encodedValue = encryptValue(originalValue);

console.log("Original value:", originalValue);
console.log("Encoded value:", encodedValue);

const decodedValue = backToOriginalValue(encodedValue);
console.log("Decoded value:", decodedValue);
