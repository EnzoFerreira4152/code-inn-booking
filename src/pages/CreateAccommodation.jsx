import { Box, Button, Card, Grid, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Header } from '../components/Acommodation/Header'
import { colors } from '../theme/theme';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { FormComponent } from '../components/BookingForm/Form';
import { Calendar } from '../components/BookingForm/Calendar';
import { ArrivalTime } from '../components/BookingForm/ArrivalTime';
import { GeneralData } from '../components/CreateAccommodation/GeneralData';
import Features from '../components/CreateAccommodation/Features';
import { CreateFeatures } from '../components/CreateAccommodation/CreateFeature';
import { Policies } from '../components/CreateAccommodation/Policies';
import { Images } from '../components/CreateAccommodation/Images';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { apiEndpoint } from '../configuration/endpoints';
import useFetch from 'use-http';
import { useNavigate } from 'react-router-dom';

const ContainerButton = styled(LoadingButton)(
    () => `
      color: ${colors.white}; 
      border-color: ${colors.secondary};
      background-color: ${colors.secondary};
      padding: 0.5em 1.3em;
      text-transform: none;
      font-size: 1.4em;
      width: 100%;
      `
);

const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('El nombre de la propiedad es requerido')
        .max(50, 'El nombre de la propiedad no puede tener más de 50 caracteres')
        .min(3, 'El nombre de la propiedad no puede tener menos de 3 caracteres'),
    city: yup
        .string()
        .required('La ciudad es requerida'),
    category: yup
        .string()
        .required('La categoría es requerida'),
    address: yup
        .string()
        .required('La dirección es requerida')
        .max(100, 'La dirección no puede tener más de 100 caracteres')
        .min(3, 'La dirección no puede tener menos de 3 caracteres'),
    latitude: yup
        .string()
        .required('La latitud es requerida')
        .matches(/^-?\d{1,3}\.\d+$/, 'La latitud debe ser un número entre -90 y 90 con decimales'),
    longitude: yup
        .string()
        .required('La longitud es requerida')
        .matches(/^-?\d{1,3}\.\d+$/, 'La longitud debe ser un número entre -180 y 180  con decimales'),
    description: yup
        .string()
        .required('La descripción es requerida')
        .max(1000, 'La descripción no puede tener más de 1000 caracteres')
        .min(3, 'La descripción no puede tener menos de 3 caracteres'),
    cancellation_policy: yup
        .string()
        .required('La política de cancelación es requerida')
        .max(300, 'La política de cancelación no puede tener más de 300 caracteres')
        .min(3, 'La política de cancelación no puede tener menos de 3 caracteres'),
});



export const CreateAccommodation = () => {

    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
    const [characteristics, setCharacteristics] = React.useState([]);
    const [ categories, setCategories ] = React.useState([]);
    const [ cities, setCities ] = React.useState([]);

    const {loading, get, post, response} = useFetch(apiEndpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).jwt}`
    }});

    const navigate = useNavigate();


    React.useEffect(() => {
        async function getCities() {
            const response = await get('/cities/all');
            setCities(response);
        }
        async function getCategories() {
            const response = await get('/categories/all');
            setCategories(response);
        }
        async function getCharacteristics() {
            const response = await get('/characteristics/all');
            setCharacteristics(response);
        }

        getCities();
        getCategories();
        getCharacteristics();
    }, []);

    return (
        <>
            <Header name="Administración" />
            <Box
                display="flex"
                flexDirection="column"
                padding={isMatchMD ? "1em 0em" : "2em 3em"}
                gap={isMatchMD ? "1em" : "2em"}
                sx={{backgroundColor: colors.gray3}}
            >
                <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="24px"
                    color={colors.secondary}
                >
                    Crear propiedad
                </Typography>
                <Formik
                    initialValues={{
                        title: '',
                        category: '',
                        address: '',
                        city: '',
                        latitude: '',
                        longitude: '',
                        description: '',
                        characteristics: [],
                        rules: [],
                        health_safety: [],
                        cancellation_policy: '',
                        images: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const valuesInFormat = {
                            title: values.title,
                            category: {id: values.category},
                            address: values.address,
                            city: {id: values.city},
                            latitude: values.latitude,
                            longitude: values.longitude,
                            description: values.description,
                            cancellation_policy: values.cancellation_policy,
                            characteristics: values.characteristics.map(characteristic => {return {id: characteristic}}),
                            rules: values.rules,
                            health_safety: values.health_safety,
                            images: values.images.map(image => {return {title: image.title, imgUrl: image.src}}),
                            rating: 8.0,
                            rating_text: 'Muy bueno',
                            stars: 4,
                        }
                        console.log(valuesInFormat);
                        const resp = await post('/accommodations/create', valuesInFormat);
                        if(response.ok) {
                            navigate('/administration/success/' + resp.id);
                        } else{
                            toast.error("Error al crear la propiedad, por favor intente nuevamente",
                            {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                            });
                        }
                    }}
                >
                    <Form>
                        <Card sx={{paddingBottom: '1em'}}>
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
                                <Grid item xs={12}>
                                    <GeneralData 
                                        loading={loading}
                                        categories={categories}
                                        cities={cities}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Features 
                                        loading={loading}
                                        characteristics={characteristics}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CreateFeatures 
                                        loading={loading}
                                        characteristics={characteristics}
                                        setCharacteristics={setCharacteristics}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Policies />
                                </Grid>
                                <Grid item xs={12}>
                                    <Images />
                                </Grid>
                                <Grid item xs={12} sm={8} md={6} lg={4}>
                                    <ContainerButton
                                        variant='contained'
                                        sx={{
                                            '&:hover': {
                                                borderColor: `${colors.secondary}`,
                                                background: `${colors.secondary}`
                                            },
                                            alignSelf: 'center'
                                        }}
                                        type="submit"
                                        loading={loading}
                                    >
                                        Crear propiedad
                                    </ContainerButton>
                                </Grid>
                            </Grid>
                        </Card>
                    </Form>
                </Formik>
            </Box>
        </>
    )
}
