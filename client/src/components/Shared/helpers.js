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

const getFormStarRating = (rating) => {
  if (rating === undefined) {
    const rating = document.getElementById('addReviewStarsOutput').innerText
  }
  switch (rating) {
    case ('Poor'):
      return 1
    case ('Fair'):
      return 2
    case ('Average'):
      return 3
    case ('Good'):
      return 4
    case ('Great'):
      return 5
    default:
      return ''
  }
}
const findStarRating = (ratings) => (Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2) ? Number((Math.round(findAverageRating(ratings) * 4) / 4).toFixed(2)) : 0

const getRatingTitle = (characteristic, rating) => {
  if (characteristic === 'Size') {
    switch (rating) {
      case 1:
        return 'A size too small'

      case 2:
        return '1/2 a size too small'

      case 3:
        return 'Perfect'

      case 4:
        return '1/2 a size too big'

      case 5:
        return 'A size too big'

      default:
        return '[size] No rating string'
    }
  } else if (characteristic === 'Width') {
    switch (rating) {
      case 1:
        return 'Too narrow'

      case 2:
        return 'Slightly narrow'

      case 3:
        return 'Perfect'

      case 4:
        return 'Slightly Wide'

      case 5:
        return 'Too Wide'

      default:
        return '[width] No rating string'
    }
  } else if (characteristic === 'Comfort') {
    switch (rating) {
      case 1:
        return 'Uncomfortable'

      case 2:
        return 'Slightly uncomfortable'

      case 3:
        return 'Ok'

      case 4:
        return 'Comfortable'

      case 5:
        return 'Perfect'

      default:
        return '[Comfort] No rating string'
    }
  } else if (characteristic === 'Quality') {
    switch (rating) {
      case 1:
        return 'Poor'

      case 2:
        return 'Below Average'

      case 3:
        return 'What I expected'

      case 4:
        return 'Pretty Great'

      case 5:
        return 'Perfect'

      default:
        return '[Quality] No rating string'
    }
  } else if (characteristic === 'Length') {
    switch (rating) {
      case 1:
        return 'Runs short'

      case 2:
        return 'Runs slightly short'

      case 3:
        return 'Perfect'

      case 4:
        return 'Runs slightly long'

      case 5:
        return 'Runs long'

      default:
        return '[Length] No rating string'
    }
  } else {
    switch (rating) {
      case 1:
        return 'Runs tight'

      case 2:
        return 'Runs slightly tight'

      case 3:
        return 'Perfect'

      case 4:
        return 'Runs slightly long'

      case 5:
        return 'Runs long'

      default:
        return '[Fit] No rating string'
    }
  }
}

module.exports = {
  findTotalReviews,
  findTotalScore,
  findAverageRating,
  findStarRating,
  getFormStarRating,
  getRatingTitle
}
