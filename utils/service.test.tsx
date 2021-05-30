import service from "./service";

test("url with no slash at the end", () => {
    expect(service.getId("https://swapi.dev/api/vehicles/4"))!.toBe("4");
});

test("url with slash at the end", () => {
    expect(service.getId("https://swapi.dev/api/vehicles/4/"))!.toBe("4");
});

test("url with http instead of https", () => {
    expect(service.getId("http://swapi.dev/api/vehicles/4"))!.toBe("4");
});
