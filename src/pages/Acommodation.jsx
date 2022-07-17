import React, { useEffect, useState } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
// import AOS from 'aos';
// import "aos/dist/aos.css";
import { Header } from '../components/Acommodation/Header'
import { ImagesSwiper } from '../components/Acommodation/ImagesSwiper'
import { LocationHeader } from '../components/Acommodation/LocationHeader'
import Description from '../components/Acommodation/Description';
import Amenities from '../components/Acommodation/Amenities';
import Policies from '../components/Acommodation/Policies';
import LocationMap from '../components/Acommodation/LocationMap';
import { NotFound } from './NotFound'
import { CalendarBooking } from '../components/Acommodation/CalendarBooking'
import LinearProgress from '@mui/material/LinearProgress';
import { distanceToCenter } from '../utils'
import { apiEndpoint } from '../configuration/endpoints';
import useFetch from 'use-http'

export const Acommodation = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { get, error, loading, response } = useFetch(apiEndpoint);
  const [bookings, setBookings] = useState([]);

  useEffect(() =>{
    async function getData(){
      const result = await get('/accommodations/id/' + params.id);
      if(response.ok) setData(result)
      else navigate('/notfound')
    }
    async function getBookings(){
      const result = await get('/reservations/accommodation/' + params.id);
      if(response.ok) setBookings(result);
    }
    getData();
    getBookings();
  }, [])

  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const toCenter = data && distanceToCenter(data?.latitude, data?.city.latitude, data?.longitude, data?.city.longitude)

  return (
    <>
      {(loading || !data) && <LinearProgress color="inherit" />}
      {data
        && <Box>
          <Header name={data?.title} type={data?.category.title} />
          <LocationHeader
            location={data?.city.name}
            distance={`A ${toCenter} ${toCenter >= 100 ? 'm' : 'km'} del centro`}
            puntuation={data?.rating}
            reviews={data?.stars}
          />
          <ImagesSwiper images={data?.images} />
          <Box sx={{ padding: !isDownMD && '1.5em' }}>
            <Description
              title={data?.title}
              text={data?.description}
            />
            <Amenities list={data?.characteristics} />
            <CalendarBooking bookings={bookings}/>
            <LocationMap name={data?.title} city={data?.city.name} country={data?.city.country} coordenates={[data?.latitude, data?.longitude]} />
            <Policies
              rules={data?.rules}
              safety={data?.health_safety}
              cancellation={data?.cancellation_policy}
            />
          </Box>
        </Box>}
    </>
  )
}
