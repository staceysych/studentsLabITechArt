import { FetchMock } from "jest-fetch-mock";
import { searchGame } from "../src/utils";

const fetchMock = fetch as FetchMock;

describe("Fetch data", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Should return data", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 27,
        name: "FIFA 2013",
        rating: 5,
        price: 98,
        poster: "https://res.cloudinary.com/dfoobx4vi/image/upload/v1617716647/game-posters/PSP/unnamed_l2cko6.png",
        date: "2021-04-04",
        genre: "sport",
        age: "6",
        devise: "Xbox",
      })
    );

    const data = await searchGame("");

    expect.assertions(2);

    expect(data.name).toEqual("FIFA 2013");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
