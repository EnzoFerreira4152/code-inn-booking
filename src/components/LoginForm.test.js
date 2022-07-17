import React, { useReducer } from 'react'
import { Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import LoginForm from './LoginForm'
import { AuthContext } from '../auth/authContext'
import { authReducer } from '../auth/authReducer'
import { act } from 'react-dom/test-utils'

const MockLoginForm = () => {
	const init = () => {
		logged: false
	}

	const [user, dispatch] = useReducer(authReducer, {}, init)

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
				pathname='/login'
			>
				<LoginForm />
			</Router>
		</AuthContext.Provider>
	)
}

describe('<LoginForm />', () => {
	beforeEach(() => {
		act(() => render(<MockLoginForm />))
	})

	it('renders without crashig', async () => {
		const heading = screen.getAllByRole('heading')
		expect(heading).toBeInTheDocument
	})

	it('renders text, password and submit input', () => {
		const loginInputs = screen.getAllByLabelText(
			/[correo electrónico, contraseña]/i
		)
		const loginButton = screen.getByRole('button')
		expect(loginInputs).toHaveLength(2)
		expect(loginButton).toHaveTextContent(/ingresar/i)
	})

	it('dieplays error messages when inputs are invalid', () => {
		const [email, password] = screen.getAllByLabelText(
			/[correo electrónico, contraseña]/i
		)

		fireEvent.change(email, { target: { value: 'invalid@email' } })
		fireEvent.blur(email)
		// screen.getByText(/correo inválido/i)
		// expect()
	})
})
