import { IProduct } from "../../types/index.ts";

export class Products {
    protected products!: IProduct[];
    protected currentProduct!: IProduct;

    constructor() {}

    setItems(items: IProduct[]): void {
        this.products = items;
    }

    setProduct(item: IProduct): void {
        this.currentProduct = item;
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getProductByID(id: string): IProduct {
        const finded = this.products.find(element => element.id === id);
        if (finded) return finded;
        else throw new Error('Item is not found');
    }

    getProduct(): IProduct {
        return this.currentProduct;
    }
}