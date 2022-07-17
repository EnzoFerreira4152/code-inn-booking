import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import ClearIcon from '@mui/icons-material/Clear';
import { colors } from '../theme/theme';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LoginScreen = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  const [searchParams, setSearchParams] = useSearchParams();

  //I want to render a notification pop up if there is errorType on searchParams
  useEffect(() => {
    if (searchParams.get('redirectionType') === 'booking') {
      toast.error('Para realizar una reserva necesitas estar logueado', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
    });}
    if(searchParams.get('redirectionType') === 'login') {
      toast.info('Ahora ingresa tus datos de acceso', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
    });}
    }, [searchParams]);

  return (
    <>
      <ClearIcon
        fontSize="large"
        sx={{ position: 'fixed', top: '3em', right: '5vw', cursor: 'pointer', color: colors.dark, zIndex: 99 }}
        onClick={handleClick}
      />
      <LoginForm />
    </>
  )
}
