import { Avatar, Box, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../theme/theme';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useFormik, useFormikContext } from 'formik';
import * as yup from 'yup';

const ActiveFormInput = styled(TextField)(
    () => `
    background: ${colors.white};
    color: ${colors.secondary};
    border-radius: 0.4em;
    padding: 0.5em;
    box-shadow: 0px 0px 2px 0px gray;
    `
);
const LabelInput = styled(Typography)(
    () => `
        color: ${colors.secondary}; 
        font-size: 1em;
        font-weight: 600;
      `
);

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
}));

export const ListCodeItem = ({ description, fieldName }) => {
    const formik = useFormikContext();

    //extract element form fieldName array of values, find by description
    const handleClickDelete = () =>{
        const index = formik.values[fieldName].findIndex(item => (item.description === description || item.title === description));
        formik.values[fieldName].splice(index, 1);
        formik.setFieldValue(fieldName, formik.values[fieldName]);
    }

    return (
        <ListItem
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={handleClickDelete}
                >
                    <DeleteIcon color='error'/>
                </IconButton>
            }
        >
            <ListItemText
                primary={description}
            />
        </ListItem>
    )
}

export const ListAddItem = ({ fieldName }) => {

    const formik = useFormikContext();
    console.log(formik.values);

    const formik2 = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: yup.object().shape({
            description: yup
                .string()
                .required('La regla es requerida')
                .max(60, 'La regla no puede tener más de 60 caracteres')
                .min(3, 'La regla no puede tener menos de 3 caracteres'),
        }),
        onSubmit: values => {
            let valuesInFormat = {};
            if (fieldName === 'health_safety') valuesInFormat = { title: values.description };
            else valuesInFormat = { description: values.description };
            formik.setFieldValue(fieldName, [...formik.values[fieldName], valuesInFormat]);
            formik2.resetForm();
        }
    }
    )
    return (
        <Box
            component='form'
            padding={2}
        >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
            >
                <Grid item xs={10}>
                    <LabelInput variant="caption">Regla</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="description"
                        id="description"
                        fullWidth
                        size="small"
                        value={formik2.values.description}
                        onChange={formik2.handleChange}
                        error={formik2.touched.description && Boolean(formik2.errors.description)}
                        helperText={formik2.touched.description && formik2.errors.description}
                        placeholder="No mascotas..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <AddBoxIcon
                        sx={{ fontSize: '3.5em', color: colors.secondary, cursor: 'pointer' }}
                        onClick={formik2.handleSubmit}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}


export const Rules = ({ title, fieldName }) => {
    const formik = useFormikContext();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="18px"
                    color={colors.secondary}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Demo>
                    <List>
                        <ListAddItem fieldName={fieldName} />
                        {
                            formik.values[fieldName]?.map((item, index) => {
                                return (
                                    <ListCodeItem 
                                        key={index} 
                                        description={item.description ?? item.title} 
                                        fieldName={fieldName}
                                    />
                                )
                            })
                        }
                    </List>
                </Demo>
            </Grid>
        </Grid>
    )
}

export const Cancellation = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="18px"
                    color={colors.secondary}
                >
                    Política de cancelación
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Demo>
                    <List>
                        <CancellationInput/>
                    </List>
                </Demo>
            </Grid>
        </Grid>
    )
}

export const CancellationInput = ({ fieldName }) => {

    const formik = useFormikContext();
    return (
        <Box
            component='form'
            padding={2}
        >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
            >
                <Grid item xs={12}>
                    <LabelInput variant="caption">Regla</LabelInput>
                    <br />
                    <ActiveFormInput
                        variant="standard"
                        name="cancellation_policy"
                        id="cancellation_policy"
                        multiline
                        minRows={1}
                        fullWidth
                        size="small"
                        value={formik.values.cancellation_policy}
                        onChange={formik.handleChange}
                        error={formik.touched.cancellation_policy && Boolean(formik.errors.cancellation_policy)}
                        helperText={formik.touched.cancellation_policy && formik.errors.cancellation_policy}
                        placeholder="48hs mínimo de anticipación..."
                        InputProps={{ style: { fontWeight: 600 }, disableUnderline: true }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export const Policies = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
        >
            <Grid item xs={12}>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    fontSize="24px"
                    color={colors.secondary}
                >
                    Políticas del lugar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card
                    sx={{ padding: 2 }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={4}
                    >
                        <Grid item xs={12} md={6} lg={4}>
                            <Rules title='Normas de la casa' fieldName='rules' />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Rules title='Salud y seguridad' fieldName='health_safety' />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Cancellation />
                        </Grid>
                    </Grid>
                </Card>
            </Grid >
        </Grid >
    )
}
