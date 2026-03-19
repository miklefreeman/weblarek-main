import { IProduct } from "../../../types/IProduct.ts";
import { IEvents } from "../../base/Events.ts";

export class Products {
  protected products!: IProduct[];
  protected currentProduct!: IProduct;

  constructor(protected events: IEvents) {}

  setItems(items: IProduct[]): void {
    this.products = items;
    this.events.emit('catalog:changed');
  };
  
  setProduct(item: IProduct): void {
    this.currentProduct = item;
    this.events.emit('item:selected', this.currentProduct);
  };
  
  getItems(): IProduct[] {
    return this.products;
  };

  getProductByID(id: string): IProduct {
    const finded = this.products.find(element => element.id == id);
    if(finded) return finded;
    else throw Error('Item is not found');
  };

  getProduct(): IProduct {
    return this.currentProduct;
  };

};