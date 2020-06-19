// 모카로 테스트 파일 실행 명령어
// mocha filename

/**
 * 노드 공홈에서도 노드의 내장 assert 말고 서드파티 라이브러리를 사용하라고 안내되어 있다.
 * Should 는 검증(assertion) 라이브러리이다.
 */

/**
 * 단위 테스트: 함수의 기능을 테스트
 * 통합 테스트: API의 기능을 테스트
 * SuperTest는 익스프레스 통합 테스트용 라이브러리이다.
 * 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.
 */

const utils = require('./utils');
const should = require('should');

describe('capitalize function in utils.js module is', () => {
  it('Capitalize the first letter of the string', () => {
    const result = utils.capitalize('hello');
    result.should.be.equal('Hello');
  });
});
