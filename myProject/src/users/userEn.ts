export class UserEn
{
    constructor(public UserName: string = "", public Password: string = "0000",
         public Prefer: Array<number> = [0, 0, 0, 0, 0, 0], public FavoriteFoods: string = ""){}
}