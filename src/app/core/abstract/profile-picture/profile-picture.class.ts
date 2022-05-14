export class ProfilePicture {

    private static instance: ProfilePicture;
    private image: string = '';

    private constructor() {}

    public static get(): ProfilePicture {
        if(!ProfilePicture.instance)
            ProfilePicture.instance = new ProfilePicture();
        return ProfilePicture.instance;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getImage(): string {
        return this.image;
    }

}