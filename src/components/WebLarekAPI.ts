import { IOrderResponse, IProduct, IOrder } from "../types";
import { Api, ApiListResponse } from "./base/Api";

export interface IWebLarekAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderProducts: (order: IOrder) => Promise<IOrderResponse>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`);
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) => data.items);
    }

    orderProducts(order: IOrder): Promise<IOrderResponse> {
        return this.post('/order', order);
    }
}