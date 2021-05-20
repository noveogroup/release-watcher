const mutationNames = [
  'SET_CURRENT_URL',
  'SET_REPO',
  'SET_REPOS',
  'REMOVE_REPO'
]

export const mutationsVars = mutationNames.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: curr
  }
}, {})
