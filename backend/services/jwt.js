'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_curso_de_angular7';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix
	};

	return jwt.encode(payload, secret);
};