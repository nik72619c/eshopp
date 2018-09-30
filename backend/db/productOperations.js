// const mongoose=require('./common/connection');
const UserRoleMapping= require('./schema/userRoleMapping');
const Users=require('./schema/userSchema');
const Product=require('./schema/productSchema');
const Admin=require('./schema/adminSchema');
const Roles=require('./schema/roleSchema');

var productOperations={

    addAdmin (adminObject,request,response){

        console.log('adminObject obtained at backend is',adminObject);

var admin=new Admin({

    'username': adminObject.username,
    'password': adminObject.password,
    'role': adminObject.role
});

admin.save(err=>{

    if(err){

        response.json('could not add the admin');
    }

    else{

        response.json('added successfully...');
    }
});

    },

    checkAdmin(adminObject,request,response){

        console.log('inside the checkkadmin function...');
        console.log('the adminObject inside the checkAdmin function is',adminObject);
       Users.find({"username":adminObject.username,"password": adminObject.password}, (err,content)=>{

        console.log("error inside the callback is "+ err + "content is :- ",content);
            if(err){

                console.log('inside the error part...');

                response.json({

                    status: 404,
                    error: err
                });
            }

            else if(content && content.length>0){

                UserRoleMapping.find({ "username": content[0].username},(err,userRoleContent)=>{
                    console.log("userRoleContent "+userRoleContent);
                    if(err){

                        console.log('error inside of the Userrolemapping');
                        response.json({

                            error: err,
                            responseText: 'could not load the required values from the userrolemapping table'
                        });
                    }

                    else if(userRoleContent && userRoleContent.length>0){
                        console.log('content inside the userrolemapping table', userRoleContent);

                        Roles.find({"roleid": userRoleContent[0].roleid},(err,roleContent)=>{

                            console.log('rolecontent', roleContent);
                            Users.update({"username": content[0].username, "password": content[0].password},{"role": roleContent[0].rolename},(err,numAffected)=>{
                                if(err){

                                    console.log('error updating the document....');
                                }

                                else{

                                    console.log('successfully updated the values and no of values updated are :-',numAffected);
                                }
                            });
                        });

                        

                    }

                    else{

                        console.log('inside userrolemapping else...');
                    }
                });
            // request.session.username=content[0].username;
            // request.session.save(err=>{

            //     if(err){
            //         console.log('error saving the session...');
            //         response.json({
            //             error: err,
            //             responseText: 'error saving the session'
            //         });
            //     }

            //     else {

            //         console.log('session saved successfully..');
            //     }
            // });

            //     console.log('session created');
            //     console.log('request.session ', request.session);
            //     response.json({

            //         username: content[0].username,
            //         status: 200,
            //         role: content[0].role,
            //         sessionID: request.sessionID
            //     });
            }

            else{

                console.log('inside else ...');
                response.json({
                    status: 500
                });
            }
        });

        //trying a test run on the user authorization and authentication !

//         User.find({username: adminObject.username, password: adminObject.password},(error,content)=>{

//             if(error){

//                 console.log('user name or password invalid..., error in the User.find statement..');
           

//                             console.log('inside the error part...');
            
//                             response.json({
            
//                                 status: 404,
//                                 error: err
//                             });
//                     }

                    
//             else if(content && content.length>0){

// UserRoleMapping.find({username: adminObject.username},(error,content)=>{

//     if(error){
//         console.log('error in UserRoleMapping.find...');

//         response.json({
//             status: 404,
//             err: error
//         });
//     }

//     else if(content && content.length>0){
//         console.log('the role of the user is:-',content);
        
//         request.session.username=content[0].username;
//         request.session.save(err=>{

//             if(err){
//                 console.log('error saving the session...');
//             }

//             else {

//                 console.log('session saved successfully..');
//             }
//         });

//             console.log('session created');
//             console.log('request.session ', request.session);
//             response.json({

//                 username: content[0].username,
//                 status: 200,
//                 role: content[0].role,
//                 sessionID: request.sessionID
//             });
//     }


// });


//             }
//         });

        
    },

    getProducts(request,response){

        Product.find({},(err,content)=>{

            if(err){

                response.json({
                    errObtained: err,
                    status: "error"
                });

            }

                else if(content && content.length>0){

                    response.json({

                        data: content,
                        status: 200
                    
                    });
                }

                else{

                    response.json({

                       status: 403
                    });
                }
            
        });
    },

addProduct(productObject,request,response){

console.log('product object received at backend',productObject);
var product= new Product({

    productid:productObject.productid,
    productname: productObject.productname,
    producttype: productObject.producttype,
    productbrand: productObject.productbrand,
    productprice: productObject.productprice,
    productquantity: productObject.productquantity

});

console.log('product to be sennt to db',product);
product.save(err=>{

    if(err){
        response.json({
            status: 404,
            added: false,
            errorObtained: err
        });
    }

    else{

        response.json({

            status: 200
        });
    }
});
    
},

checkSession(sessionId,request,response){
    

    console.log("sessionId obtained at backend...",sessionId);
    console.log('the request.session is', request.session);
  
if(request.session && request.session.username){

    
    response.send(true);

}

else{

    response.send(false);
}

}
,


};

module.exports=productOperations;