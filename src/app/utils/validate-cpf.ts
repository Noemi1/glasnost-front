
export function validateCPF(doc: number) {
    var cpf: string = doc.toString();
    if (cpf.length > 11)
        return false;
    cpf = cpf.padStart(11, '0')
    if (cpf.length != 11)
        return false;

    var igual: boolean = true;
    for (let i = 1; i < 11; i++) {
        if (cpf[i] != cpf[0])
            igual = false;
    }
    if (igual || cpf == '12345678909')
        return false;

    var numeros: number[] = Array.of(11);
    for (let i = 0; i < 11; i++) {
        numeros[i] = parseInt(cpf[i]);
    }

    var soma: number = 0;
    for (let i = 0; i < 9; i++) {
        soma += (10 - i) * numeros[i];
    }

    var resultado: number = soma % 11;
    if (resultado == 1 || resultado == 0) {
        if (numeros[9] != 0)
            return false;
    }
    else if (numeros[9] != 11 - resultado) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++)
        soma += (11 - i) * numeros[i];
    resultado = soma % 11;
    if (resultado == 1 || resultado == 0) {
        if (numeros[10] != 0)
            return false;
    }
    else if (numeros[10] != 11 - resultado) {
        return false;
    }
    return true;

}