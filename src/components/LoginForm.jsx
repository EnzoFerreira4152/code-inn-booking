import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import AOS from 'aos';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';
import PasswodInput from './PasswordInput';
import Input from './Input';

import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Input.css'
import '../styles/Form.css'
import { colors } from '../theme/theme';
import useFetch from 'use-http';
import { apiEndpoint } from '../configuration/endpoints';


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('Este campo es obligatorio'),
    password: Yup.string().min(6, 'Demasiado corto').max(50, 'Demasiado largo').required('Este campo es obligatorio'),
});


function LoginForm() {

    const {post, loading, response} = useFetch(apiEndpoint + "/auth/login", {
        headers: {
            'Content-Type': 'application/json'
        }
    });


    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const matches = useMediaQuery('(min-width:768px)');
    const buttonWidth = { width: matches ? '200px' : '400px' };

    const submitHandler = async(values) => {
        console.log(values)
        const resp = await post('/', values);
        console.log(resp);
        if(response.ok){
            toast.success('Bienvenido a la plataforma', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true
            });
            setTimeout(() => {
            const action = {
                type: types.login,
                payload: { 
                        name: resp.firstName, 
                        surname: resp.lastName, 
                        email: resp.email,
                        jwt: resp.token,
                        id: resp.id,
                        authority: resp?.authority[0]?.authority,
                    }
            }
            dispatch(action);
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate(lastPath, {
                replace: true
            });
            }, 1000);
        } else {
            toast.error('Credenciales inválidas', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    }

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext)

    return (
        <section data-aos="fade-down" className='form-container'>
            <style>{'#root { min-height: 100%; }'}</style>
            <header>
                <h1 className='title'>Iniciar Sesión</h1>
            </header>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={submitHandler}
                validationSchema={SignupSchema}
            >

                {({ isValid, dirty, touched, errors }) => (
                    <Form className='login-form'>
                        <Input type="email" name="email" label="Correo electrónico" error={errors['email'] && touched['email']} />
                        <PasswodInput label='Contraseña' name='password' error={errors['password'] && touched['password']} />
                        <Button type='submit' disabled={(!isValid || !dirty) || loading } variant="contained"
                            sx={{
                                textTransform: 'none', height: '40px', bgcolor: colors.primary, mt: '2rem', buttonWidth, '&:hover': {
                                    borderColor: `${colors.primaryDark}`,
                                    background: `${colors.primaryDark}`
                                },
                            }} 
                            fullWidth
                            >
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </Button>
                        <ToastContainer />
                        <Link
                            to='/signin'
                            style={{ textDecoration: 'none' }}
                        >
                            <p className='font-sm mt-4'>¿Aún no tienes cuenta? <span style={{color: colors.primary}}>Registrate</span> </p>
                        </Link>
                    </Form>
                )}
            </Formik>
        </section >)
}

export default LoginForm