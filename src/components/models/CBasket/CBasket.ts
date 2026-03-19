import { IProduct } from "../../../types/IProduct.ts";
import { IEvents } from "../../base/Events.ts";

export class Basket {
  protected products: IProduct[] = [];

  constructor(protected events: IEvents) {};

  getProductsList(): IProduct[] {
    return this.products;
  };

  addProduct(item: IProduct): void {
    if(!item.price) throw Error('This item can not be bought');
    this.products.push(item);
    this.events.emit('basket:counter:changed');
  };

  removeProduct({ id }: IProduct): void {
    let startPoint: number = this.products.findIndex(item => item.id === id);

    if(startPoint !== -1) this.products.splice(startPoint, 1);
    else throw Error('There is no such element');

    this.events.emit('basket:counter:changed');
    this.events.emit('basket:render');
  };

  getAmount(): number {
    return this.products.length;
  };

  getTotal(): number {
    if(this.products.length === 0) return 0;
    else {
      return this.products.reduce((acc, item) => {
        acc += item.price!;
        return acc;
      }, 0);
    };
  };
  
  doesItemExist({ id }: IProduct): boolean {
    return this.products.some(item => item.id === id);
  };

   clearAll(): void {
    this.products = [];
    this.events.emit('basket:counter:changed');
  };

};