import React from 'react'
import { render, screen } from '@testing-library/react'
import { LocationHeader } from './LocationHeader'

describe('<LocationHeader />', () => {
	it('renders without crashing', () => {
		render(
			<LocationHeader
				location={'Test Location'}
				distance={'100'}
				puntuation={'8'}
				reviews={4}
			/>
		)
		screen.getByText(/test location/i)
		screen.getByText('100')
		screen.getByText('8')
		expect(screen.getAllByTestId('StarIcon')).toHaveLength(4)
	})
})
