import { Box, Button, Card, Divider, Grid, Rating, Skeleton, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { colors } from '../../theme/theme';
import RoomIcon from '@mui/icons-material/Room';
import { Formik, useFormikContext } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {toast } from 'react-toastify';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: colors.secondary,
  },
  '& .MuiRating-iconHover': {
    color: colors.secondary,
  },
});

const ContainerButton = styled(LoadingButton)(
  () => `
    color: ${colors.white}; 
    border-color: ${colors.secondary};
    background-color: ${colors.secondary};
    padding: 0.5em 1.3em;
    text-transform: none;
    font-size: 1.4em;
    width: 90%;
    `
);

export const Resume = ({title, type, address, stars, image, loading}) => {

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const formik = useFormikContext();

  const {submitForm, values} = formik;

  const { arrivalDate, departureDate } = values;


  const handleClick = () =>{
    if(formik.isValid) {
      submitForm();
    } else{
      toast.error('Por favor, revisa y completa los campos', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }

  return (
    <Box>
      <Card
        elevation={5}
        sx={{ borderRadius: '0.4em' }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} lg={12}>
            <Typography
              variant='h3'
              fontWeight={600}
              fontSize='26px'
              color={colors.secondary}
              padding='1em 0.5em 1em 0.5em'
            >
              Detalles de la reserva
            </Typography>
            <img
              src={image.imgUrl}
              alt={image.title}
              width='100%'
              style={{
                maxHeight: isTablet ? '27.5em' : '24.4em',
                margin: isTablet && '0em 1em 1em 1em',
                borderRadius: isTablet && '10px',
                display: imgLoaded ? 'block' : 'none',
              }}
              onLoad={() => setImgLoaded(true)}
            />
            {!imgLoaded && <Skeleton
              variant='rectangular'
              width='100%'
              height={isTablet ? '27.5em' : '24.4em'}
            />}
          </Grid>
          <Grid item xs={12} sm={6} lg={12}>
            <Box
              paddingTop={isTablet ? '5em' : '0em'}
            >
              <Box
                display="flex"
                flexDirection="column"
                padding='1em 0.5em 1em 0.5em'
                gap={isTablet ? 0 : 3}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  padding='1em'
                >
                  <Typography variant='h6' fontWeight={700} fontSize='14px'>{type}</Typography>
                  <Typography variant='h3' fontWeight={700} fontSize='28px'>{title}</Typography>
                  <StyledRating name="read-only" value={stars} readOnly />
                </Box>
                <Box display="flex">
                  <RoomIcon sx={{ color: colors.primary }} fontSize='large' />
                  <Typography variant='h6' fontWeight={700} fontSize='16px'>{address}</Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                padding={isTablet ? '0.5em 0.5em 1em 0.5em' : '1em 0.5em 1em 0.5em'}
                gap={isTablet ? 2 : 2}
              >
                <Divider variant='middle' sx={{ borderColor: colors.dark }} />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems='center'
                  padding='0em 2em'
                >
                  <Typography variant='h6' fontWeight={600} fontSize='20px'>Check in</Typography>
                  <Typography variant='h6' fontWeight={400} fontSize='20px'>
                    {arrivalDate.length > 0 ? arrivalDate : '__/__/__'}
                  </Typography>
                </Box>
                <Divider variant='middle' sx={{ borderColor: colors.dark }} />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems='center'
                  padding='0em 2em'
                >
                  <Typography variant='h6' fontWeight={600} fontSize='20px'>Check out</Typography>
                  <Typography variant='h6' fontWeight={400} fontSize='20px'>
                    {departureDate.length > 0 ? departureDate : '__/__/__'}
                  </Typography>
                </Box>
                <Divider variant='middle' sx={{ borderColor: colors.dark }} />
                <ContainerButton
                  variant='contained'
                  sx={{
                    '&:hover': {
                      borderColor: `${colors.secondary}`,
                      background: `${colors.secondary}`
                    },
                    alignSelf: 'center'
                  }}
                  onClick={handleClick}
                  loading={loading}
                >
                  Confirmar reserva
                </ContainerButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Card>
    </Box>
  )
}
