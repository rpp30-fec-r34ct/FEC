const findTotalReviews = (ratings) => {
  let result = 0;
  const ratingKeys = Object.keys(ratings);

  ratingKeys.forEach((rating) => {
    result += Number(ratings[rating]);
  });

  return result;
}

const findTotalScore = (ratings) => {
  let result = 0;
  const ratingKeys = Object.keys(ratings);

  ratingKeys.forEach((rating) => {
    result += Number(rating) * Number(ratings[rating]);
  });

  return result;
}

const findAverageRating = (ratings) => (findTotalScore(ratings) / findTotalReviews(ratings));

const findStarRating = (ratings) => (Math.round(findAverageRating(ratings) * 4) / 4);


module.exports = {
  findTotalReviews,
  findTotalScore,
  findAverageRating,
  findStarRating
}