import React from 'react'
import * as Icons from '@mui/icons-material';
import { colors } from '../../theme/theme';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DynamicIcon = ({ icon, ...props }) => {
    const iconName = icon.replace('Icon', '')
    if (Icons[iconName]) {
        return React.createElement(Icons[iconName], props);
    }
    else {
        return <HelpOutlineIcon/>
    }
}


const Amenities = ({ list, name }) => {
    return (
        <div className='px-6 py-2 w-full text-gray-dark-booking'>
            <h1 className='capitalize font-bold leading-none text-2xl'>{name}</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full my-6'>
                {list?.map((amenity) => {
                    let muiIcon = 'HelpOutlineIcon';
                    const amenityIcon = amenity.icon.replace('Icon', '');
                    if(typeof Icons[amenityIcon] !== 'undefined') muiIcon = amenityIcon;
                    return (
                        <div key={amenity.id} className='flex items-center'>
                            <span className="text-lg"><DynamicIcon key={amenity.id} icon={muiIcon} sx={{color: colors.secondary}}/></span>
                            <span className='ml-2  text-gray-dark-booking text-gray-booking font-semibold capitalize'>{amenity.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Amenities