import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import ProductCard from './ProductCard'

import { colors } from '../theme/theme'

const hotel = {
	id: '5d8b9c9f9f8b8b0f8f8b8b8c', //
	title: "Howard Johnson's", //
	ratingText: 'Bueno', //
	address: 'Av. Siempreviva 724',
	liked: false, //
	images: [
		{
			id: '1',
			title: 'Cama Hotel',
			url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
		},
		{
			id: '2',
			title: 'Vista a la playa',
			url: 'https://images.unsplash.com/photo-1602002418211-9d76470fa71f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
		},
		{
			id: '3',
			title: 'Spa',
			url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		},
		{
			id: '4',
			title: 'Gimnasio',
			url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		},
		{
			id: '5',
			title: 'Desayuno',
			url: 'https://images.unsplash.com/photo-1596252890311-caa6a004a6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
		},
	], //
	description: {
		title: 'Alojate en el corazón de la ciudad',
		text: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. Con una vista privilegiada a la ciudad.',
	}, //
	rating: 8, //
	stars: 5, //
	city: {
		id: '1',
		name: 'Buenos Aires',
		province: 'Buenos Aires',
		country: 'Argentina',
		latitude: -34.603851,
		longitude: -58.381775,
	},
	category: {
		id: '2',
		type: 'hostel',
	}, //
	characteristics: [
		{
			id: '2',
			title: 'aire acondicionado',
		},
		{
			id: '6',
			title: 'desayuno',
		},
		{
			id: '8',
			title: 'jardin',
		},
		{
			id: '9',
			title: 'gimnasio',
		},
		{
			id: '13',
			title: 'estacionamiento',
		},
		{
			id: '15',
			title: 'piscina al aire libre',
		},
	], //
	latitude: -34.612, //
	longitude: -58.412, //
	rules: [
		{
			id: '1',
			title: 'No fumar',
		},
		{
			id: '2',
			title: 'Mascotas: no se permiten',
		},
		{
			id: '3',
			title: 'Check-in: 2:00 PM',
		},
	],
	safety: [
		{
			id: '1',
			title: 'Se aplican las pautas de distanciamiento social y otras normas de seguridad relacionadas con el coronavirus.',
		},
		{
			id: '2',
			title: 'Detección de humno',
		},
		{
			id: '3',
			title: 'Politicas de seguridad',
		},
		{
			id: '4',
			title: 'Caja de seguridad',
		},
	],
	cancelation_policy: 2,
}

const renderHotel = () => {
	const history = createMemoryHistory()
	return render(
		<Router location={history.location} navigator={history} pathname='/'>
			<ProductCard {...hotel} />
		</Router>
	)
}

describe('<ProductCard/>', () => {
	it('renders product card', () => {
		const { container } = renderHotel()
		expect(container.firstChild.className).toBe('card')
	})

	it('renders product image', () => {
		const { container } = renderHotel()

		const cardImage = container.querySelector('.card-image')
		expect(cardImage).toHaveStyle(
			`background-image: url(${hotel.images[0].url})`
		)
	})

	it('renders heart icon and changes classname when clicking', () => {
		const { container } = renderHotel()
		const heartIcon = screen.getByTestId('FavoriteSharpIcon')
		expect(heartIcon).toHaveStyle(`color: ${colors.white}`)
		fireEvent.click(heartIcon)
		expect(heartIcon).toHaveStyle(`color: ${colors.orange}`)
	})

	it('renders name, type of product, stars, rating and rating text accordingly', async () => {
		const { container } = renderHotel()

		const name = screen.getByText(hotel.title)
		expect(name).toBeInTheDocument

		// const typeText = screen.getByText(/hostel/i)
		// expect(typeText).toBeInTheDocument

		const stars = container.querySelectorAll('.stars > svg')
		expect(stars).toHaveLength(hotel.stars)

		const rating = screen.getByText('8')
		expect(rating).toBeInTheDocument

		// expect(await screen.findByText(/bueno/i)).toBeInTheDocument
	})

	it('renders details, description and button', () => {
		const { container } = renderHotel()

		// screen.getByText(/950/)
		screen.getByText(/En el corazón de San Telmo/i)
		screen.getAllByRole('button')
	})
})
