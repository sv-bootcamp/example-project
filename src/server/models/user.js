'use strict';

let instance = null;

// singleton
class User{

	constructor() {
		if(!instance) {
			instance = this;
			this.users = {};
		}

		return instance;
	}

	getById(id, finalCallback) {

		finalCallback(this.users[id]);

	}

	update(user, finalCallback) {
		
		this.users[user.id] = user;
		
		finalCallback(this.users[user.id]);
	
	}
}

export default User;