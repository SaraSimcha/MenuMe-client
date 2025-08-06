export class FullUser {
    constructor(public UserName: string = "admin", public Password: string = "0000",public Gender: string = "",
    public Activity: string = "", public Details: Array<number> = [0, 0, 0, 0, 0], public Prefer: Array<number> = [0, 0, 0, 0, 0, 0], public FavoriteFoods: string = "") { }
}