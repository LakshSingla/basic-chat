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
    });

    it('pushUnique() function which pushes a value onto an array only if it is not present there', function(){
        this.newArray = [];
        try{
            utils.pushUnique(this.newArray, 5, val => val, (arr, val) => arr.push(val));
            utils.pushUnique(this.newArray, 5, val => val, (arr, val) => arr.push(val));
            utils.pushUnique(this.newArray, 5, val => val, (arr, val) => arr.push(val)); utils.pushUnique(this.newArray, 5, val => val, (arr, val) => arr.push(val)); utils.pushUnique(this.newArray, 5, val => val, (arr, val) => arr.push(val));
        }catch(err){
            //Do something with this error
        }
        expect(this.newArray.length).toBe(1);
        utils.pushUnique(this.newArray, 6, val => val, (arr, val) => arr.push(val));
        expect(this.newArray.length).toBe(2);
        try{
            utils.pushUnique(this.newArray, 6, val => val, (arr, val) => arr.push(val));
        }catch(err){
            // console.log(err);
        }
        expect(this.newArray.length).toBe(2);
    })
});