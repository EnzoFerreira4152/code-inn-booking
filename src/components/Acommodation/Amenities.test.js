import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Amenities from './Amenities'

describe('<Amenities />', () => {
	beforeEach(() => {
		render(
			<Amenities list={[{ id: 13, title: 'pileta' }]} name='Test Hotel' />
		)
	})

	it('renders without crashing', () => {
		const title = screen.getByText(/test hotel/i)
		expect(title).toBeInTheDocument
	})

	it('displays amenities names and icons', () => {
		const appartment = screen.getByText(/pileta/i)
		const appartmentIcon = screen.getByTestId('PoolIcon')
		expect(appartment).toBeInTheDocument
		expect(appartmentIcon).toBeInTheDocument
	})

	it('displays the correct number of details', () => {
		const amenities = screen.getAllByTestId(/icon/i)
		expect(amenities).toHaveLength(1)
	})
})
