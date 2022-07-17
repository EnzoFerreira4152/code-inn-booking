import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import { Formik, useFormik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Acommodation/Header'
import Policies from '../components/Acommodation/Policies'
import { ArrivalTime } from '../components/BookingForm/ArrivalTime'
import { Calendar } from '../components/BookingForm/Calendar'
import { FormComponent } from '../components/BookingForm/Form'
import { Resume } from '../components/BookingForm/Resume'
import { colors } from '../theme/theme';
import * as yup from 'yup'
import useFetch from 'use-http'
import { apiEndpoint } from '../configuration/endpoints';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment'


const validationSchema = yup.object({
    arrivalDate: yup.
        string().
        required('La fecha de llegada es requerida'),
    departureDate: yup.
        string().
        required('La fecha de salida es requerida'),
    arrivalTime: yup.
        string().
        required('El horario de llegada es requerido'),
    name: yup.
        string().
        required('El nombre es requerido'),
    surname: yup.
        string().
        required('El apellido es requerido'),
    email: yup.
        string().
        required('El email es requerido').
        email('El email no es válido'),
    city: yup.
        string().
        required('La ciudad es requerida'),
});


export const BookingForm = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [accommodation, setAccommodation] = useState(null);
    const [bookings, setBookings] = useState([]);

    const { id: accommodationId } = params;
    const user = JSON.parse(localStorage.getItem('user'));

    const { get, post, error, loading, response } = useFetch(apiEndpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.jwt,
        }
    });


    useEffect(() => {
        async function checkId() {
            const result = await get('/accommodations/id/' + params.id);
            if (response.ok) setAccommodation(result);
            else navigate('/notfound');
        }
        async function getBookings() {
            const result = await get('/reservations/accommodation/' + params.id);
            if (response.ok) setBookings(result);
        }
        checkId();
        getBookings();
    }, [])

    return (
        <>
            {accommodation
                ? <Box>
                    <Box>
                        <Header name={accommodation?.title} type={accommodation?.category.title} />
                    </Box>
                    <Typography
                        variant='h3'
                        fontWeight={700}
                        fontSize='1.7em'
                        color={colors.secondary}
                        padding='1.5em 1.5em 0em 1em'
                        position='relative'
                        top='0.5em'
                    >
                        Completá tus datos
                    </Typography>
                    <Formik
                        initialValues={{
                            arrivalDate: '',
                            departureDate: '',
                            arrivalTime: 'Seleccioná una hora',
                            name: '',
                            surname: '',
                            email: '',
                            city: '',
                            accommodation: accommodationId,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            const payload = {
                                user: {
                                    id: user.id,
                                },
                                accommodation: {
                                    id: accommodationId,
                                },
                                arrivalTime: values.arrivalTime.split(' ')[0],
                                startDate: moment(values.arrivalDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                                finishDate: moment(values.departureDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                            }
                            const resp = await post('/reservations/create', payload);
                            console.log(resp);
                            if (response.ok)
                                navigate('/accommodations/' + accommodationId + '/congrats');
                            else if (response.status === 403) {
                                toast.error('Un usuario administrador no puede realizar una reserva', {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                });
                            } else {
                                toast.error('Error al crear la reserva, por favor intente nuevamente', {
                                    position: 'top-center',
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                });
                            }
                        }}
                    >
                        <Form>
                            <Grid
                                sx={{
                                    padding: '1.5em',
                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={4}
                            >
                                <ToastContainer />
                                <Grid item lg={8} xs={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="stretch"
                                        spacing={4}
                                    >
                                        <Grid item xs={12}>
                                            <FormComponent />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Calendar bookings={bookings}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ArrivalTime />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <Resume
                                        title={accommodation.title}
                                        type={accommodation.category.title}
                                        address={accommodation.address}
                                        stars={accommodation.stars}
                                        image={accommodation.images[0]}
                                        loading={loading}
                                    />
                                </Grid>

                            </Grid>
                        </Form>
                    </Formik>
                    <Box
                        sx={{ backgroundColor: colors.white, paddingTop: '1.5em', paddingBottom: '1.5em' }}
                    >
                        <Policies
                            safety={accommodation.health_safety}
                            cancellation={accommodation.cancellation_policy}
                            {...accommodation} />
                    </Box>
                </Box>
                : <LinearProgress color="inherit" />
            }
        </>
    )
}
