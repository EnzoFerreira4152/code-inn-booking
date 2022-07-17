import { Box, Button, Card, styled, Typography } from '@mui/material'
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { colors } from '../theme/theme';
import { useNavigate, useParams } from 'react-router-dom';

const ContainerButton = styled(Button)(
  () => `
    border-color: ${colors.secondary};
    background-color: ${colors.secondary};
      padding: 0.5em 1.7em;
      text-transform: none;
      font-size: 1.1em;
      width: 60vw;
      max-width: 20em;
    `
);

export const AcommodationSuccess = () => {

  const navigate = useNavigate();

  const {id: accommodationId} = useParams();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'78vh'}
    >
      <Card
        elevation={5}
        sx={{
          width: '90vw',
          maxWidth: '700px',
          margin: '0 auto',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        <VerifiedIcon sx={{fontSize: '80px', color: colors.secondary}}/>
        <Typography
          variant={'h4'}
          fontSize={'1.5rem'}
          fontWeight={'bold'}
          color={colors.secondary}
          marginBottom={'-1.3rem'}
        >
          ¡ÉXITO!
        </Typography>
        <Typography
          variant={'h5'}
          fontSize={'1.2rem'}
          fontWeight={'bold'}
          color={'#000'}
        >
          La nueva propiedad fue creada con éxito
        </Typography>
        <ContainerButton
          sx={{
            '&:hover': {
              borderColor: `${colors.secondary}`,
              background: `${colors.secondary}`
            }
          }}
          variant="contained"
          onClick={() => window.location.href='/accommodations/' + accommodationId}
        >
          Ver propiedad
        </ContainerButton>
      </Card>
    </Box>
  )
}