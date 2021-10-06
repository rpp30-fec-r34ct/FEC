const findTotalReviews = (ratings) => {
  let total = 0
  const ratingKeys = Object.keys(ratings)

  ratingKeys.forEach((rating) => {
    total += Number(ratings[rating])
  })

  return total
}

const findTotalScore = (ratings) => {
  let total = 0
  const ratingKeys = Object.keys(ratings)

  ratingKeys.forEach((rating) => {
    total += Number(rating) * Number(ratings[rating])
  })

  return total
}

const findAverageRating = (ratings) => (findTotalScore(ratings) / findTotalReviews(ratings))

const findStarRating = (ratings) => (Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2) ? Number((Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2)) : 0

module.exports = {
  findTotalReviews,
  findTotalScore,
  findAverageRating,
  findStarRating
}
