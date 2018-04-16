const utils = require('../../utils/basicUtils.js');

describe('utils.js has', function(){
    it('hasProperties() function which expects atleast all the keys in the props <array> to be in the obj <object>', function() {
        const dummyObj = { foo: 1, bar: 2, z: 3};
        dummyObj.__proto__.lamda = 4;
        //Tests for all the properties in the Object
        expect(utils.hasProperties(dummyObj, ['foo', 'bar', 'z'])).toBe(true);

        //Tests for some properties in the Object
        expect(utils.hasProperties(dummyObj, ['foo', 'bar'])).toBe(true);
        
        //Tests for non existent properties in the object
        expect(utils.hasProperties(dummyObj, ['foo', 'bar', 'kappa'])).not.toBe(true);

        //Tests for properties defined on the prototype chain in the object
        expect(utils.hasProperties(dummyObj, ['foo', 'bar', 'lambda'])).not.toBe(true);
    })
});