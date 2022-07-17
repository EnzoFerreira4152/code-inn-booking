import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from '@mui/icons-material/Clear';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { colors } from "../theme/theme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";


const totalPages = [
  { label: "Crear cuenta", path: '/signin' },
  { label: "Iniciar sesión", path: '/login' }];


const DrawerComp = () => {

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)

  const [openDrawer, setOpenDrawer] = useState(false);
  const { pathname } = useLocation();
  let pages = [];
  if (!user?.logged) pages = totalPages.filter(page => page.path !== pathname);

  const handleLogOut = () => {
    dispatch({ type: types.logout });

    navigate('/login', {
      replace: true
    });
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: "80%" },
        }}
      >
        <Box
          height='25vh'
          position='relative'
          sx={{ background: colors.secondary }}
          display='flex'
          alignItems='flex-end'
          justifyContent='flex-end'
          padding={1}
        >
          <ClearIcon
            fontSize="medium"
            sx={{ position: 'absolute', top: '0.1em', left: '0.1em', cursor: 'pointer', color: colors.white }}
            onClick={() => setOpenDrawer(!openDrawer)}
          />
          {user?.logged
            ? <Stack direction="column" spacing={1} dir="rtl">
              <Avatar
                sx={{ width: 40, height: 40, fontWeight: 700, background: colors.white, color: colors.primary }}
              >
                {user?.name?.split(" ").map((n) => n[0]).join("") + user?.surname?.split(" ").map((n) => n[0]).join("")}
              </Avatar>
              <Box sx={{ position: 'relative' }}>
                <Typography color={colors.white} fontWeight={700}>
                  ,Hola
                </Typography>
                <Typography color={colors.primary} fontWeight={700}>
                  {user.name + ' ' + user.surname}
                </Typography>
              </Box>
            </Stack>
            : <Typography variant="h6" sx={{ color: colors.white }}>
              MENÚ
            </Typography>}
        </Box>
        <List>
          {pages.map(({ label, path }, index) => (
            <Link
              to={path}
              key={index}
              style={{ textDecoration: 'none' }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <ListItemButton alignItems='center' divider dir="rtl">
                <ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          ))}
          {user?.authority === 'ROLE_ADMIN' &&
            <Link
              to={'/administration'}
              key={10}
              style={{ textDecoration: 'none' }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <ListItemButton alignItems='center' divider dir="rtl">
                <ListItemIcon>
                  <ListItemText>Administración</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>}
            {user.authority === 'ROLE_USER' && <Link
              to={'/bookings'}
              key={10}
              style={{ textDecoration: 'none' }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <ListItemButton alignItems='center' divider dir="rtl">
                <ListItemIcon>
                  <ListItemText>Mis reservas</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          }
        </List>
        <Divider sx={{ position: 'absolute', bottom: '5em', width: '90%', background: colors.secondary, left: '1em' }} dir='rtl' />
        {user?.logged && <Typography
          sx={{ position: 'absolute', bottom: '6em', right: '1em' }}
          fontSize='13px'
          color={colors.primary}
          fontWeight={600}
        >
          ¿Deseas <span onClick={handleLogOut} style={{ color: colors.secondary }}>cerrar sesión</span>?
        </Typography>
        }
        <Box
          position='absolute'
          bottom='1em'
          right='1em'
          display='flex'
          gap={1}
        >
          <a href="https://www.facebook.com/" target="_blank"><FacebookOutlinedIcon sx={{ fontSize: "2rem", color: colors.primary }} /></a>
          <a href="https://linkedin.com/" target="_blank"><span className='social-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="3300" height="3300" viewBox="0 5 1036 990"><path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z" fill={colors.primary} /></svg>
          </span>
          </a>
          <a href="https://twitter.com/" target="_blank">
            <TwitterIcon sx={{ fontSize: "2rem", color: colors.primary }} />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <InstagramIcon sx={{ fontSize: "2rem", color: colors.primary }} />
          </a>
        </Box>
      </Drawer>
      <IconButton
        sx={{ color: colors.dark, marginLeft: "auto", fontSize: '2.5rem' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color={colors.dark} sx={{ fontSize: '2.1rem' }} />
      </IconButton>
    </>
  );
};

export default DrawerComp;