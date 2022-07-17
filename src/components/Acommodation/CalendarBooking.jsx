import { Box, Button, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';

// import { LocalizationProvider, StaticDateRangePicker, StaticDatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import esLocale from 'date-fns/locale/es';
import { colors } from '../../theme/theme'
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Acommodation/date-picker.css";
import { useNavigate, useParams } from 'react-router-dom';
// import '../../styles/Acommodation/date-picker.css'

/**
 * Mock de prueba de fechas ya reservadas
 */

const ContainerButton = styled(Button)(
    () => `
      font-size: 1.5em;
      font-weight: 400;
      color: ${colors.white};
      background: ${colors.secondary};
      text-transform: none;
    `
);

export const CalendarBooking = ({ bookings = [] }) => {

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
    const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const { id } = useParams();

    const [startDate, setStartDate] = useState(null);
    const [bookingDates, setBookingDates] = useState([]);

    useEffect(() => {
        //map all the bookings to get the dates
        //then, for each booking, extrar startDate and endDate
        //then, add the entire range to the bookingDates
        //and check that all the dates are not already in the bookingDates
        //dont use moment.range because it is not working
        const bookingDates = bookings.map(booking => {
            const startDate = moment(booking.startDate);
            const endDate = moment(booking.finishDate);
            const range = [];
            while (!startDate.isAfter(endDate)) {
                range.push(startDate.format('YYYY-MM-DD'));
                startDate.add(1, 'days');
            }
            return range;
        }
        ).reduce((acc, curr) => {return acc.concat(curr);}, []);
        //delete the duplicates
        const uniqueBookingDates = bookingDates.filter((value, index, self) => self.indexOf(value) === index);
        setBookingDates(uniqueBookingDates);
    }, [bookings]);


    const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const datesExcluded = bookingDates.map(date => {
        const day = new Date(date);
        day.setDate(day.getDate() + 1);
        return day;
    });


    return (
        <Box
            sx={{ padding: '1.7rem', background: 'rgb(233, 232, 232)', borderRadius: '0.5rem' }}
            display="flex"
            flexDirection="column"
            gap={2}
        // alignItems="center"
        // justifyContent="center"
        >
            <Typography
                variant='h4'
                fontSize='1.5rem'
                fontWeight={700}
                color={colors.secondary}
            >
                Fechas disponibles
            </Typography>
            <Box
                display="flex"
                flexDirection={isMatchMD ? 'column' : 'row'}
                gap={2}
                alignItems="center"
            >
                <DatePicker
                    selectsRange={false}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 364)}
                    locale={es}
                    isClearable={false}
                    className="datepicker"
                    shouldCloseOnSelect={false}
                    monthsShown={isMatch ? 1 : 2}
                    calendarStartDay={1}
                    inline={true}
                    excludeDates={datesExcluded}
                    disabledKeyboardNavigation
                    readOnly
                />
                <Box
                    display="flex"
                    flexDirection={isMatch || !isMatchMD ? 'column' : 'row'}
                    gap={2}
                    maxWidth={isMatchMD ? '100%' : '30vw'}
                    sx={{ background: !isMatchMD ? colors.white : 'none', padding: '1rem', borderRadius: '0.5rem' }}
                >
                    <Typography
                        variant='h5'
                        fontSize='1rem'
                        fontWeight={700}
                    >
                        Agregá tus fechas de viaje para obtener precios exactos
                    </Typography>
                    <ContainerButton
                        variant='contained'
                        fullWidth
                        sx={{
                            '&:hover': {
                                borderColor: `${colors.secondary}`,
                                background: `${colors.secondary}`
                            },
                        }}
                        onClick={() => navigate(`/accommodations/${id}/booking`)}
                    >
                        Iniciar reserva
                    </ContainerButton>
                </Box>
            </Box>
        </Box>
    )
}
