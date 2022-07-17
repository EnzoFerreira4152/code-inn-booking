import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer/>', () => {
	it('renders footer', () => {
		const { container } = render(<Footer />)
		expect(container.firstChild.nodeName).toBe('FOOTER')
	})

	it('displays copyright text', () => {
		const { container, getByText } = render(<Footer />)
		const date = new Date()
		const year = date.getFullYear().toString()
		screen.getByText('Ⓒ ' + year + ' Code Inn')
		expect(getByText('Ⓒ ' + year + ' Code Inn').toBeInTheDocument)
	})

	it('displays social links', () => {
		render(<Footer />)
		const socials = screen.getAllByRole('link')
		expect(socials.length).toBe(4)
	})

	it("doesn't displays social links on mobile view", () => {
		const resizeWindow = (width, height) => {
			window.innerWidth = width
			window.innerHeight = height
			window.dispatchEvent(new Event('resize'))
		}
		resizeWindow(500, 500)
		render(<Footer />)
		const socials = screen.queryAllByRole('link')
		expect(socials.length).toBe(0)
	})
})
