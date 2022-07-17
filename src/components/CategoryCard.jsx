import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import AOS from 'aos';
import "aos/dist/aos.css";

import '../styles/ProductCard.css'
import '../styles/CategoryCard.css'

function CategoryCard({ title, imgUrl, totalAccommodations }) {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <Link className='category-card' to={`categories/${title}`}>
            <div className="card-image" style={{
                background: `url(${imgUrl})`
            }}>
            </div>
            <div className="card-content">

                <h1 className='title'>
                    {title}

                </h1>
                <p className='total-products'>{totalAccommodations} {title}{title !== 'Hotel' ? 's' : 'es'}</p>
            </div>
        </Link>
    )
}

export default CategoryCard