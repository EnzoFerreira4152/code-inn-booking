import React, { useReducer } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AuthContext } from '../auth/authContext'
import { authReducer } from '../auth/authReducer'
import Drawer from './Drawer'

const MockDrawerUnlogged = () => {
    const [user, dispatch] = useReducer(authReducer, { logged: false })

    const history = createMemoryHistory()

    return (
        <AuthContext.Provider
            value={{
                user,
                dispatch,
            }}
        >
            <Router
                location={history.location}
                navigator={history}
                pathname='/'
            >
                <Drawer />
            </Router>
        </AuthContext.Provider>
    )
}

const handleLogOut = jest.fn()

const MockDrawer = () => {
    const [user, dispatch] = useReducer(authReducer, { logged: true, name: 'test name' })

    const history = createMemoryHistory()

    return (
        <AuthContext.Provider
            value={{
                user,
                dispatch,
            }}
        >
            <Router
                location={history.location}
                navigator={history}
                pathname='/'
            >
                <Drawer />
            </Router>
        </AuthContext.Provider>
    )
}

describe('<Drawer />', () => {
    it('should render and open after clicking button', async () => {
        render(<MockDrawerUnlogged />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        const textMenu = await screen.findByText(/menú/i)
        expect(textMenu).toBeInTheDocument
        const socialIcons = await screen.findAllByRole('link')
        expect(socialIcons).toHaveLength(6) // 4 + signIn/Out login
    })
    it('should display username when is logged, open, close and logout', async () => {
        render(<MockDrawer />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        const nameText = await screen.findByText(/test name/i)
        const initials = await screen.findByText(/tn/i)
        expect(nameText).toBeInTheDocument
        expect(initials).toBeInTheDocument

        let crossIcon = await screen.findByTestId('ClearIcon')
        fireEvent.click(crossIcon)
        expect(nameText).not.toBeVisible
        crossIcon = await screen.findByTestId('ClearIcon')
        fireEvent.click(crossIcon)
        expect(handleLogOut).toBeCalled

    })


})