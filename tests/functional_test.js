const assert = require('assert');
const fxn= require('../index');
let verify=fxn.test1;

describe('authentification test', function() {

    describe('authentification model', () => {
  
  
  
      it('authenticate', function() {
    

        assert.equal(verify('abdul','123456'),false);
      });
  
  

    });
  });