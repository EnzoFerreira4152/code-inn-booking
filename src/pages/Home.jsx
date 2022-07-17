import { Box, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import CategoriesList from '../components/CategoriesList'
import { SearchBar } from '../components/SearchBar'
import LinearProgress from '@mui/material/LinearProgress';
import { paginate } from '../utils'
import Pagination from '../components/Pagination'
import { apiEndpoint } from '../configuration/endpoints'
import useFetch from 'use-http';


export const HomeScreen = () => {
  const theme = useTheme();
  const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
  const [accommodations, setAccommodations] = useState(null);
  const [categories, setCategories] = useState(null);
  const [cities, setCities] = useState(null);

  const accommodationsEndpoint = '/home'
  const categoriesEndpoint = '/categories/all'
  const citiesEndpoint = '/cities/all'

  // const { data: accommodations, error: accommodationsError, loading: loadingAccommodations } = useFetch(accommodationsEndpoint)
  // const { data: categories, error: categoriesError, loading: loadingCategories } = useFetch(categoriesEndpoint)
  // const { data: cities, error: citiesError, loading: citiesLoading } = useFetch(citiesEndpoint)
  const { get, error, loading, response } = useFetch(apiEndpoint);

  useEffect(() => {
    async function getAccommodations() {
      const apiResponse = await get(accommodationsEndpoint)
      if (response.ok) setAccommodations(apiResponse);
    };
    async function getCategories() {
      const apiResponse = await get(categoriesEndpoint)
      if (response.ok) setCategories(apiResponse);
    }
    async function getCities() {
      const apiResponse = await get(citiesEndpoint)
      if (response.ok) setCities(apiResponse);
    }
    getAccommodations();
    getCategories();
    getCities();
  }, []);


  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1)

  const pageData = accommodations && paginate(accommodations, currentPage, pageSize)

  return (
    <>
      {loading && <LinearProgress color="inherit" />}
      {isMatchMD && <SearchBar places={cities} />}
      {
        categories
          ? <CategoriesList listData={categories} />
          : <Box padding={2} display='flex' flexDirection='column' gap={2}>
            <Skeleton variant="text" width='23em' height={60} />
            <Grid
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              container
              spacing={2}
            >

              {Array.from({ length: 4 }, (_, i) => (
                <Grid item key={i} xs={12} md={6} lg={3}>
                  <Skeleton key={i} variant="rect" height={250} sx={{ borderRadius: '10px' }} />
                </Grid>
              ))}
            </Grid>
          </Box>
      }
      {
        cities
          ? <ProductList title='Recomendaciones' data={accommodations} />
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
