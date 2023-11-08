import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class Crypto {
	encryptSecretKey: string = 'mySecretKey';

	encrypt(data: any) {
		try {
            if (data === undefined || data === null || data === '') return null;
			
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString(); 
			while(encrypted.includes('/')) {
                encrypted = encrypted.replace('/', 'slash'); // Removendo barras para aplicar encrypt em rotas
            }
			return encrypted;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	decrypt(data: any) {
		try {
            if (!data) {
                return null;
            }
            while(data.includes('slash')) {
                data = data.replace('slash', '/'); // Reaplicando as barras para decryptar
            }
			const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
			if (bytes.toString()) {
				return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			}
			return null;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}
