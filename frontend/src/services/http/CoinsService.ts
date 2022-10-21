import axios from 'axios'

const getCoins = () =>
  axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')

export const CoinsService = {
  getCoins
}
