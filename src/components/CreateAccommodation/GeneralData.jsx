import { Box, Card, FormControl, FormHelperText, Grid, MenuItem, Select, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react'
import { colors } from '../../theme/theme';

const LabelInput = styled(Typography)(
    () => `
        color: ${colors.secondary}; 
        font-size: 1em;
        font-weight: 600;
      `
);


const ActiveFormInput = styled(TextField)(
    () => `
    background: ${colors.white};
    color: ${colors.secondary};
    border-radius: 0.4em;
    padding: 0.5em;
    box-shadow: 0px 0px 2px 0px gray;
    `
);

const ActiveSelect = styled(Select)(
    () => `
    background: ${colors.white};
    color: ${colors.secondary};
    border-radius: 0.4em;
    padding: 0.5em;
    box-shadow: 0px 0px 0.5px 0px gray;
    `
);

export const GeneralData = ({loading, categories = [], cities = []}) => {

    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.up('md'));
    const formik = useFormikContext();

    return (
        <Box>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
                <Grid item xs={12} sm={6}>
                    <LabelInput variant="caption">Nombre de la propiedad</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="title"
                        id="title"
                        fullWidth
                        size="small"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        placeholder="Hotel Morrison..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LabelInput variant="caption">Dirección</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="address"
                        id="address"
                        fullWidth
                        size="small"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        placeholder="Av. Acantilados 4394..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LabelInput variant="caption">Latitud</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="latitude"
                        id="latitude"
                        fullWidth
                        size="small"
                        value={formik.values.latitude}
                        onChange={formik.handleChange}
                        error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                        helperText={formik.touched.latitude && formik.errors.latitude}
                        placeholder="-36.543..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LabelInput variant="caption">Longitud</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="longitude"
                        id="longitude"
                        fullWidth
                        size="small"
                        value={formik.values.longitude}
                        onChange={formik.handleChange}
                        error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                        helperText={formik.touched.longitude && formik.errors.longitude}
                        placeholder="-67.92392..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl
                        fullWidth
                        error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                        <LabelInput sx={{ fontSize: '1em' }} variant="caption">Categoría</LabelInput>
                        <ActiveSelect
                            id="category"
                            value={formik.values.category}
                            onChange={(e) => formik.setFieldValue('category', e.target.value)}
                            displayEmpty
                            renderValue={(selected) => {
                                if(loading || categories.length === 0){
                                    return 'Cargando categorías...'
                                }
                                else if (selected.length === 0) {
                                    return <Typography sx={{ color: '#a2a2a2' }} fontWeight={500}>Seleccioná una categoría...</Typography>;
                                }

                                return categories.find(category => category.id === selected).title;
                            }}
                            sx={{ height: '2.78em' }}
                        >
                            <MenuItem disabled value="">
                                <em>Seleccioná una categoría...</em>
                            </MenuItem>
                            {
                                categories.map((category, i) => (
                                    <MenuItem key={i} value={category.id}>{category.title}</MenuItem>
                                ))
                            }
                        </ActiveSelect>
                        <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl
                        fullWidth
                        error={formik.touched.city && Boolean(formik.errors.city)}
                    >
                        <LabelInput sx={{ fontSize: '1em' }} variant="caption">Ciudad</LabelInput>
                        <ActiveSelect
                            id="city"
                            name='city'
                            value={formik.values.city}
                            onChange={(e) => formik.setFieldValue('city', e.target.value)}
                            displayEmpty
                            renderValue={(selected) => {
                                if(loading || cities.length === 0){
                                    return 'Cargando ciudades...'
                                }
                                else if (selected.length === 0) {
                                    return <Typography sx={{ color: '#a2a2a2' }} fontWeight={500}>Seleccioná una ciudad...</Typography>;
                                }

                                return cities.find(city => city.id === selected).name;
                            }}
                            sx={{ height: '2.78em' }}
                        >
                            <MenuItem disabled value="">
                                <em>Seleccioná una ciudad...</em>
                            </MenuItem>
                            {
                                cities.map((city, i) => (
                                    <MenuItem key={i} value={city.id}>{city.name}</MenuItem>
                                ))
                            }
                        </ActiveSelect>
                        <FormHelperText>{formik.touched.city && formik.errors.city}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <LabelInput variant="caption">Descripcion</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="description"
                        id="description"
                        fullWidth
                        multiline
                        rows={8}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        placeholder='Escribir aqui...'
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
