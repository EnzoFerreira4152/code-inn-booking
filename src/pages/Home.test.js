import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { HomeScreen } from './Home'

// global.fetch = jest.fn(() =>
// 	Promise.resolve({
// 		json: () => Promise.resolve({ test: true }),
// 	})
// )

describe('<Home />', () => {
	it('renders without crashing', async () => {
		render(<HomeScreen />)

		expect(await screen.findByText(/recomendaciones/i)).toBeInTheDocument
	})
})
