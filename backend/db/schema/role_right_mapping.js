const mongoose=require('../common/connection');

const schema=mongoose.Schema;
var role_right_schema= new schema({

    _id: schema.Types.ObjectId,
    "roleid": Number,
    "rightid":Number
    
});

var roleRightMappingModel=mongoose.model('role_right_mapping',role_right_schema);

module.exports=roleRightMappingModel;