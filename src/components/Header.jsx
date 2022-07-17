import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Fab,
  Fade,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import DrawerComp from "./Drawer";
import DBLogo from '../assets/images/favicon.png';
import { colors } from "../theme/theme";
import { styled } from "@mui/system";
import { SearchBar } from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/authContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import { types } from "../types/types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useFetch from "use-http";
import { apiEndpoint } from "../configuration/endpoints";



const ContainerButton = styled(Button)(
  () => `
    color: ${colors.primary}; 
    border-color: ${colors.primary};
      padding: 0.5em 1.7em;
      text-transform: none;
      font-size: 1.1em;
    `
);

function ScrollTop({ children }) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 60, right: 16, zIndex: 9000 }}
      >
        {children}
      </Box>
    </Fade>
  );
}



const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const isMatchLG = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/home';
  const isSignIn = pathname === '/signin';
  const isLogin = pathname === '/login';

  const [cities, setCities] = useState([]);

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: types.logout });

    navigate('/login', {
      replace: true
    });
  }

  const { get, loading } = useFetch(apiEndpoint);

  useEffect(() => {
    async function getCities() {
      const response = await get('/cities/all');
      setCities(response);
    }
    if (!isMatchMD) getCities();
  }, [isMatchMD]);


return (
  <>
    <AppBar sx={{ background: "#fff", position: 'sticky' }}>
      <Toolbar sx={{ padding: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box
          display='flex'
        >
          <Link
            to="/"
          >
            <img src={DBLogo} alt='Logo Digital Booking' width={65} />
          </Link>
          {!isMatchMD && <Link
            to="/"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="h6"
              sx={{ color: colors.primary, fontStyle: 'italic', fontSize: '1.5em', fontWeight: 400, margin: '1.6em 0em 0em 1em' }}
            >
              Sentite como en tu hogar
            </Typography>
          </Link>
          }
        </Box>
        {!isMatch ? (
          user.logged ?
            <Stack direction="row" spacing={2} alignItems='center'>
              {user.authority === 'ROLE_ADMIN' ?
                <>
                  <Typography
                    color={colors.secondary}
                    fontWeight={500}
                    fontSize='1.3rem'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate('/administration')}
                  >
                    Administración
                  </Typography>
                  <Divider
                    sx={{
                      color: colors.secondary,
                      height: '40px',
                      border: '1px solid',
                    }}
                  />
                </>
                :
                <>
                  <Typography
                    color={colors.secondary}
                    fontWeight={500}
                    fontSize='1.3rem'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate('/bookings')}
                  >
                    Mis reservas
                  </Typography>
                  <Divider
                    sx={{
                      color: colors.secondary,
                      height: '40px',
                      border: '1px solid',
                    }}
                  />
                </>
              }
              <Avatar
                sx={{ width: 50, height: 50, fontWeight: 700, background: colors.primary }}
              >
                {user?.name?.split(" ").map((n) => n[0]).join("") + user?.surname?.split(" ").map((n) => n[0]).join("")}
              </Avatar>
              <Box sx={{ position: 'relative' }}>
                <Typography color={colors.gray1} fontWeight={700}>
                  Hola,
                </Typography>
                <Typography color={colors.secondary} fontWeight={700}>
                  {user.name + ' ' + user.surname}
                </Typography>
              </Box>
              <ClearIcon
                fontSize="small"
                sx={{ position: 'absolute', top: '0.9em', right: '1em', cursor: 'pointer', color: colors.dark }}
                onClick={handleLogOut}
              />
            </Stack>
            : <Box>
              {!isSignIn && <Link
                to='/signin'
                style={{ marginLeft: "auto", textDecoration: 'none' }}
              >
                <ContainerButton
                  sx={{
                    '&:hover': {
                      borderColor: `${colors.primaryDark}`,
                      background: `${colors.white}`
                    }
                  }}
                  variant="outlined"
                >
                  Crear cuenta
                </ContainerButton>
              </Link>}
              {!isLogin && <Link
                to='/login'
                style={{ marginLeft: "15px", textDecoration: 'none' }}
              >
                <ContainerButton
                  sx={{
                    '&:hover': {
                      borderColor: `${colors.primaryDark}`,
                      background: `${colors.white}`
                    }
                  }}
                  variant="outlined"
                >
                  Iniciar sesión
                </ContainerButton>
              </Link>}
            </Box>
        ) : (
          <>
            <DrawerComp />
          </>
        )}
      </Toolbar>
      {(!isMatchMD && isHome) && <SearchBar places={cities} />}
    </AppBar>
    <Toolbar id="back-to-top-anchor" sx={{ minHeight: '0 !important' }} />
    <ScrollTop>
      <Fab size="small" aria-label="scroll back to top" sx={{ background: colors.primary }}>
        <KeyboardArrowUpIcon sx={{ color: colors.white }} />
      </Fab>
    </ScrollTop>
  </>
);
};

export default Header;
