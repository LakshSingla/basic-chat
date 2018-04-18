module.exports = {
    hasProperties(obj, props){
        let hasAll = true;
        props.forEach( prop => {
            if(!obj.hasOwnProperty(prop)) {
                hasAll = false;
            }
        }); 
        return hasAll;
    },
    pushUnique(arr, val, transform = val => val){
        console.log(transform(val));
        if(arr.reduce((accumulator, currentVal) => {
                console.log(transform(currentVal));
                return (transform(val) === transform(currentVal)) || accumulator
            }, false)) 
            throw new Error('It already contains that value');

        arr.push(val);
    }
}