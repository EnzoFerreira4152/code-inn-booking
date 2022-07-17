import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { colors } from '../../theme/theme';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const Header = ({ name, type }) => {

    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
    const {id} = useParams();
    const [strNav, setStrNav] = useState('/');
    useEffect(() =>{
        if(window.location.pathname.includes('booking')) setStrNav(`/accommodations/${id}`)
    }, [window.location.pathname])

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems='center'
            padding={isMatchMD ? '0.7em 0.5em' : '0.7em 3em'}
            sx={{ background: colors.primary, color: colors.white }}
        >
            <Box
                display="flex"
                flexDirection="column"
            >
                <Typography variant='h6' fontWeight={700} fontSize='14px'>{type?.toUpperCase()}</Typography>
                <Typography variant='h3' fontWeight={700} fontSize='28px'>{name}</Typography>
            </Box>
            <Link
                to={strNav}
                style={{ textDecoration: 'none', color: colors.white }}
            >
                <ArrowBackIosIcon fontSize='large' />
            </Link>
        </Box>
    )
}
