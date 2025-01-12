import { APIRequestContext, Page, expect } from "@playwright/test";
import type {
    ProductInfor,
} from "@types";

export class ProductAPI {
    page: Page;
    domain: string;
    request: APIRequestContext;

    constructor(domain: string, request: APIRequestContext) {
        this.domain = domain;
        this.request = request;
    }
    /**
  * Get Id category By name
  */
    async getIDCategoryByName(categoryName: string): Promise<string> {
        const res = await this.request.get(`${this.domain}/categories`);
        if (!res.ok()) {
            return Promise.reject(`Error message: ${(await res.json()).error} ${new Error().stack}`);
        }
        expect(res.status()).toBe(200);
        const resBody = await res.json();
        const categorie = resBody.find(category => category.name == categoryName);
        return categorie.id;
    }

    /**
* Get product By category Id
*/
    async getProductByCategory(categoryId: string): Promise<Array<ProductInfor>> {
        let productRespon: Array<ProductInfor>;
        const res = await this.request.get(`${this.domain}/products?categoryId=${categoryId}`);
        if (!res.ok()) {
            return Promise.reject(`Error message: ${(await res.json()).error} ${new Error().stack}`);
        }
        expect(res.status()).toBe(200);
        productRespon = await res.json();
        return productRespon;
    }
}
