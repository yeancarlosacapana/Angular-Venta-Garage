export class Image {
    id_product: number;
    id_image: number;
    position: number;
    cover: number;
    image: string;
    class: boolean;
    constructor(){
        this.id_image = 0;
        this.id_product = 0;
        this.class = true;
    }
}
