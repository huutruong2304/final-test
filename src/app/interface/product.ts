import { Category } from './category';

export interface Product {
    id: number,
    name:string,
    urlImage: string,
    imageArr: Array<string>,
    usualPrice: number,
    discount: number,
    discountPrice:number,
    description: string,
    qty: number,
    category: Category,
    createdAt: Date,
    new: boolean
}
