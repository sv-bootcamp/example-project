

export default function counter(state = 0, action) {
	//action.username
  switch (action.type) {
    case 'ADD_VISIT_COUNT':
      return state + 1    
    default:
      return state
  }
}
