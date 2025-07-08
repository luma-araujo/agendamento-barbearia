import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import type { Usuario } from '../../App';

type Props = {
    handleLogin: (user: Usuario) => void;
}

const LoginForm = ({ handleLogin }: Props) => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => {
            handleLogin({
                username: values.username,
                password: values.password
            })
        },
        validate: values => {
            const regexUpperCase = /(?=[A-Z])/g;
            const regexSpecialChar = /(?=[!@#\$%\^\&*\)\(+=._-])/g;
            const regexNumber = /\d/;

            const upperCase = regexUpperCase.test(values.password);
            const specialChar = regexSpecialChar.test(values.password);
            const numb = regexNumber.test(values.password)


            let errors: { username?: string; password?: string } = {};


            // Validação dos campos de usuário 'username'
            if (values.username.length === 0) {
                errors.username = "Campo obrigatório!"
            }
            if (values.username.length < 3) {
                errors.username = "Campo deve conter no mínimo 3 caracteres!"
            }


            // Validação dos campos de senha 'password'
            if (!upperCase) {
                errors.password = "Campo deve conter letras maiúsculas!"
            }
            if (!specialChar) {
                errors.password = "Campo deve conter caracteres especiais!"
            }
            if (values.password.length < 8) {
                errors.password = "Campo deve conter no mínimo 8 caracteres!"
            }
            if (values.password.length === 0) {
                errors.password = "Campo obrigatório!"
            }
            if (!numb) {
                errors.password = "Campo deve conter números!";
            }

            return errors;
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Awesome </h3> <br />
            <h2 className='marginBotton'>GOBARBER</h2> <br />
            <h3>Haircuts & Shaves</h3>
            <p className='marginBotton'>Faça seu login</p>
            <div className='inputs-usuario'>
                <TextField
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    label="username"
                    variant="standard"
                    fullWidth
                    helperText={formik.errors.username}
                    error={!!formik.errors.username}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    label="password"
                    variant="standard"
                    fullWidth
                    helperText={formik.errors.password}
                    error={!!formik.errors.password}
                />
            </div>
            <div className='marginBotton'></div>
            <Button variant="contained" type='submit'>Entrar</Button>
            < p className="senhaEsquecida">Esqueci minha senha</p>
        </form>
    )
}

export { LoginForm }