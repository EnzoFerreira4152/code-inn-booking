import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Description from './Description'

describe('<Description />', () => {
	it('renders properly descriptions', () => {
		render(<Description title='Test Title' text='Description text' />)
		const title = screen.getByRole('heading')
		const text = screen.getByText(/description text/i)

		expect(title).toBeInTheDocument
		expect(text).toBeInTheDocument
	})
})
