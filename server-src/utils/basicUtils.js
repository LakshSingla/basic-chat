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
}