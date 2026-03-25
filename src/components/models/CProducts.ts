import { IProduct } from "../../types/index.ts";

export class Products {
    protected products: IProduct[] = [];
    protected currentProduct: IProduct | null = null;

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

    getProductById(id: string): IProduct | undefined {
        return this.products.find(element => element.id === id);
    }

    getProduct(): IProduct | null {
        return this.currentProduct;
    }
}