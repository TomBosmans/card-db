import defaultDB from "src/db"

export default class CardRepository {
  constructor(private readonly db = defaultDB) {}

  public findMany() {}
  public findFirst() {}
}
