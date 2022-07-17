import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import CategoriesList from './CategoriesList'

const mockList = [
	{
		type: 'primero',
		totalProducts: 12345,
		imageUrl: 'primeroUrl',
	},
	{
		type: 'segundo',
		totalProducts: 12345,
		imageUrl: 'segundoUrl',
	},
	{
		type: 'tercero',
		totalProducts: 12345,
		imageUrl: 'terceroUrl',
	},
	{
		type: 'cuarto',
		totalProducts: 12345,
		imageUrl: 'cuartoUrl',
	},
]

describe('<CategoriesList />', () => {
	it('should render without crashing', () => {
		const history = createMemoryHistory()

		render(
			<Router
				location={history.location}
				navigator={history}
				pathname='/'
			>
				<CategoriesList listData={mockList} />
			</Router>
		)

		expect(screen.getByText(/buscar por tipo de alojamiento/i)).not.toBeNull

		expect(screen.getAllByText(/12345/i)).toHaveLength(4)
	})
})
