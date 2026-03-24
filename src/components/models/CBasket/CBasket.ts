import { IProduct } from "../../types/index.ts";

export class Basket {
    protected products: IProduct[] = [];

    constructor() {}

    getProductsList(): IProduct[] {
        return this.products;
    }

    addProduct(item: IProduct): void {
        if (!item.price) throw new Error('This item can not be bought');
        this.products.push(item);
    }

    removeProduct(id: string): void {
        const startPoint: number = this.products.findIndex(item => item.id === id);
        if (startPoint !== -1) this.products.splice(startPoint, 1);
        else throw new Error('There is no such element');
    }

    getAmount(): number {
        return this.products.length;
    }

    getTotal(): number {
        if (this.products.length === 0) return 0;
        return this.products.reduce((acc, item) => {
            return acc + (item.price ?? 0);
        }, 0);
    }

    doesItemExist(id: string): boolean {
        return this.products.some(item => item.id === id);
    }

    clearAll(): void {
        this.products = [];
    }
}
