import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';
import { CustomerProduct } from './customer-product';
import { OrderGarage } from './order-garage';
import { CategoryProduct } from './category-product';

export class AddProduct {
    public id_product: number;
    public id_category_default: number;
    public id_sub_category: number;
    public price: number;
    public condition: string;
    public date_add: Date;
    public date_upd: Date;
    public productLang: ProductLang;
    public image: Image[];
    public customerProduct: CustomerProduct;
    public orderGarage: OrderGarage;
    public categoryProduct: CategoryProduct[];
    constructor() {
        this.productLang = new ProductLang();
        this.image = [];
        this.orderGarage = new OrderGarage();
        this.customerProduct = new CustomerProduct();
        this.price = 0;
        this.id_product = 0;
        this.categoryProduct = [];
    }
}
