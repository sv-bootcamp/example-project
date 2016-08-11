'use strict';

import User from './../models/user';

class UserController{

	constructor(){
		this.user = new User();
	}

	getCount(userId) {
		return this.user.getById(userId);
	}

	updateCount(userId) {
		return this.user.updateById(userId);
	}

}

export default UserController;