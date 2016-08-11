'use strict';

import User from './../models/user';

class UserController{

	constructor(){
		this.user = new User();
	}

	updateUser(req, res, next) {

		const user = new User();

		user.getById(req.user.id, (userInfo) => {

			if(userInfo) req.user.count = userInfo.count + 1;
			else req.user.count = 1;

			user.update(req.user, (userInfo) => {

				res.render('login-success', userInfo);

			});
			
		});

	}

}

export default UserController;