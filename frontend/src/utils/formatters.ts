export function formatNumberToLocale(number: number) {
  return number.toLocaleString('pt-BR')
}

export function formatNumberToCurrency(number: number) {
  const formattedNumber = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number)

  return formattedNumber
}
