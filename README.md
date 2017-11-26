# 데이터베이스 사용하기
- 웹 서버가 사용자 요청을 받으면 데이터베이스에 있는 데이터를 조회하여 응답하거나 또는 사용자가 보낸 데이터를 데이터베이스에 저장한다.
- 노드로 서버를 만들 때도 데이터를 저장하기 위해 다양한 데이터베이스를 사용한다.

### 몽고디비 시작하기
- 몽고디비란?
>>    실무에서는 관계형 데이터베이스를 많이 사용한다.
>>    그러나 최근 비관계형 데이터베이스를 적용하는 곳이 늘고 있다.
>>    몽고디비는 관계형 데이터베이스의 테이블 개념이 없다.
>>    하나의 단위를 컬렉션이라고 부른다.
>>    즉 데이터베이스는 컬렉션의 집합이라고 한다.
>>    각각의 컬렉션은 여러 개의 문서 객체를 가질 수 있다.

- 몽고디비 사용을 위한 프로그램 설치하기
- 몽고디비에 데이터를 추가하거나 조회하기
    shell 상태로 들어간다.
    use local
    db.users.insert
    db.users.find().pretty()

### 익스프레스에서 몽고디비 사용하기
- 새로운 프로젝트 만들기
- mongodb 모듈을 사용하여 로그인 기능 만들기
    기존 문서 객체를 없애고 아이디와 비밀번호를 속성으로 포함하는 새로운 문서 객체를 추가한다.
    새로운 명령 프롬프트 창을 열고 mongo 명령어를 입력하여 몽고디비 셀로 들어간다.
    npm install mongodb --save
    connectDB 함수는 모듈을 사용해 몽고디비 데이터베이스에 연결하도록 새로 만든 것이다.

- 사용자가 보내온 아이디와 비밀번호 비교하기
    authUser 함수
    데이터베이스 객체, 아이디, 비밀번호를 파라미터로 받으며 콜백 함수도 파라미터로 전달받는다.

- 로그인 처리를 요청하는 패스에 라우팅 함수 추가하기
- 사용자 추가 기능 만들기
    adduser() 함수를 호출하면서 동시에 사용자로부터 전달받은 id,password,anme 파라미터를 전달한다.
    그안에 들어 있는 insertedCOunt 속성의 값이 0보다 큰경우 클라이언트에 성공했다는 응답을 보낸다.

- 데이터베이스 관리 도구 사용하기
    데이터를 조회하거나 추가할수 있다.

### 몽구스로 데이터베이스 다루기
- 몽구스 모듈 사용하기
    자바스크립트 객체와 데이터베이스 객체를 서로 매칭하여 바꿀 수 있게 하는 것을 오브젝터 맵퍼라고 한다.
    가장 많이 사용하는 것이 바로 몽구스 모듈이다.
    스키마를 만들고 이 스키마에 맞는 모델을 만들어서 데이터를 손쉽게 저장하거나 조회할 수 있다.
    connect
    Schema
    model    
    이미 만들어 둔 users 컬렉션의 문서 속성과 같도록 맞추기 위해 id, password, name 속성만으로 정의한다.
    model() 메소드의 첫 번째 파라미터로는 모델 이름이 전달되고 두 번째 파라미터에는 스키마 객체가 전달된다.

- 몽구스로 사용자 인증하기
    스키마를 만들었으므로 이제 데이터베이스에 들어 있는 users 컬렉션의 데이터를 조회하여 사용자 인증 과정에 적용해 볼 차례입니다.
    find() : 조회 조건을 사용해 컬렉션의 데이터를 조회
    save() : 모델 인스턴스 객체의 데이터를 저장한다.
    update() : 컬레겻ㄴ의 데이터를 조회한 후 업데이트한다.
    remove() : 컬렉션의 데이터 삭제 

### 인덱스와 메소드 사용하기
- 사용자 리스트 조회 기능 추가하기
    user 보다 더 많은 칼럼을 가지고 있고 인덱스도 더 많이 만들어져 있는 users2 컬렉션을 새로운 스키마로 정의한다.
    모델 객체의 findBYId() 메소드를 호출할 때는 id 값과 콜백 함수를 전달한다.
    이 함수 안에서는 모델 객체의 findAll() 함수를 호출하고 그 결과를 응답으로 전송한다.

### 비밀번호 암호화하여 저장하기
- virtual 함수 사용하기
    사용자 정보를 데이터베이스에 저장할 때 비밀번호를 사람들이 볼 수 없도록 암호화하여 저장하는 경우가 많습니다.
    사용자 인증 과정에서 사용자가 입력한 비밀번호를 암호화한 후 데이터베이스에 저장되어 있는 암호화된 비밀번호와 비교하는 과정을 거친다.
    virtual() 함수를 사용하면 이 과정을 더 쉽게 처리할 수 있다.

- 스키마 객체의 virtual() 함수 사용법 알아보기
    스키마 객체의 virtual() 함수를 사용하는 방법을 알아보기 위해 데이터베이스에 문서 객체를 저장하거나 조회하는 코드를 입력한다.
    require() 메소드로 mongodb와 mongoose 모듈을 불러들인다.
    데이터베이스가 정상적으로 열린 후에 테스트를 위해 정의한 함수를 호출할 수 있도록 open 이벤트를 처리하는 코드를 입력한다.
    전달된 파라미터를 띄어쓰기 기호로 분리하기 위해 split 메소드를 사용한다.
    데이터베이스에 문서 데이터를 저장하기 위해 new 연산자로 모델 인스턴스 객체를 만든다.
    모든 데이터를 조회한 후에는 id와 name 속성 값을 확인하도록 작성되어 있다.

- 비밀번호 암호화하여 저장하는 코드 적용하기
    노드는 암호화를 위해 crypto 모듈을 제공한다.
    authenticate 메소드가 하나 더 추가되었는 데 이메소드는 파라미터로 전달된 비밀번호와 암호화된 비밀번호가 같은지 비교한다.
    모델 인스턴스 객체를 만들 때는 id 속성에만 값을 넣어 둔다.

### MySQL 데이터베이스 사용하기
- 관계형 데이터베이스 간단하게 이해하기
    테이블을 만들어서 데이터를 저장한다.
    어떤 타입으로 들어갈지 정의한 후 데이터를 한 줄 씩 입력하는 과정과 비슷하기 때문이다.
    한 줄에 해당하는 데이터를 레코드라고 부르며, 이 레코드가 들어 있는 테이블을 검색할 수 있다.

- MySQL 설치하기

- 화면이 있는 관리도구 HeidiSQl 설치하기

- MySQL을 사용하는 추가 기능 만들기
    커넥션 풀을 사용한다.
    getConnection 메소드를 호출하면 커넥션 풀에서 연결 객체를 하나 가져올 수 있다.
    conn 파라미터로 연결 객체가 전달된다.

- 사용자가 추가 요청을 처리하는 함수 만들기
    사용자를 추가할 대 사용하는 라우팅 함수의 코드도 몽고디비를 사용할 때와 거의 비슷하다.
    post 방식으로 요청된 패스를 처리하는 코드는 앞에서 살펴본 것과 거의 같습니다.

- MySQL에 들어 있는 사용자 정보로 로그인 하기
    sql문이 정상적으로 실해오디면 연결 객체의 release 메소드를 호출하여 연결 객체를 커넥션 풀로 반환한 후 callback 함수를 실행한다.
    이 함수를 호출한 쪽에서 rows 객체를 전달 받게 된다.
                 