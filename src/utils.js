export const distanceToCenter = (lat1, lat2, lon1, lon2) => {
	lon1 = (lon1 * Math.PI) / 180
	lon2 = (lon2 * Math.PI) / 180
	lat1 = (lat1 * Math.PI) / 180
	lat2 = (lat2 * Math.PI) / 180

	let dlon = lon2 - lon1
	let dlat = lat2 - lat1
	let a =
		Math.pow(Math.sin(dlat / 2), 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

	let c = 2 * Math.asin(Math.sqrt(a))

	let r = 6371

	return c * r > 1 ? (c * r).toFixed(1) : (c * r).toFixed(2) * 1000
}

export const paginate = (items, pageNumber, pageSize = 8) => {
	const startIndex = (pageNumber - 1) * pageSize
	const stopIndex = startIndex + pageSize
	return items.slice(startIndex, stopIndex)
}

export const ratingToText = rating => {
	let text

	if (rating === 5) {
		text = 'Maravilloso'
	} else if (rating >= 4.5) {
		text = 'Excelente'
	} else if (rating >= 4) {
		text = 'Muy bueno'
	} else if (rating >= 2.5) {
		text = 'Bueno'
	} else if (rating >= 2) {
		text = 'Regular'
	} else if (rating >= 1.5) {
		text = 'Malo'
	} else {
		text = 'Pésimo'
	}

	return text
}
