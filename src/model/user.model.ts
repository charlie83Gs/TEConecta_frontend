export default class User{
    id : string;
    name: string;
    phone: string;
    location : string;
    place: string;
    description: string;
    email: string;
    password: string;
    urlImageProfile: string;
    manager: string;
    
    constructor(id : string,
                name: string,
                phone: string,
                location : string,
                place: string,
                description: string,
                email: string,
                password: string,
                urlImageProfile: string,
                manager: string,
                ) {

        this.id = id;
        this.name = name;
        this.phone = phone;
        this.location = location;
        this.place = place;
        this.description = description;
        this.email = email;
        this.password = password;
        this.urlImageProfile = urlImageProfile;
        this.manager = manager;
    }

    
    static loadFromJson(data :any) : User{
        return new User(
            data.id,
            data.name,
            data.phone,
            data.location,
            data.place,
            data.description,
            "",
            data.password,
            data.urlImgProfile,
            data.manager           
        )

    }

    toJson = () : any => {
        return {
            "id" : this.email,
            "name" : this.name,
            "phone" : this.phone,
            "location" : this.location,
            "place" : this.place,
            "description" : this.description,
            "password" : this.password,
            "urlImgProfile" : this.urlImageProfile,
            "manager" : this.manager
        }
    }

    toJsonNoId = () : any => {
        return {
            "id" : this.email,
            "name" : this.name,
            "phone" : this.phone,
            "location" : this.location,
            "place" : this.place,
            "description" : this.description,
            "password" : this.password,
            "urlImgProfile" : this.urlImageProfile,
            "manager" : this.manager
        }
    }

}