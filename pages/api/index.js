import appOnlyAuth from "../../src/snoowrap/snoowrap";

// options.limit sets an upper bound for the branching factor of the resulting replies tree,
// i.e.the number of comments that are fetched in reply to any given item

export default async function handler(req, res) {
  const r = await appOnlyAuth;
  const replies = await r
    .getSubmission("pk1ju3")
    .expandReplies({ limit: 0, depth: 0 });
  res.status(200).json(replies.comments);
}
