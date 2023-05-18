export const formatScore = (score: number) => {
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

// export const secondsToHms = (seconds: string) => {
//   if (!seconds) return "";

//   let duration = seconds;
//   let hours = duration / 3600;
//   duration = duration % 3600;

//   let min = parseInt(duration / 60);
//   duration = duration % 60;

//   let sec = parseInt(duration);

//   if (sec < 10) {
//     sec = `0${sec}`;
//   }
//   if (min < 10) {
//     min = `0${min}`;
//   }

//   if (parseInt(hours, 10) > 0) {
//     return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
//   } else if (min == 0) {
//     return `${sec}s`;
//   } else {
//     return `${min}m ${sec}s`;
//   }
// };
