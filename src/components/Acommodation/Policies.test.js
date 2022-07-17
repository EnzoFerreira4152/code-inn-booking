import React from 'react'
import { screen, render } from '@testing-library/react'
import Policies from './Policies'

describe('<Policies />', () => {
	it('renders all information', () => {
		render(
			<Policies
				rules={[
					{ id: 1, description: 'Rule 1' },
					{ id: 2, description: 'Rule 2' },
				]}
				safety={[
					{ id: 1, title: 'Safety 1' },
					{ id: 2, title: 'Safety 2' },
				]}
				cancellation={2}
			/>
		)
		const title = screen.getByText(/que tenés que saber/i)
		const policies = screen.getAllByText(
			/rule 1|rule 2|safety 1|safety 2|48/i
		)

		expect(title).toBeInTheDocument
		expect(policies).toHaveLength(5)
	})
})
