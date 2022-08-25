export const formatScore = (score: number | string) => {
  const scoreString = score.toString();
  // 10,000 -> 10K
  // 100,000 -> 100K
  if (10000 <= score && score < 1000000) {
    return `${scoreString.substring(0, scoreString.length - 3)}K`;
  }
  // 1,000,000 -> 1M
  // 100,000,000 -> 100M
  if (1000000 <= score && score < 1000000000) {
    return `${scoreString.substring(0, scoreString.length - 6)}M`;
  }
  return score;
};
