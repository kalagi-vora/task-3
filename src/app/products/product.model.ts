export class Product{
  constructor(
    public title: string,
    public category: string,
    public price: number,
    public description: string,
    public image: string,
    public id?: number,
    public quantity? : number
    ){}
}
