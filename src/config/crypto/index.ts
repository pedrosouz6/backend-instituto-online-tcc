import crypto from 'crypto';

require('dotenv').config({  
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
})

export class ConfigCrypto {
    crypt(text: string): string {
        const iv = crypto.randomBytes(16);
        
        const cipher = crypto.createCipheriv(process.env.ALG_CRYPTO, process.env.PASSWORD_CRYPTO, iv);
        const crypted = cipher.update(text, 'utf-8', 'hex') + cipher.final('hex');
        return iv.toString('hex') + ':' + crypted;
    }

    decrypt(text: string): string {
        const parts = text.split(':');

        const decipher = crypto.createDecipheriv(process.env.ALG_CRYPTO, process.env.PASSWORD_CRYPTO, Buffer.from(parts[0], 'hex'));
        const plain = decipher.update(parts[1], 'hex', 'utf-8') + decipher.final('utf-8');
        return plain;
    }
}