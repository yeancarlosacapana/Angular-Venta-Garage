import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';
export class AddProduct {
    id_category_default:number;
    price:number;
    condition:string;
    date_add:Date;
    date_upd:Date;
    public productLang : ProductLang;
    public image:Image;
    public imgData:string[];
    constructor(){
        this.productLang = new ProductLang();
        this.image = new Image();
        this.imgData = [];
    }
}
