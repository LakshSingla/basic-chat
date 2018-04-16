//TODO write a Unit test for proper handling for the Expired Token errors
const jwtUtils = require('../../utils/jwtUtils');

describe('It is a jwt handling library which has', function(){
    it(`genJwt() function which generates a jwt and produces error if not able to
        decodeJWT() function which decodes the generated JWT`, function(){
        jwtUtils.genJWT({
            name: 'Test', age: 99
        }, "1d").then(token => {
            // console.log(token);
            jwtUtils.decodeJWT(token).then( decoded => {
                console.log('A');
                console.log(decoded);
                console.log('B');
                expect(decoded.name).toBe('Test');
                expect(decoded.age).toBe(99);
            })
        }).catch(err => {
            console.log('Error occurred in generation of JWT');
            console.log(err);
        });
    })
});