
/**
 * 데이터베이스 사용하기
 * 
 * 사용자 등록하기
 * 
 */

//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var mongodb = require('mongodb');


//===== Express 서버 객체 만들기 =====//
var app = express();


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));

//===== body-parser, cookie-parser, express-session 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

//===== 라우터 미들웨어 사용 =====//


//===== 데이터베이스 연결 =====//

var database;

//데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/shopping';
	
	// 데이터베이스 연결
	mongodb.connect(databaseUrl, function(err, db) {
		if (err) throw err;
		
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		
		// database 변수에 할당
		database = db;
	});
}


// 로그인 처리 함수
app.post('/process/login', function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.body.id;
	var paramPassword = req.body.password;
	
	console.log('파라미터 - id : %s, password : %s', paramId, paramPassword);
	
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
			if (docs) {
				console.dir(docs);

				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/process/login'>다시 로그인하기</a>");
				res.end();
			
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});



//사용자 추가 함수
app.post('/process/adduser', function(req, res) {
	console.log('/process/adduser 호출됨.');

	var paramId = req.body.id;
	var paramPassword = req.body.password;
	var paramName = req.body.name;
	
	console.log('파라미터 - id : %s, password : %s, name : %s', paramId, paramPassword, paramName);
	
	if (database) {
		addUser(database, paramId, paramPassword, paramName, function(err, result) {
			if (err) {throw err;}
			
			if (result) {
				console.dir(result);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
});



//사용자 수정 함수
app.post('/process/updateuser', function(req, res) {
	console.log('/process/updateuser 호출됨.');

	var paramId = req.body.id;
	var paramPassword = req.body.password;
	var paramName = req.body.name;
	
	console.log('파라미터 - id : %s, password : %s, name : %s', paramId, paramPassword, paramName);
	
	if (database) {
		updateUser(database, paramId, paramPassword, paramName, function(err, result) {
			if (err) {throw err;}
			
			if (result) {
				console.dir(result);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 수정 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 수정  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
});



// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
	console.log('authUser 호출됨.');
	
    // users 컬렉션 참조
	var users = database.collection('users');

    // 아이디와 비밀번호를 이용해 검색
	users.find({"id":id, "password":password}).toArray(function(err, docs) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    if (docs.length > 0) {
	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
	    	callback(null, docs);
	    } else {
	    	console.log("일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
	    }
	});
}


//사용자를 등록하는 함수
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨.');
	
	// users 컬렉션 참조
	var users = database.collection('users');

	// id, password, username을 이용해 사용자 추가
	users.insert([{"id":id, "password":password, "name":name}], function(err, result) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("사용자 데이터 추가함.");
	    callback(null, result);
	     
	});
}


//사용자를 수정하는 함수
var updateUser = function(database, id, password, name, callback) {
	console.log('updateUser 호출됨.');
	
	// users 컬렉션 참조
	var users = database.collection('users');

	// id, password, username을 이용해 사용자 수정
	users.update({"id":id}, {"id":id, "password":password, "name":name}, function(err, result) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("사용자 데이터 수정함.");
	    callback(null, result);
	});
}



//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database) {
		database.close();
	}
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 연결
	connectDB();
   
});

