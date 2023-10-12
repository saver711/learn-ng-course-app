export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    // because ام التوقيت الصيفي
    const fakeDate = new Date();
    fakeDate.setHours(fakeDate.getHours() - 1);
    if (!this._tokenExpirationDate || fakeDate > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
