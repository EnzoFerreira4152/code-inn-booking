import React from 'react'
import CategoryCard from './CategoryCard'

import '../styles/CategoriesList.css'

function CategoriesList({ listData }) {
    return (
        <div className="categories-container">
            <h1 className='categories-list-title'>Buscar por tipo de alojamiento</h1>
            <div className='category-list'>{listData?.map((category, index) => <CategoryCard key={index}{...category} />)}</div>
        </div>
    )
}

export default CategoriesList