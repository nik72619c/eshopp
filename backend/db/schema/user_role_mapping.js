const mongoose=require('../common/connection');

const schema=mongoose.Schema;
var user_role_schema= new schema({

    _id: schema.Types.ObjectId,
    "username": String,
    "roleid":Number
    
});

var userRoleMappingModel=mongoose.model('user_role_mapping',user_role_schema);

module.exports=userRoleMappingModel;