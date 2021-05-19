const mutationNames = [
  'SET_CURRENT_URL',
  'SET_REPO',
  'SET_REPOS'
]

export const mutationsVars = mutationNames.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: curr
  }
}, {})
