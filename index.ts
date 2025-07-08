import axios from 'axios';

const loginApi = async (username: string, password: string) => {
  try {
    const resp = await axios.post('http://localhost:3000/login', {
      username,
      password,
    });
    return resp;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle Axios error
      console.error('Axios error:', error.response.data.message);
      return { error: error.response.data.message };
    } else {
      // Handle other types of errors
      console.error('Erro inesperado:', error);
      return { error: 'Ocorreu um erro inesperado.' };
    }
  }
};

export { loginApi };