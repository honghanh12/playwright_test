import { expect } from '@playwright/test';
import { test } from "@core/fixtures";
import { UserAPI } from '@pages/API/user';
import { ProductAPI } from '@pages/API/product';
import { OrderAPI } from '@pages/API/order';
import { ReviewAPI } from '@pages/API/write_review'
import type {
    ProductInfor, productCheckout
} from "@types";

test.describe("verify API", () => {
    let userAPI: UserAPI;
    let productAPI: ProductAPI;
    let orderAPI: OrderAPI;
    let reviewAPI: ReviewAPI;
    let productResponSeachByCategory: Array<ProductInfor>;
    let dataExp;
    let productsCheckout: Array<productCheckout>;

    test.beforeEach(async ({ conf, request }) => {
        userAPI = new UserAPI(conf.suiteConf.domain, request);
        productAPI = new ProductAPI(conf.suiteConf.domain, request);
        orderAPI = new OrderAPI(conf.suiteConf.domain, request);
        reviewAPI = new ReviewAPI(conf.suiteConf.domain, request);
    });

    test('create user false @TC_01', async ({ conf }) => {
        const usersInfo = conf.caseConf.users
        for (let i = 0; i < usersInfo.length; i++) {
            await test.step(`${usersInfo[i].title}`, async () => {
                const userRespon = await userAPI.createNewUser(usersInfo[i].user_infor);
                expect(userRespon.status).toBe(usersInfo[i].status_code);
            });
        }
    });

    test('create user sucess @TC_02', async ({ conf }) => {
        const usersInfo = conf.caseConf.users_infor
        await test.step("create user sucess", async () => {
            const userRespon = await userAPI.createNewUser(usersInfo);
            expect(userRespon.status).toBe(userRespon.status);
            dataExp = await userRespon.json();
            expect(dataExp).toEqual(expect.objectContaining({
                username: usersInfo.username,
                email: usersInfo.email,
                password: usersInfo.password
            }));

            const UserInfoById = await userAPI.getUserById(dataExp.id);
            expect(UserInfoById).toEqual(expect.objectContaining({
                username: usersInfo.username,
                email: usersInfo.email,
                password: usersInfo.password
            }));

        });
        await test.step("Search products with a category named: “Electronics“", async () => {
            const idCategory = await productAPI.getIDCategoryByName("Electronics");
            productResponSeachByCategory = await productAPI.getProductByCategory(idCategory);
            if (productResponSeachByCategory.length > 0) {
                for (const products of productResponSeachByCategory) {
                    expect(products.categoryId).toBe(Number(idCategory));
                }

            }
        });

        if (productResponSeachByCategory.length > 0) {
            await test.step("Place an order with a product of the previous step successfully", async () => {
                productsCheckout = productResponSeachByCategory.map(product => ({
                    proproductId: product.id,
                    quantity: 2
                }));
                const OrderInfo = {
                    "userId": dataExp.id,
                    "status": "processing",
                    "items": productsCheckout
                }
                const orderRespon = await orderAPI.createAnOrderWithCreditCard(OrderInfo);
                expect(orderRespon).toEqual(expect.objectContaining({
                    userId: OrderInfo.userId,
                    status: OrderInfo.status,
                    items: OrderInfo.items
                }));
                const OrderInfoById = await orderAPI.getOrderById(orderRespon.id);
                expect(OrderInfoById).toEqual(expect.objectContaining({
                    userId: OrderInfo.userId,
                    status: OrderInfo.status,
                    items: OrderInfo.items
                }));
            });

            await test.step("Write a review for the purchased product successfully", async () => {
                for (const product of productsCheckout) {
                    const reviewInfo = {
                        userId: dataExp.id,
                        productId: product.proproductId,
                        rating: 4,
                        comment: "Great product!",
                    }
                    const reviewRespon = await reviewAPI.createReview(reviewInfo);
                    expect(reviewRespon).toEqual(expect.objectContaining({
                        userId: reviewInfo.userId,
                        productId: reviewInfo.productId,
                        rating: reviewInfo.rating,
                        comment: reviewInfo.comment
                    }));
                    const OrderInfoById = await reviewAPI.getReviewById(reviewRespon.id);
                    expect(OrderInfoById).toEqual(expect.objectContaining({
                        userId: reviewInfo.userId,
                        productId: reviewInfo.productId,
                        rating: reviewInfo.rating,
                        comment: reviewInfo.comment
                    }));
                }
            });
        }
    });
});