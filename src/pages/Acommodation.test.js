import React, { useReducer } from 'react'
import { screen, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AuthContext } from '../auth/authContext'
import { authReducer } from '../auth/authReducer'

import { Acommodation } from './Acommodation'

const MockAcommodation = () => {
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
				<Acommodation />
			</Router>
		</AuthContext.Provider>
	)
}

describe('<Acommodation />', () => {
	it('renders without crashing', async () => {
		render(<MockAcommodation />)
		const title = screen.findByText(/hermitage/i) // when fetching it will fail
	})
})
