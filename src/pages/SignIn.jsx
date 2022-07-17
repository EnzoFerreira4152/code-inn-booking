import React, { useContext } from 'react'
import SignInForm from '../components/SignInForm';
import ClearIcon from '@mui/icons-material/Clear';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/');
  }
  return (
    <>
      <ClearIcon
                  fontSize="large"
                  sx={{ position: 'fixed', top: '3em', right: '5vw', cursor: 'pointer', color: colors.dark, zIndex: 99 }}
                  onClick={handleClick}
                />
      <SignInForm/>
    </>
    )
}
