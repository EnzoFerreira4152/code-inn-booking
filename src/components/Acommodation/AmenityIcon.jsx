import AccessibleIcon from '@mui/icons-material/Accessible'; // adapted
import AcUnitIcon from '@mui/icons-material/AcUnit'; // air conditionated
import HomeIcon from '@mui/icons-material/Home'; // appartment
import LocalBarIcon from '@mui/icons-material/LocalBar'; // bar
import BathtubIcon from '@mui/icons-material/Bathtub'; // bathtub
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'; // breakfast
import DeckIcon from '@mui/icons-material/Deck'; // deck
import YardIcon from '@mui/icons-material/Yard'; // garden
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // gym
import HeatPumpIcon from '@mui/icons-material/HeatPump'; // heat
import KitchenIcon from '@mui/icons-material/Kitchen';// kitchen
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'; // laundry
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // parking
import PetsIcon from '@mui/icons-material/Pets'; // pets
import PoolIcon from '@mui/icons-material/Pool'; // pool
import RestaurantIcon from '@mui/icons-material/Restaurant'; // resto
import VapingRoomsIcon from '@mui/icons-material/VapingRooms'; // smoking zone
import SpaIcon from '@mui/icons-material/Spa'; // sauna, spa
import TvIcon from '@mui/icons-material/Tv'; // tv
import WifiIcon from '@mui/icons-material/Wifi'; // wifi
import { colors } from '../../theme/theme';


const AmenityIcon = ({ amenity, color = colors.secondary }) => {
    const icons = [
        // <AccessibleIcon sx={{ color: color }} />,
        <AcUnitIcon sx={{ color: color }} />,
        <LocalBarIcon sx={{ color: color }} />,
        <BathtubIcon sx={{ color: color }} />,
        <FreeBreakfastIcon sx={{ color: color }} />,
        <DeckIcon sx={{ color: color }} />,
        <YardIcon sx={{ color: color }} />,
        <FitnessCenterIcon sx={{ color: color }} />,
        <HeatPumpIcon sx={{ color: color }} />,
        <KitchenIcon sx={{ color: color }} />,
        <LocalLaundryServiceIcon sx={{ color: color }} />,
        <DirectionsCarIcon sx={{ color: color }} />,
        <PetsIcon sx={{ color: color }} />,
        <PoolIcon sx={{ color: color }} />,
        <RestaurantIcon sx={{ color: color }} />,
        <VapingRoomsIcon sx={{ color: color }} />,
        <SpaIcon sx={{ color: color }} />,
        <TvIcon sx={{ color: color }} />,
        <WifiIcon sx={{ color: color }} />
        // <HomeIcon sx={{ color: color }} />,
    ]
    return icons[amenity - 1]
}

export default AmenityIcon