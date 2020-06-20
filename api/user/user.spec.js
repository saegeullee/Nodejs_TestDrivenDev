const request = require('supertest');
const should = require('should');
const app = require('../../');

describe('GET /users는', () => {
  describe('성공시', () => {
    it('user 객체를 담은 배열로 응답한다.', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          console.log(res.body);
          done();
        });
    });
    it('최대 limit 갯수만큼 응답한다.', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다.', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });
  });
});

describe('GET /users/1는', () => {
  describe('성공시', () => {
    it('id가 1인 유저 객체를 반환한다.', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('id가 숫자형이 아니면 400을 응답한다.', done => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done);
    });

    it('id로 유저를 찾을수 없으면 404로 응답한다.', done => {
      request(app)
        .get('/users/10')
        .expect(404)
        .end(done);
    });
  });
});

describe('DELETE /users/1는', () => {
  describe('성공시', () => {
    it('204를 응답한다', done => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답한다.', done => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done);
    });
  });
});

describe('POST /users는', () => {
  describe('성공시', () => {
    let name = 'daniel';
    let body;

    before(done => {
      request(app)
        .post('/users')
        // send 를 통해 body를 보낸다.
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it('생성된 유저 객체를 반환한다.', () => {
      body.should.have.property('id');
    });

    it('입력한 name을 반환한다.', () => {
      body.should.have.property('name', name);
    });
  });

  describe('실패시', () => {
    it('name 마라미터 누락시 400을 반환한다.', done => {
      request(app)
        .post('/users')
        .send({ id: 1 })
        .expect(400)
        .end(done);
    });

    it('name이 중복일 경우 409를 반환한다.', done => {
      request(app)
        .post('/users')
        .send({ name: 'hyuna' })
        .expect(409)
        .end(done);
    });
  });
});

describe('PUT /users는', () => {
  describe('성공시', () => {
    it('변경된 정보를 반환한다.', done => {
      let name = 'chally';
      request(app)
        .put('/users/3')
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property('name', name);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400 응답', done => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done);
    });

    it('name이 없을 경우 400 응답', done => {
      request(app)
        .put('/users/10')
        .send({ id: 10 })
        .expect(400)
        .end(done);
    });

    it('없는 유저일 경우 404 응답', done => {
      request(app)
        .put('/users/10')
        .send({ name: 'hi' })
        .expect(404)
        .end(done);
    });

    it('이름이 중복일 경우 409 응답', done => {
      request(app)
        .put('/users/3')
        .send({ name: 'hyuna' })
        .expect(409)
        .end(done);
    });
  });
});
