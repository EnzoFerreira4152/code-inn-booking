import { Box, Card, Grid, Skeleton, styled, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import useFetch from 'use-http';
import { AuthContext } from '../auth/authContext';
import { apiEndpoint } from '../configuration/endpoints';
import { colors } from '../theme/theme';
import '../styles/ProductList.css'
import * as Icons from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import StarSharpIcon from '@mui/icons-material/StarSharp'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { distanceToCenter, ratingToText } from '../utils'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const ContainerButton = styled(Button)(
    () => `
      color: ${colors.white}; 
      border-color: ${colors.secondary};
      background-color: ${colors.secondary};
        padding: 0.5em 1.7em;
        text-transform: none;
        font-size: 1.1em;
      `
);


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DynamicIcon = ({ icon, ...props }) => {
    const iconName = icon.replace('Icon', '')
    if (Icons[iconName]) {
        return React.createElement(Icons[iconName], props);
    }
    else {
        return <HelpOutlineIcon />
    }
}

function ProductCard({ id, category, city, title, stars, rating, images, ratingText = 'Bueno', characteristics, liked, description, latitude, longitude, startDate, finishDate, arrivalTime }) {
    const [favorite, setFavorite] = useState(liked)


    function renderStars() {
        let starsArr = []
        for (let i = 0; i < stars; i++) {
            starsArr.push(<StarSharpIcon key={i} style={{ color: colors.primary, fontSize: 16 }} />)
        }
        return starsArr
    }

    const toCenter = distanceToCenter(latitude, city?.latitude, longitude, city?.longitude)

    return (
        <div className="card">
            <div className="card-image" style={{
                background: `url(${images[0]?.imgUrl})`,
                backgroundOrigin: 'border-box',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <FavoriteSharpIcon sx={{ fontSize: 28, color: favorite ? colors.secondary : colors.white }} onClick={() => setFavorite(!favorite)} />
            </div>
            <div className="card-content">
                <div className="header">
                    <div className="left">
                        <div className="type"><span className="type-text">{category?.title?.toUpperCase()}</span> <span className='stars'>{renderStars()}</span></div>
                        <div className="name">{title}</div>
                    </div>
                    <div className="right">
                        <div className="rating">{rating}</div>
                        <div className="rating-text">{ratingToText(rating)}</div>
                    </div>
                </div>
                <div className="details">
                    <div className="address">
                        <span className="address-icon"><LocationOnIcon sx={{ fontSize: 18, color: colors.secondary }} /></span>
                        {city && <span className="address-text">A {toCenter} {toCenter >= 100 ? 'm' : 'km'} del centro</span>}
                        {/* <span className="show-map clicable">MOSTRAR EN EL MAPA</span> */}
                    </div>
                    <div className="highlights">
                        {characteristics?.map((highlight, i) =>
                            <span key={i} className="icon-container">
                                {/* <AmenityIcon amenity={highlight.id} /> */}
                                <DynamicIcon icon={highlight.icon} />
                            </span>
                        )}
                    </div>
                </div>
                <div className="description">
                    <p className='description-text'>{description}<span className='description-more clicable'>mas...</span></p>
                </div>
                <Box display='flex' flexDirection='column'>
                    <Typography fontSize='1.2em' fontWeight={600}>
                        Desde: {new Date(startDate).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long'
                        })}
                    </Typography>
                    <Typography fontSize='1.2em' fontWeight={600}>
                        Hasta: {new Date(finishDate).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long'
                        })}
                    </Typography>
                </Box>
            </div>

        </div >
    )
}

export const Bookings = () => {

    const { user } = useContext(AuthContext);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const navigate = useNavigate();

    const { get, loading, response } = useFetch(apiEndpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
        }
    });

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 0){
            //bookings who startDate is in the future
            setFilteredBookings(bookings.filter(booking => new Date(booking.startDate) > new Date()))
        } else{
            //bookings who startDate is in the past
            setFilteredBookings(bookings.filter(booking => new Date(booking.startDate) < new Date()))
        }
    };

    useEffect(() => {
        async function fetchData() {
            const response = await get(`/reservations/user/${user.id}`);
            if (response && response.length > 0) {
                //sort by start date
                response.sort((a, b) => {
                    return new Date(a.startDate) - new Date(b.startDate)
                }
                )
            }
            setBookings(response);
            setFilteredBookings(response);
        }
        fetchData();
    }, [user.id]);


    return (
        <>
            <Box
                padding={isMatch ? '1.2em' : '4em'}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Typography
                    variant="h5"
                    color={colors.secondary}

                >
                    Buenos días {user.name}, aquí podrás ver todas las reservas que has realizado.
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant={isMatch ? 'fullWidth' : 'scrollable'}
                    >
                        <Tab label="Reservas vigentes" {...a11yProps(0)} />
                        <Tab label="Reservas pasadas" {...a11yProps(1)} />
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    {
                        
                        !loading 
                        ? (filteredBookings.length > 0
                            ? 
                            <main className='product-list-items'>

                                {filteredBookings.map(({ accommodation, startDate, finishDate, arrivalTime }, index) => {
                                    return (
                                            <ProductCard
                                                {...accommodation}
                                                startDate={startDate}
                                                finishDate={finishDate}
                                                arrivalTime={arrivalTime}
                                            />
                                    )
                                })}
                            </main>
                            : <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                gap={4}
                                sx={{minHeight: '40vh', minWidth: '100vw'}} 
                                padding={2}    
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.secondary}
                                    textAlign="center"
                                >
                                    { value === 0 ? 'Aún no tienes reservas creadas' : 'No tienes reservas pasadas'}
                                </Typography>
                                {value === 0 && <ContainerButton
                                    sx={{
                                        '&:hover': {
                                            background: `${colors.secondary}`,
                                            borderColor: `${colors.secondary}`,
                                        },
                                        fontSize: isMatch ? '1.2em' : '1.4em',
                                    }}
                                    variant="outlined"
                                    onClick={() => {navigate('/')}}
                                >
                                    Creá tu primera reserva
                                </ContainerButton>}

                            </Box>)
                        : (
                            //display 10 skeleton cards
                            <>
                                {Array.from({ length: 10 }).map((_, index) => {
                                    return (
                                        <Grid 
                                            item 
                                            xs={12} 
                                            sm={6}
                                        >
                                            <Card>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <Grid item xs={12}>
                                                        <Skeleton variant="rect" height={400} width={1000}/>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    )
                                }
                                )}
                            </>
                        )
                    }
                </Grid>
            </Box>
        </>
    )
}
