import React from 'react'
import { render, screen } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('<SearchBar />', () => {
	it('should render without crashing', () => {
		render(<SearchBar />)
		expect(screen.getByText(/busca ofertas/i)).toBeInTheDocument
		expect(screen.getByPlaceholderText(/a dónde vamos/i)).toBeInTheDocument
		expect(screen.getByPlaceholderText(/checkin/i)).toBeInTheDocument
		expect(screen.getAllByRole('button')).toHaveLength(2)
	})

	// it('should display cities list', async () => {
	// 	render(<SearchBar />)
	// 	const buttons = screen.getAllByRole('button')
	// 	fireEvent.click(buttons[0])
	// 	const inputs = await screen.findAllByRole('combobox')
	// 	expect(inputs[0]).toHaveAttribute('aria-expanded', true)
	// })
})
