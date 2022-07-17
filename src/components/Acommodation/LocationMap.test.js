import React from 'react'
import { render, screen } from '@testing-library/react'
import LocationMap from './LocationMap'

describe('<LocationMap />', () => {
	it('renders without crashing', () => {
		render(
			<LocationMap
				name={'Test Hotel'}
				city={'City'}
				country={'Country'}
				coordenates={[-34.60376, -58.38162]}
			/>
		)
		screen.getByText(/dónde vas a estar/i)
		screen.getByText(/city/i)
		screen.getByText(/country/i)
	})
})
