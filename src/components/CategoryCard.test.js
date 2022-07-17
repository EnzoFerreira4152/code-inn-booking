import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryCard from './CategoryCard'

describe('<CategoryCard />', () => {
	it('should render without crashing', () => {
		const history = createMemoryHistory()
		render(
			<Router
				location={history.location}
				navigator={history}
				pathname='/'
			>
				<CategoryCard
					title='Category Test'
					img_url='testUrl'
					totalProducts={15}
				/>
			</Router>
		)
		const card = screen.getByText(/15/i)
		expect(card).not.toBeNull
	})

	it('should render category, image and total products', () => {
		const history = createMemoryHistory()

		const { container } = render(
			<Router
				location={history.location}
				navigator={history}
				pathname='/'
			>
				<CategoryCard
					title='Category Test'
					img_url='testUrl'
					totalProducts={15}
				/>
			</Router>
		)
		const title = screen.getByRole('heading')
		const totalDescription = screen.getByText(/15 category test/i)

		expect(container.firstChild).toHaveStyle(
			`background-image: ${'testUrl'}`
		)
		expect(title).toHaveTextContent(/category test/i)
		expect(totalDescription).not.toBeNull
	})
})
