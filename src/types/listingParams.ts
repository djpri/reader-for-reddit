// More details: https://www.reddit.com/dev/api/#listings
export type ListingParams = {
  // only one should be specified. these indicate the fullname of an item in the listing to use as the anchor point of the slice
  before: string;
  after: string;
  // the number of items already seen in this listing
  count: number;
  // the maximum number of items desired (default: 25, maximum: 100)
  limit: number;
  // optional parameter; if "all" is passed, filters such as "hide links that I have voted on" will be disabled
  show: string;
};
