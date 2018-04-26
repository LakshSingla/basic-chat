const Group = require('../models/Group');

module.exports = {
    retrieveGroups(req, res){
        // Group.find({}).then(
        //     (groups) => {
        //         res.send('Fetched the groups');
        //     }
        // ).catch(err => {
        //     res.send('Unable to query for the groups')
        // });
        const query = Group.find({});
        query.select('_id name users');
        query.exec( (err, groups) => {
            if(err) {
                res.send('Unable to query for the groups');
                return;
            }
            const groupsMutable = JSON.parse(JSON.stringify(groups));
            groupsMutable.forEach( group => {
                console.log(group);
                group.noOfUsers = group.users.length;
                delete group.users;
            });
            res.send(groupsMutable);
            console.log(groupsMutable);
        });
    }
}