const express=require('express');
const productOperations=require('../db/productOperations');
var adminRoute=express.Router();
const sessionChecker=require('../utils/middlewares/sessionChecker');
const UserRoles=require('../db/schema/userRoleMapping');
const User=require('../db/schema/userSchema');
const Roles=require('../db/schema/roleSchema');

adminRoute.get('/', (request,response)=>{

    response.json({

        "name": "nikhil",
        "responseStatus": "ok"
    });
});

//some test

adminRoute.get('/test',(request,response)=>{
UserRoles.find({},(err,content)=>{

    if(err){

        response.json({
            "err": error
        });
    }

   else if(content && content.length>0){
        response.json({
            "content": content
        });
    }

    else{

        response.json({

            test: 'some other problem'
        })
    }
})

});

adminRoute.post('/fetchUser',(request, response)=>{

    var adminObject=request.body;
    // productOperations.addAdmin(adminObject,request,response);
    productOperations.checkAdmin(adminObject,request,response);
    console.log('request.body is',request.body);
    
});

//these routes should be added to the product routes but were not working for some reason so added in the adminRoutes only just for functionality
adminRoute.post('/addproduct',sessionChecker,(request, response)=>{

    var productObject=request.body.product;
    console.log('productObject',productObject);
    productOperations.addProduct(productObject,request,response);

});

adminRoute.post('/getproducts',sessionChecker,(request,response)=>{

productOperations.getProducts(request,response);

});

// adminRoute.post('/checkSession', (request,response)=>{

//     console.log('request obtained in the adminRoute is',request.body);
//     var sessionTokenID=request.body;
//     productOperations.checkSession(sessionTokenID,request,response);

// });

// adminRoute.get('/makeSession', ( request,response )=>{

//     request.session.username="nik";
//     response.json({
//         status: 'session made',
//         session: request.session
//     });


// });

// adminRoute.get('/verifySession', (request,response)=>{

//     response.json({
//         session: request.session
//     });
// });

adminRoute.get('/logout', (request,response)=>{

    console.log('inside the logut route..');
    request.session.destroy(err=>{

        console.log('session sestoryed and is accessible ',request.session);
        response.json({

            status: 200,
            responseStatus: 'logged out'
            });
    });
 
});

adminRoute.post('/verifySession',sessionChecker,(request,response)=>{
console.log('inside the api/checksession');
    response.json({

        status:200,
        responseStatus: 'session found'
    });
});




module.exports=adminRoute;