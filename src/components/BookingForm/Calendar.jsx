import { Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { colors } from '../../theme/theme';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Acommodation/date-picker.css";
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';

export const Calendar = ({ bookings = [] }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const formik = useFormikContext();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
    ).reduce((acc, curr) => { return acc.concat(curr); }, []);
    //delete the duplicates
    const uniqueBookingDates = bookingDates.filter((value, index, self) => self.indexOf(value) === index);
    setBookingDates(uniqueBookingDates);
  }, [bookings]);


  const onChange = (dates) => {
    const [start, end] = dates;

    //check if range from start to end date doesnt overlap with any of the booking dates
    let isValid = true;
    bookingDates.forEach(date => {
      date = moment(date);
      if (start < date && end > date) {
        isValid = false;
      }
    }
    );
    if (!isValid) {
      toast.error('Por favor, seleccione un rango de fechas válido', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
      setStartDate(null);
      setEndDate(null);
      formik.setFieldValue('arrivalDate', '');
      formik.setFieldValue('departureDate', '');
    } else {
      setStartDate(start);
      setEndDate(end);
      formik.setFieldValue('arrivalDate', start.toLocaleDateString('es-AR'));
      formik.setFieldValue('departureDate', end.toLocaleDateString('es-AR'));
    }
  };

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

  //check starDate and endDate if exists on localstorage and assign as initialValues
  useEffect(() => {

    if (localStorage.getItem('startDate') && localStorage.getItem('endDate')) {
      const arrivalDate = new Date(localStorage.getItem('startDate'));
      const departureDate = new Date(localStorage.getItem('endDate'));
      if (arrivalDate && departureDate) {
        let isValid = true;
        bookingDates.forEach(date => {
          if (arrivalDate < date && departureDate > date) {
            isValid = false;
          }
        }
        );
        if (isValid) {
          setStartDate(new Date(arrivalDate));
          setEndDate(new Date(departureDate));
          formik.setFieldValue('arrivalDate', arrivalDate.toLocaleDateString('es-AR'));
          formik.setFieldValue('departureDate', departureDate.toLocaleDateString('es-AR'));
        } else {
          toast.error('Por favor, seleccione un rango de fechas válido', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
          });
          localStorage.removeItem('startDate');
          localStorage.removeItem('endDate');
        }
      }
    }
  }, []);



  return (
    <Box>
      <Typography
        variant='h3'
        fontWeight={700}
        fontSize='1.7em'
        color={colors.secondary}
        gutterBottom
      >
        Seleccioná tu fecha de reserva
      </Typography>

      <Card
        elevation={5}
        sx={{ borderRadius: '0.4em' }}
      >
        <DatePicker
          selectsRange
          selected={startDate}
          minDate={new Date()}
          maxDate={addDays(new Date(), 364)}
          locale={es}
          isClearable={false}
          shouldCloseOnSelect={false}
          monthsShown={isMatch ? 1 : 2}
          calendarStartDay={1}
          inline={true}
          excludeDates={datesExcluded}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsDisabledDaysInRange={false}
        />
      </Card>
    </Box>
  )
}
