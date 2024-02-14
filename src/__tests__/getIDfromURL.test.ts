import { getIdfromURL } from "../utils/getIdFromUrl";

describe("getIdfromURL", () => {
  it("should return id", () => {
    const id = getIdfromURL(
      "users",
      "/api/users/15105ea9-74e3-4a48-bc77-25fbed03cc00",
    );

    expect(id).toBe("15105ea9-74e3-4a48-bc77-25fbed03cc00");
  });
});
