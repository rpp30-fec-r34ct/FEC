
const getOverviewStarRating = () => {
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

const getRecommended = () => {
  let recommended = document.getElementById('yesRecommend').checked;
  return recommended;
}






module.exports = {
  getOverviewStarRating,
  getRecommended
}