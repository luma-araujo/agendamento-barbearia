import { Alert } from '@mui/material';
import { loginApi } from './api/login';
import './App.css';
// import barbearia-img from './assets/barbearia-img.jpg'
import { LoginForm } from './components/LoginForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type Usuario = {
  username: string;
  password: string
}

function App() {
  const [erroLogin, setErroLogin] = useState<boolean>(false);
  const [sucessoLogin, setSucessoLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: Usuario) => {
    const response = await loginApi(username, password);


    if ('error' in response) {
      setErroLogin(true);
      return;
    }
    if (response.status === 200 && response.data.token) {
      setSucessoLogin(true);
      localStorage.setItem('tokenLogin', response.data.token);
      navigate('/home');
    }

  }

  useEffect(() => {

    setInterval(() => {
      setErroLogin(false);
      setSucessoLogin(false);
    }, 7000);

  }, [erroLogin, sucessoLogin]);

  return (
    <div className='main'>
      {erroLogin &&
        <Alert variant="filled" severity="error" onClick={() => setErroLogin(false)} className='alerta'>
          Erro ao efetuar login, verifique suas credenciais!
        </Alert>
      }
      {sucessoLogin &&
        <Alert severity="success" onClick={() => setSucessoLogin(false)}>
          Login efetuado com sucesso!
        </Alert>
      }

      <div className='container'>
        <div className='imagemLogin'>
          <img src={  }} alt="" width={550} height={345} />
        </div>
        <LoginForm handleLogin={handleLogin} />

      </div>

    </div>
  )
}

export default App