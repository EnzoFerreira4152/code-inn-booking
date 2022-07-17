import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import StarSharpIcon from '@mui/icons-material/StarSharp'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AmenityIcon from './Acommodation/AmenityIcon'
import { distanceToCenter, ratingToText } from '../utils'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import * as Icons from '@mui/icons-material'

import '../styles/ProductCard.css'
import { colors } from '../theme/theme'

const DynamicIcon = ({ icon, ...props }) => {
    //if icon string contains Icon, remove it
    const iconName = icon.replace('Icon', '')
    if (Icons[iconName]) {
        return React.createElement(Icons[iconName], props);
    }
    else {
        return <HelpOutlineIcon />
    }
}

function ProductCard({ id, category, city, title, stars, rating, images, ratingText = 'Bueno', characteristics, liked, description, latitude, longitude }) {
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
            <div className='card-image' style={{
                position: 'relative',
            }}>
                <img
                    src={images[0]?.imgUrl}
                    alt={title}
                    style={{ borderRadius: '8px',
                            flexShrink: 0,
                            height: '17rem',
                            position: 'relative',
                            width: '100%',
                            objectFit: 'cover',}}
                />
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
                                <DynamicIcon icon={highlight.icon} key={highlight.title} sx={{ color: colors.secondary }} />
                            </span>
                        )}
                    </div>
                </div>
                <div className="description">
                    <p className='description-text'>{description}<span className='description-more clicable'>mas...</span></p>
                </div>
                <Link to={`/accommodations/${id}`} style={{position: 'absolute', bottom: '0.5em', width: "93%"}}>
                    <Button variant="contained" sx={{
                        bgcolor: colors.secondary, textTransform: 'none', '&:hover': {
                            borderColor: `${colors.secondary}`,
                            background: `${colors.secondary}`
                        },
                    }} fullWidth>Ver más</Button>
                </Link>
            </div>

        </div >
    )
}

export default ProductCard