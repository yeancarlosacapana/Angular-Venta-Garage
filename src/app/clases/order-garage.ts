export class OrderGarage {
    public id_order: number;
    public id_product: number;
    public method_payout: string;
    public pasarella: string;
    public total: number;
    public active: boolean;
    constructor() {
        this.id_product = 0;
        this.method_payout = 'free';
        this.active = true;
    }
}
