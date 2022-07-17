import { Box, Grid, LinearProgress, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from 'use-http'
import ProductList from '../components/ProductList'
import { apiEndpoint } from '../configuration/endpoints';
import moment from 'moment'

export const SearchAcommodation = () => {

    const [URLSearchParams] = useSearchParams();
    const cityName = URLSearchParams.get('city');
    const startDate = URLSearchParams.get('startDate');
    const endDate = URLSearchParams.get('finishDate');
    const [accommodations, setAccommodations] = useState(null);

    const { get, error, loading, response } = useFetch(apiEndpoint);

    useEffect(() => {
        async function getProductsFromCity() {
            if(cityName && startDate && endDate) {
                const url = `/accommodations/search?city=${encodeURIComponent(cityName)}&startDate=${moment(startDate).format('YYYY-MM-DD')}&finishDate=${(moment(endDate).format('YYYY-MM-DD'))}`;
                const apiResponse = await get(url);
                if (response.ok) setAccommodations(apiResponse);
            } else{
            const apiResponse = await get(`/accommodations/search?city=${encodeURIComponent(cityName)}`);
            if (response.ok) setAccommodations(apiResponse);
            }
        };
        getProductsFromCity();
    }, []);

    /*Function to define title
    * optional inputs: cityName, startDate, endDate
    */
    const defineTitle = (cityName, startDate, endDate) => {
        let title = "";
        if (cityName) {
            title += cityName;
        }
        if (startDate && endDate) {
            const startDateHuman = new Date(startDate).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long',
            });
            const endDateHuman = new Date(endDate).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long'
            });
            title += " - Desde el " + startDateHuman + " hasta el  " + endDateHuman;
            localStorage.setItem('startDate', startDate);
            localStorage.setItem('endDate', endDate);
        }
        return title;
    }


    return (
        <Box>
            {loading && <LinearProgress color="inherit" />}
            {
                accommodations
                    ? <ProductList title={defineTitle(cityName, startDate, endDate)} data={accommodations} />
                : <Box padding={2} display='flex' flexDirection='column' gap={2}>
                        <Skeleton variant="text" width='23em' height={60} />
                        <Grid
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            container
                            spacing={2}
                        >

                            {Array.from({ length: 10 }, (_, i) => (
                                <Grid item key={i} xs={12} sm={6}>
                                    <Skeleton key={i} variant="rect" sx={{ borderRadius: '10px', height: { xs: 600, lg: 350 } }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>}
        </Box>
    )
}