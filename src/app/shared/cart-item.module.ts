export class CartItem{
	constructor(
    public userId:number,
    public date: Date,
    public products?: {productId:number,quantity:number}[],
    public id?: number
  ) {}
}
