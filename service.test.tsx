import service from "./service";

test("url with no slash at the end", () => {
    const item = { url: "https://swapi.dev/api/vehicles/4" };
    expect(service.getId({ item })).toBe("4");
});

test("url with slash at the end", () => {
    const item = { url: "https://swapi.dev/api/vehicles/4/" };
    expect(service.getId({ item })).toBe("4");
});

test("url with http instead of https", () => {
    const item = { url: "http://swapi.dev/api/vehicles/4/" };
    expect(service.getId({ item })).toBe("4");
});
