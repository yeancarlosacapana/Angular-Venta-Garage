import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';
import { CustomerProduct } from './customer-product';

export class AddProduct {
    public id_category_default: number;
    public price: number;
    public condition: string;
    public date_add: Date;
    public date_upd: Date;
    public productLang: ProductLang;
    public image: Image;
    public imgData: string[];
    public customerProduct: CustomerProduct;
    constructor(){
        this.productLang = new ProductLang();
        this.image = new Image();
        this.imgData = [];
        this.customerProduct = new CustomerProduct();
    }
}
