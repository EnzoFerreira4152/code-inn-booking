import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility"


const LocationMap = ({ name, city, country, coordenates }) => {
    const mapRef = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [open])


    return (
        <div className='px-6 py-2 mb-4 w-full text-gray-900 has-tooltip'>
            {/* <details onToggle={(e) => setOpen(e.target.open)}> */}
                <summary className='capitalize font-bold leading-none text-xl cursor-pointer list-none outline-0 has-tooltip flex items-center'>
                    <span className='text-2xl'>
                        ¿Dónde vas a estar?
                    </span>
                    {/* <span className='absolute right-6 tooltip rounded shadow-lg p-1 bg-gray-booking text-white font-bold transition-all duration-100 relative -z-100'>
                        {open ? 'Ocultar' : 'Ver'} Mapa
                    </span> */}
                </summary>
                <p className="my-4 font-bold">{city}, {country}</p>
                <div ref={mapRef} className='h-96 rounded-lg'>
                    <MapContainer center={coordenates} zoom={17} scrollWheelZoom={false} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={coordenates}>
                            <Popup>
                                {name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            {/* </details > */}
        </div >
    )
}

export default LocationMap