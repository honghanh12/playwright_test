import { APIRequestContext, Page, expect } from "@playwright/test";
import type {
    UserInfor,
    CreateUserResponse
} from "@types";

export class UserAPI {
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
    async createNewUser(data?: UserInfor, method = "post") {
        const res = await fetch(`${this.domain}/users`, {
            method: method,
            body: JSON.stringify(data)
        });
        // const resBody = await res.json();
        return res;
    }

    /**
    * dekete user
    */
    async deleteUser(id: string) {
        const res = await this.request.delete(`${this.domain}/users/${id}`);
        expect(res.status()).toBe(200);
    }

    /**
    * get all user
    */
    async getAllUsers(): Promise<Array<CreateUserResponse>> {
        const res = await this.request.get(`${this.domain}/users`);
        const resBody = await res.json();
        return resBody;
    }

    /**
     * get user by Id
    */
    async getUserById(id: string | number): Promise<CreateUserResponse> {
        const allUserInfo = await this.getAllUsers();
        const user = allUserInfo.find(user => user.id == id);
        return user;
    }
}
