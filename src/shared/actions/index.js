
// export const FETCH_USER_INFO = "FETCH_USER_INFO";
// export const ADD_VISIT_COUNT = "ADD_VISIT_COUNT";


export const fetchUserInfo(userdata) {
	return {
		type: 'FETCH_USER_INFO',
		payload: userdata
	}
}

let nextId = 0;
export const ADD_VISIT_COUNT = (count) => {
	return {
		type: 'ADD_VISIT_COUNT',
		user_id: nextId++,
		count
	}
}
