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

	getById(userId) {
		return this.users[userId];
	}

	updateById(userId) {
		
		if(this.users[userId]) this.users[userId] = 0;
		else this.users[userId]++;

		return this.users[userId];
	}
}

export default User;