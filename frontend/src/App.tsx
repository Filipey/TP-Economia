import { useEffect, useState } from 'react'
import { api } from './services/api'

export function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/api/v1').then(res => setMessage(res.data))
  }, [])

  const handleGetMessage = () => {
    api.get('/api/v1').then(res => setMessage(res.data))
  }

  return (
    <>
      <div>
        <h1>Rode o servidor para ver a mensagem</h1>
      </div>
      <div>{message ? message : 'Erro ao fazer o request'}</div>

      <div>
        <button onClick={handleGetMessage}>
          Tentar obter resposta do servidor
        </button>
      </div>
    </>
  )
}
