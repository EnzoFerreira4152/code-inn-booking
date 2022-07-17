import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductList from './ProductList'

import hotels from '../mocks/hotesls.json'

describe('<ProducList />', () => {
	let component

	beforeEach(() => {
		const history = createMemoryHistory()

		render(
			<Router
				location={history.location}
				navigator={history}
				pathname='/login'
			>
				<ProductList title='Product List' data={hotels} />
			</Router>
		)
	})

	it('renders properly, with title', () => {
		const title = screen.getByText(/product list/i)
		expect(title).toBeInTheDocument
	})

	it('renders list of items', () => {
		// const cards = component('.product-list-items > .card')
		// expect(cards).toHaveLength(hotels.length)
	})
})
