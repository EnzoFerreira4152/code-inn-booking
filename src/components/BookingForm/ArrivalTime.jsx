import { Box, Card, FormControl, FormHelperText, InputLabel, MenuItem, Select, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { colors } from '../../theme/theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useFormikContext } from 'formik';

const LabelInput = styled(Typography)(
  () => `
      color: ${colors.secondary}; 
      font-weight: 600;
    `
);

const hoursAMPM = [
  { value: '01:00 AM', label: '01:00 AM' },
  { value: '02:00 AM', label: '02:00 AM' },
  { value: '03:00 AM', label: '03:00 AM' },
  { value: '04:00 AM', label: '04:00 AM' },
  { value: '05:00 AM', label: '05:00 AM' },
  { value: '06:00 AM', label: '06:00 AM' },
  { value: '07:00 AM', label: '07:00 AM' },
  { value: '08:00 AM', label: '08:00 AM' },
  { value: '09:00 AM', label: '09:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 AM', label: '12:00 AM' },
  { value: '01:00 PM', label: '01:00 PM' },
  { value: '02:00 PM', label: '02:00 PM' },
  { value: '03:00 PM', label: '03:00 PM' },
  { value: '04:00 PM', label: '04:00 PM' },
  { value: '05:00 PM', label: '05:00 PM' },
  { value: '06:00 PM', label: '06:00 PM' },
  { value: '07:00 PM', label: '07:00 PM' },
  { value: '08:00 PM', label: '08:00 PM' },
  { value: '09:00 PM', label: '09:00 PM' },
  { value: '10:00 PM', label: '10:00 PM' },
  { value: '11:00 PM', label: '11:00 PM' },
  { value: '12:00 PM', label: '12:00 PM' },
];

export const ArrivalTime = () => {

  const theme = useTheme();
  const isMatchMD = useMediaQuery(theme.breakpoints.up('md'));

  const formik = useFormikContext();

  return (
    <Box>
      <Typography
        variant='h3'
        fontWeight={700}
        fontSize='1.7em'
        color={colors.secondary}
        gutterBottom
      >
        Tu horario de llegada
      </Typography>

      <Card
        elevation={5}
        sx={{ padding: isMatchMD ? '2em' : '1em', borderRadius: '0.4em' }}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap={1}
          >
            <CheckCircleOutlineIcon />
            <Typography
              variant='h5'
              fontWeight={600}
              fontSize={isMatchMD ? '1.2em' : '1em'}
              color={colors.secondary}
            >
              Tu habitación va a estar lista para el check-in entre las 10:00AM y las 11:00PM
            </Typography>
          </Box>
          <FormControl fullWidth>
            <LabelInput sx={{fontSize: isMatchMD ? '1em' : '0.8em'}} variant="caption">Indicá tu hora estimada de llegada</LabelInput>
            <Select
              id="arrivalTime"
              value={formik.values.arrivalTime}
              onChange={(e) => formik.setFieldValue('arrivalTime', e.target.value)}
              sx={{ width: isMatchMD ? '50%' : '100%', fontSize: '1em', height: '3em'}}
              required
              placeholder='Seleccioná una hora'
            >
              <MenuItem value='Seleccioná una hora'>Seleccioná una hora</MenuItem>
              {
                hoursAMPM.map(hour => (
                  <MenuItem key={hour.value} value={hour.value}>{hour.label}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>{formik.touched.arrivalTime && formik.errors.arrivalTime}</FormHelperText>
          </FormControl>
        </Box>
      </Card>
    </Box>
  )
}
