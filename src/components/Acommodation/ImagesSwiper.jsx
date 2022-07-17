import React, { useRef, useState } from "react";
import { Box, Grid, ImageList, ImageListItem, Modal, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import { styled } from "@mui/system";
import { ShareSocial } from 'react-share-social'

import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ImageGallery from 'react-image-gallery';
import '../../styles/Acommodation/react-image-gallery.css';
import ClearIcon from '@mui/icons-material/Clear';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
// import "swiper/css/bundle";
import "../../styles/Acommodation/swiper.css"

// import required modules
import { Pagination, Autoplay, EffectFade, Lazy, FreeMode, Navigation, Thumbs } from "swiper";

import Hotel1 from '../../assets/images/hotel/hotel1.png'
import Hotel2 from '../../assets/images/hotel/hotel2.png'
import Hotel3 from '../../assets/images/hotel/hotel3.png'
import Hotel4 from '../../assets/images/hotel/hotel4.png'
import Hotel5 from '../../assets/images/hotel/hotel5.png'
import { colors } from "../../theme/theme";

const WrapperImg = styled('img')(
    () => `
      width: 100%;
      max-width: 100vw;
      height: auto;
      max-height: 70vh;
      `
);

const styleIcons = {
    position: 'absolute',
    top: '1em',
    left: '1em',
    zIndex: 10,
    color: colors.white
}

const itemData = [
    {
        img: Hotel1,
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: Hotel2,
        title: 'Burger',
    },
    {
        img: Hotel3,
        title: 'Camera',
    },
    {
        img: Hotel4,
        title: 'Coffee',
    },
    {
        img: Hotel5,
        title: 'Hats',
    },
    {
        img: Hotel1,
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: Hotel2,
        title: 'Burger',
    },
    {
        img: Hotel3,
        title: 'Camera',
    },
    {
        img: Hotel4,
        title: 'Coffee',
    },
    {
        img: Hotel5,
        title: 'Hats',
    },
    {
        img: Hotel1,
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: Hotel2,
        title: 'Burger',
    },
    {
        img: Hotel3,
        title: 'Camera',
    },
    {
        img: Hotel4,
        title: 'Coffee',
    },
    {
        img: Hotel5,
        title: 'Hats',
    },
    {
        img: Hotel1,
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: Hotel2,
        title: 'Burger',
    },
    {
        img: Hotel3,
        title: 'Camera',
    },
    {
        img: Hotel4,
        title: 'Coffee',
    },
    {
        img: Hotel5,
        title: 'Hats',
    },
];

const ImagesSwiperMobile = ({ images }) => {
    images[0].cols = 2
    images[0].rows = 2

    const theme = useTheme();
    const [liked, setLiked] = useState(false);
    const isMatchSM = useMediaQuery(theme.breakpoints.down("sm"));
    const [share, setShare] = React.useState(false);

    return (
        <>
            {!isMatchSM && <Box
                display='flex'
                gap={1}
                sx={{ color: colors.primary }}
                padding={1}
            >
                <ShareIcon onClick={() => setShare(true)} sx={{ zIndex: 999 }} />
                {liked
                    ? <FavoriteOutlinedIcon onClick={() => setLiked(!liked)} />
                    : <FavoriteBorderIcon onClick={() => setLiked(!liked)} />
                }
            </Box>}
            <div style={{ position: 'relative' }}>
                {isMatchSM && <Box
                    sx={styleIcons}
                    display='flex'
                    gap={1}
                >
                    <ShareIcon />
                    {liked
                        ? <FavoriteOutlinedIcon onClick={() => setLiked(!liked)} />
                        : <FavoriteBorderIcon onClick={() => setLiked(!liked)} />
                    }
                </Box>}
                <Swiper
                    style={{ "--swiper-navigation-color": "#fff" }}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        type: "fraction",
                    }}
                    effect={"fade"}
                    lazy={true}
                    // navigation={true}
                    modules={[Pagination, Autoplay, EffectFade, Lazy]}
                >
                    {images && images.map(image => (<SwiperSlide><WrapperImg src={image.imgUrl} /></SwiperSlide>))}
                </Swiper>
            </div>
            <Modal
                open={share}
                onClose={() => setShare(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={shareStyle}>
                    <ShareSocial
                        title={'Hey! Mira este alojamiento que encontre en code-inn!'}
                        url={`www.codeinn.com${window.location.pathname}`}
                        socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'email']}
                    />
                </Box>
            </Modal>
        </>
    );
}

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    heigth: '95vh',
    maxHeight: '95vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
};

const shareStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    width: '95vw',
    maxWidth: '30em',
    boxShadow: 24,
    p: 2,
};

const imagesToRIG = (images) => {
    return images.map(image => ({
        original: image.imgUrl,
        thumbnail: image.imgUrl,
    }));
}

const ImagesSwiperDesktop = ({ images }) => {
    images[0].cols = 2
    images[0].rows = 2

    const [liked, setLiked] = useState(false);
    const imagesToShow = images?.slice(0, 5);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (idx = 0) => {
        setCurrentIndex(idx);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const [share, setShare] = React.useState(false);


    return (
        <Box
            padding='1em 3em'
        >
            <Box
                display='flex'
                gap={1}
                sx={{ color: colors.primary }}
                padding={1}
            >
                <ShareIcon sx={{ cursor: 'pointer' }} fontSize='large' onClick={() => setShare(true)} />
                {liked
                    ? <FavoriteOutlinedIcon sx={{ cursor: 'pointer' }} fontSize='large' onClick={() => setLiked(!liked)} />
                    : <FavoriteBorderIcon sx={{ cursor: 'pointer' }} fontSize='large' onClick={() => setLiked(!liked)} />
                }
            </Box>
            <ImageList
                // sx={{ width: 500, height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={190}
                gap={10}
                sx={{ position: 'relative' }}
            >
                {imagesToShow &&
                    imagesToShow.map((item, idx) => (
                        <ImageListItem
                            key={item.imgUrl}
                            cols={item.cols || 1}
                            rows={item.rows || 1}
                            sx={{ cursor: 'pointer' }}
                        // onClick={() => handleOpen(idx)}
                        >
                            <img
                                {...srcset(item.imgUrl, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="eager"
                                style={{ borderRadius: '10px' }}
                            />
                        </ImageListItem>
                    ))
                }
                <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                        position: 'absolute',
                        bottom: '1em', right: '1em', zIndex: 10,
                        color: colors.white,
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleOpen(0)}
                >
                    Ver más
                </Typography>
            </ImageList>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ position: 'relative' }}>
                        <ClearIcon
                            sx={{ position: 'absolute', top: '0.5em', right: '0.5em', zIndex: 999, cursor: 'pointer', color: colors.white }}
                            onClick={handleClose}
                            fontSize='large'
                        />
                        <ImageGallery
                            items={imagesToRIG(images)}
                            lazyLoad={false}
                            showPlayButton={false}
                            autoPlay={true}
                            onErrorImageURL={'https://picsum.photos/id/1018/1000/600/'}
                            // slideOnThumbnailOver={true}
                            startIndex={currentIndex}
                            showIndex={true}
                        />;
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={share}
                onClose={() => setShare(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={shareStyle}>
                    <ShareSocial
                        title={'Hey! Mira este alojamiento que encontre en code-inn!'}
                        url={`www.codeinn.com${window.location.pathname}`}
                        socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'email']}
                    />
                </Box>
            </Modal>
        </Box>
    )
}

export const ImagesSwiper = ({ images }) => {
    const theme = useTheme();
    const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            {isMatchMD ? <ImagesSwiperMobile images={images ?? itemData} /> : <ImagesSwiperDesktop images={images ?? itemData} />}
        </>
    )
}