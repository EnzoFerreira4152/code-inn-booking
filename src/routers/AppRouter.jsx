import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoggedRoutes } from './LoggedRoutes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HomeScreen } from '../pages/Home';
import { LoginScreen } from '../pages/LogIn';
import { Signin } from '../pages/SignIn';
import { Acommodation } from '../pages/Acommodation';
import { BookingForm } from '../pages/BookingForm';
import { Congrats } from '../pages/Congrats';
import { NotFound } from '../pages/NotFound';
import { Categories } from '../pages/Categories';
import { SearchAcommodation } from '../pages/SearchAcommodation';
import { AdminRoute } from './AdminRoute';
import { CreateAccommodation } from '../pages/CreateAccommodation';
import { AcommodationSuccess } from '../pages/AccommodationSuccess';
import { Bookings } from '../pages/Bookings';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>

                {/* Auth */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                }
                />
                <Route path="/signin" element={
                    <PublicRoute>
                        <Signin />
                    </PublicRoute>
                }
                />

                {/* Administracion */}
                <Route path="/administration" element={ 
                    <AdminRoute>
                        <CreateAccommodation />
                    </AdminRoute>
                }/>
                <Route path="/administration/success/:id" element={ 
                    <AdminRoute>
                        <AcommodationSuccess />
                    </AdminRoute>
                }
                />

                {/* Categoria y busqueda */}
                <Route path="/categories/:id" element={<Categories />} />
                <Route path="/search" element={<SearchAcommodation />} />

                {/* Acomodaciones */}
                <Route path="/accommodations/:id" element={<Acommodation />} />
                <Route path="/accommodations/:id/booking" element={
                    <PrivateRoute>
                        <BookingForm />
                    </PrivateRoute>
                }
                />
                <Route path='/accommodations/:id/congrats' element={
                    <PrivateRoute>
                        <Congrats />
                    </PrivateRoute>
                }
                />

                {/* Bookings */}
                <Route path="/bookings" element={
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                }/>

                {/* Not Found */}
                <Route path='/notfound' element={<NotFound />} />

                {/* Home */}
                <Route path="/*" element={<HomeScreen />}
                />

                {/**
                 * En caso de requerir rutas privadas:
                 */}
                {/* <Route path="/*" element={ 
                        <PrivateRoute>
                            <LoggedRoutes />
                        </PrivateRoute>
                    } 
                /> */}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}