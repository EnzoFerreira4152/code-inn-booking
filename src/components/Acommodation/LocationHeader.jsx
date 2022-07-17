import React from 'react'
import { Box, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import { colors } from '../../theme/theme';
import RoomIcon from '@mui/icons-material/Room';
import { styled } from '@mui/system';
import { ratingToText } from '../../utils'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: colors.secondary,
    },
    '& .MuiRating-iconHover': {
        color: colors.secondary,
    },
});

export const LocationHeader = ({ location, distance, puntuation, reviews }) => {
    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
    const isMatchSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems='flex-start'
            gap={2}
            padding={isMatchMD ? '0.7em 0.5em' : '0.7em 3em'}
            sx={{ background: colors.gray3, color: colors.secondary }}
        >
            <Box display="flex">
                <RoomIcon sx={{ color: colors.primary }} />
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth={!isMatchSM ? '100%' : '40vw'}
                >
                    <Typography variant='h6' fontWeight={700} fontSize='14px'>{location}</Typography>
                    {!isMatchSM && <Typography variant='h6' fontWeight={700} fontSize='14px'>{distance}</Typography>}
                </Box>
            </Box>
            <Box display="flex" gap={1}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems='flex-end'
                    justifyContent='center'
                >
                    <Typography variant='h6' fontWeight={700} fontSize='14px'>{ratingToText(puntuation)}</Typography>
                    <StyledRating name="read-only" value={reviews} readOnly />
                </Box>
                <Box
                    sx={{ borderRadius: '10px', background: colors.primary, color: '#fff', padding: '0.5em 1em' }}
                >
                    <Typography variant='h5' fontWeight={700} width='0.7em' textAlign='center'>{Math.floor(puntuation)}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
