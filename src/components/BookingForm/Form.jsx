import { Box, Card, Grid, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/authContext'
import { colors } from '../../theme/theme';

const LabelInput = styled(Typography)(
    () => `
        color: ${colors.secondary}; 
        font-size: 1em;
        font-weight: 600;
      `
);

const FormInput = styled(TextField)(
    () => `
    background: ${colors.lighGray};
    color: ${colors.secondary};
    border-radius: 0.4em;
    padding: 0.5em;
  `
);

const ActiveFormInput = styled(FormInput)(
    () => `
    background: ${colors.white};
    color: ${colors.secondary};
    border-radius: 0.4em;
    padding: 0.5em;
    box-shadow: 0px 0px 2px 0px gray;
    `
);

export const FormComponent = () => {

    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.up('md'));
    const { user } = useContext(AuthContext)
    const { name, surname, email } = user;
    const formik = useFormikContext();

    useEffect(() => {
        formik.setFieldValue('name', name);
        formik.setFieldValue('surname', surname);
        formik.setFieldValue('email', email);
    }, []);



    return (
        <Box>
            <Card
                elevation={5}
                sx={{ padding: isMatchMD ? '2em' : '1em', borderRadius: '0.4em' }}
            >
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <LabelInput variant="caption">Nombre</LabelInput>
                        <br />
                        <FormInput
                            variant="standard"
                            name="name"
                            id="name"
                            fullWidth
                            size="small"
                            value={name}
                            placeholder="Nombre"
                            disabled
                            InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LabelInput variant="caption">Apellido</LabelInput>
                        <br />
                        <FormInput
                            variant="standard"
                            name="surname"
                            id="surname"
                            fullWidth
                            size="small"
                            value={surname}
                            placeholder="Apellido"
                            disabled
                            InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LabelInput variant="caption">Correo electrónico</LabelInput>
                        <br />
                        <FormInput
                            variant="standard"
                            name="email"
                            id="email"
                            fullWidth
                            size="small"
                            value={email}
                            placeholder="Correo electrónico"
                            disabled
                            InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LabelInput variant="caption">Ciudad</LabelInput>
                        <br />
                        <ActiveFormInput
                            variant="standard"
                            name="city"
                            id="city"
                            fullWidth
                            size="small"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            placeholder='Ingresar ciudad...'
                            InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                        />
                    </Grid>
                </Grid>

            </Card>
        </Box>
    )
}
