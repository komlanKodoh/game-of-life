
import { getToken, parseToken } from "./auth.service";

describe("Authentication service test", () => {
  it("Should create token", () => {
    let token = getToken({ id: "1aoga-agag-aga" });
    expect(token).toBeDefined();
  });

  it("Should parse token", () => {
      let token  =getToken({id: "ID"});
      let userIdentifier = parseToken(token);

      expect(userIdentifier).toBeDefined();
      expect(userIdentifier.id).toBeDefined();
  });
});
