import { Box, Grid, LinearProgress, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from 'use-http'
import ProductList from '../components/ProductList'
import { apiEndpoint } from '../configuration/endpoints'

export const Categories = () => {

    const { id: categoryName } = useParams();
    const [accommodations, setAccommodations] = useState(null);

    const { get, error, loading, response } = useFetch(apiEndpoint);

    useEffect(() => {
        async function getProductsFromCategory() {
            const apiResponse = await get('/accommodations/search?category=' + encodeURIComponent(categoryName));
            if (response.ok) setAccommodations(apiResponse);
        };
        getProductsFromCategory();
    }, []);


    return (
        <>
            {loading && <LinearProgress color="inherit" />}
            {
                accommodations
                    ? <ProductList title={categoryName} data={accommodations} />
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
                    </Box>
            }
        </>
    )
}
