export class FilterProduct {
    public priceMin     :   number;
    public priceMax     :   number;
    public id_category  :   number;
    public name         :   string;

    public fecha        :   string;
    public typeFilter   :   string;
    public sortBy       :   string;

    constructor(){
        this.priceMin       =   0;
        this.priceMax       =   800;
        this.id_category    =   0;
        this.name           =   "";

        this.fecha          =   "";
        this.sortBy         =   "";
    }

}
