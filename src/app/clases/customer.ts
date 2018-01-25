import { Address } from "./address";


export class Customer {
    public id_customer:number;
    public id_gender:number;
    public company:string;
    public firstname:string;
    public lastname:string;
    public email:string;
    public passwd:string;
    public address : Address;
    public is_logged : boolean;
    public login_media: string;

    constructor(){
        this.address = new Address();
        this.is_logged = false;
        this.login_media = 'form';
    }
}
