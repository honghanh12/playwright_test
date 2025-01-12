import { APIRequestContext, Page, expect } from "@playwright/test";
import type {
    ReviewInfos,
} from "@types";

export class ReviewAPI {
    page: Page;
    domain: string;
    request: APIRequestContext;

    constructor(domain: string, request: APIRequestContext) {
        this.domain = domain;
        this.request = request;
    }
    /**
     * Create new user
     */
    async createReview(data?: ReviewInfos): Promise<ReviewInfos> {
        const res = await this.request.post(`${this.domain}/reviews`, {
            data: data
        });
        if (!res.ok()) {
            return Promise.reject(`Error message: ${(await res.json()).error} ${new Error().stack}`);
        }
        expect(res.status()).toBe(201);
        const resBody = await res.json();
        return resBody;
    }

    /**
     * get user by Id
    */
    async getReviewById(id: string | number): Promise<ReviewInfos> {
        const res = await this.request.get(`${this.domain}/reviews`);
        if (!res.ok()) {
            return Promise.reject(`Error message: ${(await res.json()).error} ${new Error().stack}`);
        }
        expect(res.status()).toBe(200);
        const allReviewInfo = await res.json();
        const review = allReviewInfo.find(review => review.id == id);
        return review;
    }
}
