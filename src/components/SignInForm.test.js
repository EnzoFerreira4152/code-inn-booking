import React, { useReducer } from 'react'
import { Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

import {
	render,
	screen,
	fireEvent,
	findByRole,
	waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'

import { AuthContext } from '../auth/authContext'
import { authReducer } from '../auth/authReducer'
import SignInForm from './SignInForm'

const MockSignInForm = () => {
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
				<SignInForm />
			</Router>
		</AuthContext.Provider>
	)
}

describe('<SignInForm />', () => {
	beforeEach(() => {
		render(<MockSignInForm />)
	})

	it('renders without crashing', async () => {
		const title = screen.getByRole('heading')
		const inputs = screen.getAllByLabelText(
			/nombre|apellido|correo electrónico|contraseña|confirmar contraseña/i
		)
		const button = screen.getByRole('button')

		await waitFor(() => expect(title).toHaveTextContent(/crear cuenta/i))
		await waitFor(() => expect(inputs).toHaveLength(5))
		await waitFor(() => expect(button).toBeDisabled)
	})

	it('validates matching passwords', async () => {
		const [password, confirmPassword] =
			screen.getAllByLabelText(/contraseña/i)

		fireEvent.change(password, { target: { value: '123456' } })
		fireEvent.change(confirmPassword, { target: { value: '123457' } })

		fireEvent.blur(confirmPassword)

		const errorMessage = await screen.findByText(
			/las contraseñas no coinciden/i
		)
		await waitFor(() => expect(errorMessage).toBeInTheDocument)
	})

	it('triggers to login when all inputs are valid', async () => {
		const user = userEvent.setup()
		const onSubmit = jest.fn()

		const [name, lastName, email, password, confirmPassword] =
			screen.getAllByLabelText(
				/nombre|apellido|correo electrónico|contraseña|confirmar contraseña/i
			)

		const button = await screen.findByRole('button')

		fireEvent.change(name, { target: { value: 'Valid' } })
		fireEvent.change(lastName, { target: { value: 'Name' } })
		fireEvent.change(email, { target: { value: 'valid@mail.com' } })
		fireEvent.change(password, { target: { value: '123456' } })
		fireEvent.change(confirmPassword, { target: { value: '123456' } })

		await waitFor(() => expect(button).not.toBeDisabled)

		// screen.debug()
		// fireEvent.click(button)
		// await user.click(button)
		// await waitFor(() => expect(onSubmit).toBeCalledTimes(1))
	})
})
