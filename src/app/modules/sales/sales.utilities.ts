export const filterGenerator = (query: Record<string, unknown>) => {
  const startDate = new Date(query.startDate as string)
  const endDate = new Date(query.endDate as string)

  const start = startDate.toISOString().split('T')[0]
  const filter: TFilter = {
    date: {
      $gte: new Date(start),
      $lte: endDate,
    },
  }

  if (query.branch != '' && query.branch) {
    filter.branch = query.branch
  }

  return filter
}

type TFilter = {
  date: Record<string, unknown>
  branch?: unknown
}
