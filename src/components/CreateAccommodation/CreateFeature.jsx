import { Autocomplete, Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import * as React from 'react'
import { colors } from '../../theme/theme';
import { useFormik } from 'formik';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import * as yup from 'yup';
import * as Icons from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useFetch from 'use-http';
import { apiEndpoint } from '../../configuration/endpoints';
import { toast } from 'react-toastify';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//filter on Icons the elements whos key that cointains Outlined, Sharp, Rounded, TwoTone, etc. 
let iconsFilter = Object.keys(Icons).filter(key => !(key.includes('Outlined') || key.includes('Sharp') || key.includes('Rounded') || key.includes('TwoTone')));

// filter icons and leave only 300 random icons
iconsFilter = iconsFilter.sort(() => 0.5 - Math.random()).slice(0, 300);

const DynamicIcon = ({ icon, ...props }) => {
    if (Icons[icon]) {
        return React.createElement(Icons[icon], props);
    }
    else {
        return <></>
    }
}

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
    border-radius: 5px;
    padding: 0.5em;
    box-shadow: 0px 0px 2px 0px gray;
    height: 4em;
    `
);

const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('El nombre del atributo es requerido')
        .max(25, 'El nombre del atributo no puede tener más de 25 caracteres')
        .min(3, 'El nombre del atributo no puede tener menos de 3 caracteres'),
    icon: yup
        .string()
        .required('El icono es requerido'),
});

export const IconInput = ({ characteristics, setCharacteristics }) => {

    const { post, loading, response } = useFetch(apiEndpoint + '/characteristics', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt,
        },
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            icon: '',
        },
        validationSchema,
        onSubmit: async (values) => {

            const resp = await post('/create', values);
            console.log(resp);
            if (response.ok) {
                const newCharacteristic = {
                    id: characteristics.length + 1,
                    title: values.title,
                    icon: values.icon,
                }
                setCharacteristics([...characteristics, newCharacteristic]);
                formik.resetForm();
            } else {
                toast.error('Error al crear el atributo, por favor intente de nuevo');
            }

        }
    });
    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down('md'));
    const [icons, setIcons] = React.useState(iconsFilter);

    React.useEffect(() => {
        if (characteristics.length > 0) {
            setIcons(iconsFilter.filter(icon => !characteristics.some(characteristic => characteristic.icon === icon)));
        }
    }, [characteristics]);

    return (
        <Box
            component='form'
            onSubmit={formik.handleSubmit}
        >
            {loading
                ? <Box display='flex' alignItems='center' justifyContent='center'>
                    <CircularProgress color="inherit" />
                </Box>
                : <Grid
                    container
                    direction="row"
                >
                    <Grid item xs={9} md={11}>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                        >
                            <Grid item xs={12} md={8}>
                                <FormControl
                                    fullWidth
                                    error={formik.touched.title && formik.errors.title}
                                >
                                    <LabelInput variant="caption">Nombre</LabelInput>
                                    <ActiveFormInput
                                        variant="standard"
                                        name="title"
                                        id="title"
                                        fullWidth
                                        size="small"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        placeholder="Wifi..."
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ fontSize: '2em', height: '2em' }}
                                    />
                                    <FormHelperText>{formik.touched.title && formik.errors.title}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LabelInput variant="caption">Ícono</LabelInput>
                                <br />
                                <Autocomplete
                                    fullWidth
                                    id="icon"
                                    name="icon"
                                    options={icons}
                                    disableCloseOnSelect
                                    value={formik.values.icon}
                                    onChange={(e, value) => {
                                        formik.setFieldValue('icon', value);
                                    }}
                                    getOptionLabel={(option) => option}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <DynamicIcon key={option} icon={option} sx={{color: colors.secondary}}></DynamicIcon>
                                            {option}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <ActiveFormInput {...params} placeholder='IconWifi...' sx={{ padding: '0em' }} />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={1} alignSelf='center' justifySelf='flex-end'>
                        <IconButton
                            sx={{ color: colors.secondary }}
                            onClick={formik.handleSubmit}
                        >
                            <AddBoxIcon sx={{ fontSize: '3.5em' }} />
                        </IconButton>
                    </Grid>
                </Grid>}
        </Box>
    )
}


export const CreateFeatures = ({ loading, characteristics, setCharacteristics }) => {

    return (
        <Box display='flex' flexDirection='column' gap={2}>
            <Typography
                variant="h3"
                fontWeight={700}
                fontSize="18px"
                color={colors.secondary}
            >
                Agregar nuevos atributos
            </Typography>
            <Box padding={2} sx={{ background: colors.gray3, borderRadius: '10px' }}>
                <IconInput
                    loading={loading}
                    characteristics={characteristics}
                    setCharacteristics={setCharacteristics}
                />
            </Box>
        </Box>
    )
}