import React, { useEffect } from 'react'
import '../styles/NotFound.css'

export const NotFound = () => {

    useEffect(() => {
        let starContainer = document.querySelector(".stars");
    
        for (let i = 0; i < 100; i++) {
            starContainer.innerHTML += `<div class="star"></div>`;
        }}
    ,[])
    return (
        <div className="wrapper">
            <div className="text_group">
                <p className="text_404">404</p>
                <p className="text_lost">Llegamos hasta el espacio y <br />no encontramos tu hotel</p>
            </div>
            <div className="window_group">
                <div className="window_404">
                    <div className="stars"></div>
                </div>
            </div>
        </div>
    )
}
