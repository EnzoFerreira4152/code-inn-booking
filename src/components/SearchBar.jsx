import React, { useState } from 'react'
import { Button, Divider, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box, styled } from '@mui/system'
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { colors } from '../theme/theme';
import DateRangePicker from 'rsuite/DateRangePicker';
import "rsuite/dist/rsuite.min.css";
import 'rsuite/styles/index.less';
import '../styles/searchbar.css'
const { beforeToday } = DateRangePicker;
import { ToastContainer, toast } from 'react-toastify';


import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Ranges = [
  {
    label: 'Próximos 7 días',
    value: [startOfDay(addDays(new Date(), +1)), endOfDay(addDays(new Date(), +8))]
  },
  {
    label: 'Próxima semana',
    value: [startOfDay(addDays(new Date(), +8)), endOfDay(addDays(new Date(), +15))]
  }
];

const ContainerButton = styled(Button)(
  () => `
    font-size: 1.5em;
    font-weight: 400;
    color: ${colors.white};
    background: ${colors.secondary};
    text-transform: none;
  `
);

export const SearchBar = ({ places}) => {
  const defaultProps = {
    options: places ? places : [],
    getOptionLabel: (option) => `${option?.name}, ${option?.country}`,
  };

  const navigate = useNavigate();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState({});

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const isMatchXS = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (e) => {
    //Navigate to the search page with city param
    if(value?.name) {
      if(date && date.length > 0) {
      navigate(`/search?city=${value?.name}&startDate=${new Date(date[0]).toISOString()}&finishDate=${new Date(date[1]).toISOString()}`);
      } else {
        navigate(`/search?city=${value?.name}`);
      }
    } else{
      toast.error('Por favor, selecciona una ciudad', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <>
      <Box
        padding={isMatch ? 1 : 2}
        textAlign='center'
        display='flex'
        flexDirection='column'
        gap={isMatch ? 1 : 3}
        sx={{ background: colors.primary }}
      >
        <Typography variant='h1' sx={{ fontSize: isMatch ? '1.5em' : '2.5em', fontWeight: 600, color: colors.white }}>
          Busca ofertas en hoteles, casas y mucho más
        </Typography>
        <ToastContainer />
        <Box
          display='flex'
          flexDirection={isMatch ? 'column' : 'row'}
          gap={isMatch ? 1 : 2}
          // alignItems='center'
          justifyContent='center'
        >
          <Autocomplete
            {...defaultProps}
            sx={{
              color: colors.primaryDark,
              background: colors.white,
              borderRadius: '0.5em',
              padding: `${isMatch ? '0.2em 0.5em' : '0.6em 0em'}`,
              maxWidth: isMatch ? '100%' : '40vw',
              width: isMatch ? '100%' : '35em',
            }}
            fullWidth
            id="place-selected"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={places ?? []}
            noOptionsText={(typeof places === 'undefined' || places == null)  ? 'Cargando...' : 'No hay resultados'}
            autoHighlight
            isOptionEqualToValue={(option, value) => option?.full === value?.full}
            renderOption={(defaultProps, option) => (
              <Box
                key={option._id}
              >
                <Box
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...defaultProps}
                  display='flex'
                  gap={2}
                >
                  <LocationOnOutlinedIcon fontSize='large' sx={{ color: colors.primary }} />
                  <Box
                    display='flex'
                    flexDirection='column'
                    gap='0.1em'
                  >
                    <Typography sx={{ fontWeight: 600, color: colors.secondary }}>{option?.name}</Typography>
                    <Typography sx={{ fontWeight: 400, color: colors.secondary }}>{option?.province}, {option?.country}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ background: colors.primary }} />
              </Box>
            )}
            renderInput={(params) => {
              return <TextField
                {...params}
                placeholder='¿A dónde vamos?'
                // {...params}
                InputProps={{
                  ...params.InputProps,
                  autoComplete: 'new-password',
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ margin: '0px 10px 0px 1em !important' }}>
                      <LocationOnIcon fontSize='medium' sx={{ color: colors.primary }} />
                    </InputAdornment>
                  ),
                }}
                variant='standard'
                sx={{ borderRadius: '1em' }}
              />
            }}
          />
          <DateRangePicker
            style={{}}
            size="lg"
            placeholder="Checkin - Checkout"
            preventOverflow={true}
            locale={{
              sunday: 'D',
              monday: 'L',
              tuesday: 'M',
              wednesday: 'X',
              thursday: 'J',
              friday: 'V',
              saturday: 'S',
              ok: 'APLICAR',
              today: 'HOY',
              yesterday: 'AYER',
              hours: 'HORA',
              minutes: 'MINUTOS',
              seconds: 'SEGUNDOS',

              // for DateRangePicker
              last7Days: 'ULTIMOS 7 DIAS',
            }}
            ranges={Ranges}
            format='dd-MM-yyyy'
            showOneCalendar={isMatchXS ? true : false}
            disabledDate={beforeToday()}
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
          />
          <ContainerButton
            variant='contained'
            fullWidth
            sx={{
              maxWidth: isMatch ? '100%' : '15vw',
              width: isMatch ? '100%' : '10em',
              '&:hover': {
                borderColor: `${colors.secondary}`,
                background: `${colors.secondary}`
              },
              padding: isMatch && '0em'
            }}
            onClick={handleClick}
          >
            Buscar
          </ContainerButton>
        </Box>
      </Box>
    </>
  )
}

