const findTotalReviews = (ratings) => {
  let total = 0;
  const ratingKeys = Object.keys(ratings);

  ratingKeys.forEach((rating) => {
    total += Number(ratings[rating]);
  });

  return total;
}

const findTotalScore = (ratings) => {
  let total = 0;
  const ratingKeys = Object.keys(ratings);

  ratingKeys.forEach((rating) => {
    total += Number(rating) * Number(ratings[rating]);
  });

  return total;
}

const findAverageRating = (ratings) => (findTotalScore(ratings) / findTotalReviews(ratings));

const findStarRating = (ratings) => (Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2) ? Number((Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2)) : 0;


const getFormStarRating = () => {
  let rating = document.getElementById('addReviewStarsOutput').innerText;

  switch (rating) {
    case ('Poor'):
      return 1;
    case('Fair'):
      return 2;
    case('Average'):
      return 3;
    case('Good'):
      return 4;
    case('Great'):
      return 5;
    default:
      return '';
  }
}

module.exports = {
  findTotalReviews,
  findTotalScore,
  findAverageRating,
  findStarRating,
  getFormStarRating
}