const mutationNames = [
  'SET_CURRENT_URL'
]

export const mutationsVars = mutationNames.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: curr
  }
}, {})
