import { Box, Grid, IconButton, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik, useFormikContext } from 'formik';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { colors } from '../../theme/theme';
import * as yup from 'yup';


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

export const ImageInput = () => {

    const mainFormik = useFormikContext();

    const formik = useFormik({
        initialValues: {
            title: '',
            src: '',
        },
        validationSchema: yup.object().shape({
            title: yup
                .string()
                .required('El título de la imagen es requerido')
                .max(25, 'El título de la imagen no puede tener más de 25 caracteres')
                .min(3, 'El título de la imagen no puede tener menos de 3 caracteres'),
            src: yup
                .string()
                .required('La imagen es requerida')
                .matches(/^https?:\/\//, 'La imagen debe tener una URL válida')
                .min(3, 'La imagen no puede tener menos de 3 caracteres'),
        }),
        onSubmit: (values) => {
            mainFormik.setFieldValue('images', [...mainFormik.values.images, values]);
            formik.resetForm();
        }
    });
    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component='form'
            onSubmit={formik.handleSubmit}
            sx={{ 
                background: colors.gray3, 
                borderRadius: '10px',
                boxShadow: '0px 0px 4px 0px gray',
            }} 
            padding={2}
        >
            <Grid
                container
                direction="row"
            >
                <Grid item xs={9} md={11}>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                    >
                        <Grid item xs={12} md={4}>
                            <LabelInput variant="caption">Título</LabelInput>
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
                                placeholder="Salón principal..."
                                InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <LabelInput variant="caption">URL</LabelInput>
                            <br />
                            <ActiveFormInput
                                variant="standard"
                                name="src"
                                id="src"
                                fullWidth
                                size="small"
                                value={formik.values.src}
                                onChange={formik.handleChange}
                                error={formik.touched.src && Boolean(formik.errors.src)}
                                helperText={formik.touched.src && formik.errors.src}
                                placeholder="https://www.code-inn.ar/images/234..."
                                InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} md={1} alignSelf='center' justifySelf='flex-end'>
                    <IconButton
                        sx={{ color: colors.secondary }}
                        onClick={formik.handleSubmit}
                    >
                        <AddBoxIcon sx={{ fontSize: '3em' }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export const ImageItem = ({ index, title, src }) => {

    const formik = useFormikContext();

    const handleClickDelete = () => {
        formik.setFieldValue('images', formik.values.images.filter((item, i) => i !== index));
    }
    return (
        <Box 
            sx={{ 
                background: colors.gray3, 
                borderRadius: '10px',
                boxShadow: '0px 0px 4px 0px gray',
            }} 
            padding={2}>
            <Grid
                container
                direction="row"
            >
                <Grid item xs={9} md={11}>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                    >
                        <Grid item xs={12} md={4}>
                            <LabelInput variant="caption">Título</LabelInput>
                            <br />
                            <ActiveFormInput
                                variant="standard"
                                name="title"
                                id="title"
                                fullWidth
                                size="small"
                                value={title}
                                InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <LabelInput variant="caption">URL</LabelInput>
                            <br />
                            <ActiveFormInput
                                variant="standard"
                                name="title"
                                id="title"
                                fullWidth
                                size="small"
                                value={src}
                                InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} md={1} alignSelf='center' justifySelf='flex-end'>
                    <IconButton
                        sx={{ color: colors.secondary }}
                        onClick={handleClickDelete}
                    >
                        <CancelIcon sx={{ fontSize: '3em' }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export const Images = () => {
    const formik = useFormikContext();

    return (
        <Box display='flex' flexDirection='column' gap={2}>
            <Typography
                variant="h3"
                fontWeight={700}
                fontSize="24px"
                color={colors.secondary}
            >
                Cargar imágenes
            </Typography>
            <Box
                padding={2}
                display='flex'
                flexDirection='column'
                gap={2}
            >
                {formik.values.images?.length > 0 && <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="18px"
                    color={colors.secondary}
                >
                    Imágenes cargadas
                </Typography>}
                {
                    formik.values.images?.map((image, index) => (
                        <ImageItem key={index} title={image.title} src={image.src} index={index} />
                    ))
                }
                <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="18px"
                    color={colors.secondary}
                >
                    Nueva imagen
                </Typography>
                <ImageInput />
            </Box>
        </Box>
    )
}
