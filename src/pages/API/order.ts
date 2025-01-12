import { APIRequestContext, Page, expect } from "@playwright/test";
import type {
    OrderInfo,
} from "@types";

export class OrderAPI {
    page: Page;
    domain: string;
    request: APIRequestContext;

    constructor(domain: string, request: APIRequestContext) {
        this.domain = domain;
        this.request = request;
    }

    /**
      * Create an order .
      * @param infos Informations for this order
      * @returns All information of order.
      */
    async createAnOrderWithCreditCard(infos: OrderInfo): Promise<OrderInfo> {
        let orderRespon: OrderInfo;
        const res = await this.request.post(`${this.domain}/orders`, {
            data: infos
        });
        if (!res.ok()) {
            return Promise.reject(`Error message: ${(await res.json()).error} ${new Error().stack}`);
        }
        expect(res.status()).toBe(201);
        orderRespon = await res.json();
        return orderRespon;
    }



    /**
    * get all order
    */
    async getOrderById(id: string | number): Promise<OrderInfo> {
        const res = await this.request.get(`${this.domain}/orders`);
        const resBody = await res.json();
        const order = resBody.find(order => order.id == id);
        return order;
    }

}
