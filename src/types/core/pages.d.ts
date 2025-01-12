export type UserInfor = {
    id?: string,
    username?: string,
    email?: string,
    password?: string
};
export type CreateUserResponse = {
    id?: string,
    username?: string,
    email?: string,
    password?: string
};
export type ProductInfor = {
    id?: string,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    categoryId: string
};
export type productCheckout = {
    proproductId?: string | number,
    quantity: number
}

export type OrderInfo = {
    id?: string,
    userId?: string | number,
    status?: string,
    items: Array<productCheckout>
};
export type ReviewInfos = {
    id?: string,
    userId: string | number,
    productId: string | number,
    rating: number,
    comment: string,
}