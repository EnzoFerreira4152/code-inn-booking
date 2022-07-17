import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

import '../styles/ProductList.css'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import { colors } from '../theme/theme';

function ProductList({ title, data = [] }) {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        //smooth scroll to top component
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const [filteredAccommodations, setFilteredAccommodations] = useState([]);

    useEffect(() => {
        setFilteredAccommodations(data);
    }, [data]);

    //apply pagination to the data
    const paginatedData = filteredAccommodations?.slice((page - 1) * 10, page * 10);

    return (
        <section className='product-list'>
            <div className='product-list-header'>
                <h1 className='product-list-title'>{title}</h1>
            </div>

            <main className='product-list-items'>
                {paginatedData?.map((item, index) => <ProductCard key={index} {...item} />)}
            </main>
            <Box display='flex' alignItems='center' justifyContent='center' padding={2}>
                <Stack spacing={2} flexDirection='row' alignItems='center'>
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={data?.length > 0 ? Math.ceil(data.length / 10) : 0}
                        page={page}
                        onChange={handleChange}
                        size="large"
                        color="info"
                        />
                </Stack>
            </Box>
        </section>
    )
}

export default ProductList