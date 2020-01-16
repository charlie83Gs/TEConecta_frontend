export default class UserRole{
    id : string;
    userId: string;
    roleId: string;
    
    
    constructor( id : string,
                userId: string,
                roleId: string,
                ) {

        this.id = id;
        this.userId = userId;
        this.roleId = roleId;
    }
    
    static loadFromJson(data :any) : UserRole{
        return new UserRole(
            data.id,
            data.userId,
            data.roleId         
        )

    }

    toJson = () : any => {
        return {
            "id" : this.id,
            "userId" : this.userId,
            "roleId" : this.roleId
        }
    }

    toJsonNoId = () : any => {
        return {
            "userId" : this.userId,
            "roleId" : this.roleId
        }
    }

}