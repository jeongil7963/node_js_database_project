
/*
 * 설정
 */

// 사용자 관련 모듈 불러오기
var user = require('./routes/user2');

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/shopping',
	db_schemas: [
	    {file:'./user_schema', collection:'users3', schemaName:'UserSchema', modelName:'UserModel'}
	],
	initRoutes: function(app) {
		console.log('initRoutes() 호출됨.');
		
		//===== 사용자 관련 라우팅 =====//
		
		// 로그인 처리 함수 라우팅
		app.post('/process/login', user.login);

		// 사용자 추가 함수 라우팅
		app.post('/process/adduser', user.adduser);

		// 사용자 리스트 함수 라우팅
		app.post('/process/listuser', user.listuser);

		//=======================//
		
	}
}