import React from 'react'

const Policies = ({ rules = [], safety = [], cancellation = '' }) => {
    return (
        <div className='px-6 py-2 w-full text-gray-900'>
            <h1 className=' font-bold leading-none text-2xl'>Que tenés que saber</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-6  text-gray-dark-booking font-semibold'>
                <div>
                    <h1 className=' font-bold leading-none text-xl'>Normas de la casa</h1>
                    <ul>
                        {rules.map((rule) => <li className='my-4 text-gray-booking' key={rule?.id}>{rule?.description}</li>)}
                    </ul>
                </div>
                <div>
                    <h1 className=' font-bold leading-none text-xl'>Salud y seguridad</h1>
                    {safety.map((item) => <p className='my-4 text-gray-booking' key={item?.id}>{item?.title}</p>)}
                </div>
                <div>
                    <h1 className=' font-bold leading-none text-xl'>Políticas de cancelación</h1>
                    <p className='my-4 text-gray-booking'>
                        {
                            cancellation.length > 2
                                ? cancellation
                                : `Cancelación gratis. Hasta ${parseInt(cancellation)} día${parseInt(cancellation) > 1 && 's'} antes de la fecha de entrada`
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Policies