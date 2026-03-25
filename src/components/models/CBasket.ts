import { IProduct } from "../../types/index.ts";

export class Basket {
    protected products: IProduct[] = [];

    constructor() {}

    getProductsList(): IProduct[] {
        return this.products;
    }

    addProduct(item: IProduct): void {
        // Если товар без цены, просто не добавляем его и выводим предупреждение
        if (!item.price) {
            console.warn('Товар без цены не может быть добавлен в корзину:', item.title);
            return;
        }
        this.products.push(item);
    }

    removeProduct(id: string): void {
        const startPoint: number = this.products.findIndex(item => item.id === id);
        if (startPoint !== -1) {
            this.products.splice(startPoint, 1);
        } else {
            // Если товар не найден, просто выводим предупреждение, не прерывая приложение
            console.warn('Товар не найден в корзине для удаления');
        }
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