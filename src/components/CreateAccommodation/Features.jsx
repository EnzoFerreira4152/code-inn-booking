import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Typography } from '@mui/material';
import { colors } from '../../theme/theme';
import * as Icons from '@mui/icons-material';
import { useFormikContext } from 'formik';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DynamicIcon = ({ icon, ...props }) => {
    const iconName = icon.replace('Icon', '')
    if (Icons[iconName]) {
        return React.createElement(Icons[iconName], props);
    }
    else {
        return <></>
    }
}

export default function Features({characteristics, loading}) {

    const formik = useFormikContext();

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            <Typography
                variant="h3"
                fontWeight={700}
                fontSize="24px"
                color={colors.secondary}
            >
                Atributos
            </Typography>
            <Typography
                variant="h3"
                fontWeight={700}
                fontSize="18px"
                color={colors.secondary}
            >
                Seleccionar atributos
            </Typography>
            <Autocomplete
                fullWidth
                multiple
                id="characteristics"
                name="characteristics"
                options={characteristics}
                disableCloseOnSelect
                onChange={(e,values) => {
                    values = values.map(value => value.id);
                    formik.setFieldValue('characteristics', values);
                }}
                getOptionLabel={(option) => (<DynamicIcon icon={option.icon} sx={{color: colors.secondary}}></DynamicIcon>
                )}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        <DynamicIcon key={option.title} icon={option.icon} sx={{color: colors.secondary}}></DynamicIcon>
                        {option.title}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} label="Atributos" placeholder="Agregar..." />
                )}
            />
        </Box>
    );
}




