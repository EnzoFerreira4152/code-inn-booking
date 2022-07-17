import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Header } from './Header'

const history = createMemoryHistory()

describe('<Header />', () => {
	it('renders without crashing', () => {
		render(
			<Router
				location={history.location}
				navigator={history}
				pathname='/login'
			>
				<Header name='Test Hotel' />
			</Router>
		)
		const name = screen.getByText(/test hotel/i)
		expect(name).toBeInTheDocument
	})
})
