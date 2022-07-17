import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ImagesSwiper } from './ImagesSwiper'

describe('<Header />', () => {
	it('renders without crashing desktop and tablet', async () => {
		render(<ImagesSwiper />)
		expect(screen.getAllByRole('img')).toHaveLength(5)
	})

	it('renders without crashing in mobile', () => {
		const resizeWindow = (width, height) => {
			window.innerWidth = width
			window.innerHeight = height
			window.dispatchEvent(new Event('resize'))
		}
		resizeWindow(414, 896)
		render(<ImagesSwiper />)
		const images = screen.getAllByRole('img')
		expect(images[1]).not.toBeVisible
	})

	it('renders without crashing desktop and tablet', async () => {
		render(<ImagesSwiper />)
		const modalLink = screen.getByText(/ver más/i)
		fireEvent.click(modalLink)
		const galery = screen.getByRole('presentation')
		expect(galery).toBeVisible
		fireEvent.click(screen.getByTestId('ClearIcon'))
		expect(galery).not.toBeVisible
	})

	it('shows galery on mobile', () => {
		const resizeWindow = (width, height) => {
			window.innerWidth = width
			window.innerHeight = height
			window.dispatchEvent(new Event('resize'))
		}
		resizeWindow(414, 896)
		render(<ImagesSwiper />)
		const images = screen.getAllByRole('img')
		expect(images).toHaveLength(5)
		expect(images[1]).not.toBeVisible
	})

	it('shows share and heart icons', async () => {
		render(<ImagesSwiper />)
		const shareIcon = screen.getByTestId('ShareIcon')
		const heartIcon = screen.getByTestId('FavoriteBorderIcon')
		expect(shareIcon).toBeInTheDocument
		expect(heartIcon).toBeInTheDocument
		fireEvent.click(heartIcon)
		expect(await screen.findByTestId('FavoriteOutlinedIcon'))
			.toBeInTheDocument
	})

	it('renders images in mobile', async () => {
		const resizeWindow = (width, height) => {
			window.innerWidth = width
			window.innerHeight = height
			window.dispatchEvent(new Event('resize'))
		}
		resizeWindow(414, 896)
		render(<ImagesSwiper />)
		expect(screen.getAllByRole('img')).toHaveLength(5)
	})
})
