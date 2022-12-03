class CursorProvider {
  //getCursorIndex that keeps track of the current position of a cursor by counting the index
  //to the last cursor’s document ID.
  public async getCursorIndex(): Promise<any> {
    return;
  }

  public async getCursorResult(): Promise<any> {
    return;
  }
  //Make a second method called getCursorResult which accepts a limit and cursor argument (it is up to you if you want to
  //implement other arguments like sort and filter). The method should call getCursorIndex to find out how many items it should skip,
  //then use its parameters to query the database and return the next set of results. This method should return a boolean for a field hasNextPage,
  // string ID/null for the current position of the cursor, the totalCount of documents, and a results field that contains the pizzas.
}

export { CursorProvider };
