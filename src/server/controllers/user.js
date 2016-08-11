'use strict'

import User from './../models/user';

class UserController{

	getCount(userId) {
		return User.getById(userId);
	}

	updateCount(userId) {
		return User.updateById(userId);
	}

}

