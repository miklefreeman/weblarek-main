import { IOrderResponse, IProduct, IOrder } from "../types";
import { Api, ApiListResponse } from "./base/Api";

export interface IWebLarekAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderProducts: (order: IOrder) => Promise<IOrderResponse>;
}

export class WebLarekAPI implements IWebLarekAPI {
    private api: Api;  // 👈 композиция: храним экземпляр Api

    constructor(baseUrl: string, options?: RequestInit) {
        this.api = new Api(baseUrl, options);  // 👈 создаем Api внутри
    }

    getProductItem(id: string): Promise<IProduct> {
        return this.api.get(`/product/${id}`);
    }

    getProductList(): Promise<IProduct[]> {
        return this.api.get('/product').then((data: ApiListResponse<IProduct>) => data.items);
    }

    orderProducts(order: IOrder): Promise<IOrderResponse> {
        return this.api.post('/order', order);
    }
}