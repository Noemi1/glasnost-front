export const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/
export function validateCnpj(doc: number) {
    var cnpj = doc.toString();

    if (!doc) return false;
    if (!cnpj) return false;
    if (cnpj.length > 14) return false;

    cnpj = cnpj.padStart(14, '0');

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;
        

        // Aceita receber o valor como string, número ou array com todos os dígitos
        const isString = typeof cnpj === 'string'
        const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj)
      
        // Elimina valor de tipo inválido
        if (!validTypes) return false
      
        // Filtro inicial para entradas do tipo string
        if (isString) {
          // Teste Regex para veificar se é uma string apenas dígitos válida
          const digitsOnly = /^\d{14}$/.test(cnpj)
          // Teste Regex para verificar se é uma string formatada válida
          const validFormat = regexCNPJ.test(cnpj)
          // Verifica se o valor passou em ao menos 1 dos testes
          const isValid = digitsOnly || validFormat
      
          // Se o formato não é válido, retorna inválido
          if (!isValid) return false
        }
      
        // Elimina tudo que não é dígito
        const numbers = matchNumbers(cnpj)
      
        // Valida a quantidade de dígitos
        if (cnpj.length !== 14) return false;
      
        // Elimina inválidos com todos os dígitos iguais
        const items = [...new Set(cnpj)]
        if (items.length === 1) return false;
      
        // Separa os 2 últimos dígitos verificadores
        const digits = cnpj.slice(12)
      
        // Valida 1o. dígito verificador
        const digit0 = validCalc(12, numbers);
        if (digit0.toString() !== digits[0]) return false;

        // Valida 2o. dígito verificador
        const digit1 = validCalc(13, numbers);
        return digit1.toString() === digits[1];
}


// Cálculo validador
function validCalc(x: number, numbers: number[]) {
  const slice = numbers.slice(0, x)
  let factor = x - 7
  let sum = 0

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i]
    sum += n * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)

  return result > 9 ? 0 : result
}

// Elimina tudo que não é dígito
function matchNumbers(value: string | number | number[] = '') {
  const match = value.toString().match(/\d/g)
  return Array.isArray(match) ? match.map(Number) : []
}