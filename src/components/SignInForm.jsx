import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import PasswodInput from './PasswordInput'
import Input from './Input'
import { ToastContainer, toast } from 'react-toastify';

import useMediaQuery from '@mui/material/useMediaQuery';

import '../styles/Input.css'
import '../styles/Form.css'
import { colors } from '../theme/theme';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';
import AOS from 'aos';
import "aos/dist/aos.css";
import useFetch from 'use-http';
import { apiEndpoint } from '../configuration/endpoints';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Demasiado corto').max(50, 'Demasiado largo').required('Este campo es obligatorio'),
    surname: Yup.string().min(2, 'Demasiado corto').max(50, 'Demasiado largo').required('Este campo es obligatorio'),
    email: Yup.string().email('Correo inválido').required('Este campo es obligatorio'),
    password: Yup.string().min(6, 'Demasiado corto').max(50, 'Demasiado largo').required('Este campo es obligatorio'),
    confirmPassword: Yup.string().required('Este campo es obligatorio').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

function SignInForm() {

    const {post, loading, response} = useFetch(apiEndpoint + "/auth/register");

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const initialValues = { name: '', surname: '', email: '', password: '', confirmPassword: '' }

    const matches = useMediaQuery('(min-width:576px)');
    const styles = { width: matches ? '200px' : '400px' };
    const buttonStyles = {
        color: 'white', textTransform: 'none', height: '40px', bgcolor: colors.primary, mt: '2rem', buttonWidth: styles, '&:hover': {
            borderColor: `${colors.primaryDark}`,
            background: `${colors.primaryDark}`
        },
    }


    const submitHandler = async(values) => {
        values.firstName = values.name;
        values.lastName = values.surname;
        const resp = await post(values);
        if(response.ok){
            const action = {
                type: types.login,
                payload: { 
                            name: values.name,
                            surname: values.surname,
                            email: values.email,
                            jwt: resp.token,
                            id: resp.id, 
                            authority: 'ROLE_USER',
                }
            }
            toast.success('Usuario creado correctamente', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
            });
            setTimeout(() => {
            dispatch(action);
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate('/', {
                replace: true
            });
            }, 1000);
        } else if(resp === 'Email already exists'){
            toast.error('Error al registrarse: El mail ya existe' , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
            });
        } else{
            toast.error('Lamentablemente no ha podido registrarse. Por favor intente más tarde', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }

    }

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext)

    return (
        <section data-aos='fade-down' className='form-container' >
            <style>{'#root { min-height: 100%; }'}</style>
            <header>
                <h1 className='title'>Crear Cuenta</h1>
            </header>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={SignupSchema}
            >
                {({ isValid, dirty, touched, errors }) => (
                    <Form>
                        <div className="full-name-container">
                            <Input name="name" label="Nombre" error={errors['name'] && touched['name']} />
                            <Input name="surname" label="Apellido" error={errors['lastName'] && touched['lastName']} />
                        </div>
                        <Input type="email" name="email" label="Correo electrónico" error={errors['email'] && touched['email']} />
                        <PasswodInput label='Contraseña' name='password' error={errors['password'] && touched['password']} />
                        <Input type="password" name="confirmPassword" label="Confirmar contraseña" error={errors['confirmPassword'] && touched['confirmPassword']} />
                        <Button type='submit' variant='contained' sx={buttonStyles} disabled={(!isValid || !dirty) || loading } fullWidth>
                            {loading ? 'Creando...' :  "Crear cuenta"}
                        </Button>
                        <ToastContainer/>
                        <Link
                            to='/login'
                            style={{ textDecoration: 'none' }}
                        >
                            <p className='font-sm mt-4'>¿Ya tenes una cuenta? <span style={{color: colors.primary}} >Iniciar sesión</span> </p>
                        </Link>
                    </Form>
                )}
            </Formik>
        </section >)
}

export default SignInForm