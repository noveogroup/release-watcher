const mutationNames = [
  'SET_CURRENT_URL',
  'SET_REPO',
  'SET_REPOS',
  'REMOVE_REPO',
  'SET_RELEASES',
  'SET_RELEASE',
  'REMOVE_RELEASES',
  'UPDATE_RELEASE'
]

export const mutationsVars = mutationNames.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: curr
  }
}, {})
