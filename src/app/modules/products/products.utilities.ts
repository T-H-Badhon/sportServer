export const queryFilter = (query: Record<string, unknown>) => {
  const filter = { ...query }
  const nonFilterFields = ['searchTerm', 'minPrice', 'maxPrice']

  nonFilterFields.forEach((field) => delete filter[field])

  for (const key in filter) {
    if (filter[key] == '') {
      delete filter[key]
    }
  }

  if (query.maxPrice && query.minPrice) {
    const price = {
      price: {
        $gte: Number(query.minPrice),
        $lte: Number(query.maxPrice),
      },
    }
    filter['price'] = price.price
  }

  return filter
}
