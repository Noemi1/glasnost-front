import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Crypto } from "./crypto";

@Injectable({
    providedIn: 'root'
})
export class ModoEscuro {

    ativado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private crypto: Crypto) {

    }

    toggle() {
        this.setAtivado(!this.ativado.value);
    }

    setAtivado(value: boolean) {
      this.ativado.next(value);
      var ativadoEncryted = this.crypto.encrypt(this.ativado.value);
      if (ativadoEncryted != null) {
        localStorage.setItem('dark-mode', ativadoEncryted);
      } else {
        localStorage.removeItem('dark-mode');
      }
    }

    getAtivado() {
      var ativadoEncrypted = localStorage.getItem('dark-mode');
      if (ativadoEncrypted) {
        var ativado = this.crypto.decrypt(ativadoEncrypted);
        if (ativado != null) {
          this.setAtivado(ativado)
        }
      }

      return this.ativado;
    }
}
