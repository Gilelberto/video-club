const Permission = require("../permission");
const Profile = require("../profile")
const formatEnum = ['READ', 'CREATE', 'UPDATE', 'DELETE'];

async function createAdminProfile(){
    let id;
    await Profile.find({type:'admin'}).then( async function (obj) {
        if(obj.length == 0){
            //Admin
            let createPermission = new Permission({
                description: "Create a new user",
                type: "CREATE",
                over: "all"
            });

            await createPermission.save();

            createPermission = await new Permission({
                description: "Create a movie",
                type: "CREATE",
                over: "all"
            }).save();

            createPermission = await new Permission({
                description: "Create any object",
                type: "CREATE",
                over: "all"
            }).save();

            const readPermission = await new Permission({
                description: "Read any object",
                type: "READ",
                over: "all"
            }).save();

            const updatePermission = await new Permission({
                description: "Update any object ",
                type: "UPDATE",
                over: "all"
            }).save();

            const deletePermission = await new Permission({
                description: "Delete any object ",
                type: "DELETE",
                over: "all"
            }).save();
            //creammos el perfil de admin

            let adminPermissions = await Permission.find({},{_id:1}); //aquí probablemente falla porque find regresa lista de objetos, hay que mapear
        // console.log(adminPermissions);
            let adminPermissionsID = [];
            for(ob in adminPermissions){
                adminPermissionsID.push(ob._id);
            }
        // console.log(adminPermissionsID);
            const adminProfile = await new Profile({
                type: "admin",
                description: "Admin user with absolute permissions.",
                status: 1,
                permissions: adminPermissions
            }).save();

            // console.log(adminProfile);
            //return adminProfile._id; 
            id = adminProfile._id;
        }
        else{
        
            console.log('++++++++++ admin')
            for(ob in obj){
                console.log(obj[ob]);
                if(obj[ob].type == "admin"){
                    id = obj[ob]._id;   
                    break;
                }
            }
            
        }
    });

    return id;

}

async function createUserProfile(){
    let id;
    await Profile.find({type:'user'}).then( async function (obj) {
        if(obj.length == 0){
            let permissions = [];

            let readPermission = await new Permission({
                description: "Read a movie",
                type: "READ",
                over: "movies"
            }).save();
            permissions.push(readPermission._id);
        
            readPermission = await new Permission({
                description: "Read a director",
                type: "READ",
                over: "directors"
            }).save();
            permissions.push(readPermission._id);
        
            readPermission = await new Permission({
                description: "Read an actor",
                type: "READ",
                over: "actors"
            }).save();
            permissions.push(readPermission._id);
            

            const userProfile = await new Profile({
                type: "user",
                description: "User with read permissions.",
                status: 1,
                permissions: permissions
            }).save();

            // console.log(adminProfile);
            //return adminProfile._id; 
            id = userProfile._id;
        }
        else{
            console.log('++++++++++ user');
            for(ob in obj){
                console.log(obj[ob]);
                if(obj[ob].type == "user"){
                    id = obj[ob]._id;   
                    break;
                }
            }
            
        }
    });

    return id;
}
module.exports = {
    createAdminProfile,
    createUserProfile
};