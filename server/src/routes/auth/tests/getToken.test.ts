import Auth from '..';


describe("Get Token test ", () => {
    it( " should return a new token ", () => {
        let token = Auth.Service.getToken({ id : "Some random shit "});

        expect(token.value).toBeDefined();
        expect(typeof token.expires).toBe("number")
    });
})