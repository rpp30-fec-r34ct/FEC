import helpers from '../../../client/src/components/Shared/helpers.js'


describe('review shared helpers', () => {

  test('Should return the correct rating description for a given rating (Fit)', function () {
    const description = helpers.getRatingTitle('Fit', 5);
    expect(description).toBe('Runs long')
  })

  test('Should return the correct rating description for a given rating (Fit)', function () {
    const description = helpers.getRatingTitle('Fit', 4);
    expect(description).toBe('Runs slightly long')
  })


  test('Should return the correct rating description for a given rating (Fit)', function () {
    const description = helpers.getRatingTitle('Fit', 3);
    expect(description).toBe('Perfect')
  })


  test('Should return the correct rating description for a given rating (Fit)', function () {
    const description = helpers.getRatingTitle('Fit', 2);
    expect(description).toBe('Runs slightly tight')
  })

  test('Should return the correct rating description for a given rating (Fit)', function () {
    const description = helpers.getRatingTitle('Fit', 1);
    expect(description).toBe('Runs tight')
  })

  test('Should return the correct rating description for a given rating (Comfort)', function () {
    const description = helpers.getRatingTitle('Comfort', 5);
    expect(description).toBe('Perfect')
  })

  test('Should return the correct rating description for a given rating (Comfort)', function () {
    const description = helpers.getRatingTitle('Comfort', 4);
    expect(description).toBe('Comfortable')
  })

  test('Should return the correct rating description for a given rating (Comfort)', function () {
    const description = helpers.getRatingTitle('Comfort', 3);
    expect(description).toBe('Ok')
  })

  test('Should return the correct rating description for a given rating (Comfort)', function () {
    const description = helpers.getRatingTitle('Comfort', 2);
    expect(description).toBe('Slightly uncomfortable')
  })

  test('Should return the correct rating description for a given rating (Comfort)', function () {
    const description = helpers.getRatingTitle('Comfort', 1);
    expect(description).toBe('Uncomfortable')
  })

  test('Should return the correct rating description for a given rating (Quality)', function () {
    const description = helpers.getRatingTitle('Quality', 5);
    expect(description).toBe('Perfect')
  })

  test('Should return the correct rating description for a given rating (Quality)', function () {
    const description = helpers.getRatingTitle('Quality', 4);
    expect(description).toBe('Pretty Great')
  })

  test('Should return the correct rating description for a given rating (Quality)', function () {
    const description = helpers.getRatingTitle('Quality', 3);
    expect(description).toBe('What I expected')
  })

  test('Should return the correct rating description for a given rating (Quality)', function () {
    const description = helpers.getRatingTitle('Quality', 2);
    expect(description).toBe('Below Average')
  })

  test('Should return the correct rating description for a given rating (Quality)', function () {
    const description = helpers.getRatingTitle('Quality', 1);
    expect(description).toBe('Poor')
  })

  test('Should return the correct rating description for a given rating (Size)', function () {
    const description = helpers.getRatingTitle('Size', 5);
    expect(description).toBe('A size too big')
  })

  test('Should return the correct rating description for a given rating (Size)', function () {
    const description = helpers.getRatingTitle('Size', 4);
    expect(description).toBe('1/2 a size too big')
  })

  test('Should return the correct rating description for a given rating (Size)', function () {
    const description = helpers.getRatingTitle('Size', 3);
    expect(description).toBe('Perfect')
  })

  test('Should return the correct rating description for a given rating (Size)', function () {
    const description = helpers.getRatingTitle('Size', 2);
    expect(description).toBe('1/2 a size too small')
  })

  test('Should return the correct rating description for a given rating (Size)', function () {
    const description = helpers.getRatingTitle('Size', 1);
    expect(description).toBe('A size too small')
  })

  test('Should return the correct rating description for a given rating (Length)', function () {
    const description = helpers.getRatingTitle('Length', 5);
    expect(description).toBe('Runs long')
  })


  test('Should return the correct rating description for a given rating (Length)', function () {
    const description = helpers.getRatingTitle('Length', 4);
    expect(description).toBe('Runs slightly long')
  })

  test('Should return the correct rating description for a given rating (Length)', function () {
    const description = helpers.getRatingTitle('Length', 3);
    expect(description).toBe('Perfect')
  })

  test('Should return the correct rating description for a given rating (Length)', function () {
    const description = helpers.getRatingTitle('Length', 2);
    expect(description).toBe('Runs slightly short')
  })

  test('Should return the correct rating description for a given rating (Length)', function () {
    const description = helpers.getRatingTitle('Length', 1);
    expect(description).toBe('Runs short')
  })

  test('Should return the correct rating description for a given rating (Width)', function () {
    const description = helpers.getRatingTitle('Width', 5);
    expect(description).toBe('Too Wide')
  })

  test('Should return the correct rating description for a given rating (Width)', function () {
    const description = helpers.getRatingTitle('Width', 4);
    expect(description).toBe('Slightly Wide')
  })

  test('Should return the correct rating description for a given rating (Width)', function () {
    const description = helpers.getRatingTitle('Width', 3);
    expect(description).toBe('Perfect')
  })

  test('Should return the correct rating description for a given rating (Width)', function () {
    const description = helpers.getRatingTitle('Width', 2);
    expect(description).toBe('Slightly narrow')
  })

  test('Should return the correct rating description for a given rating (Width)', function () {
    const description = helpers.getRatingTitle('Width', 1);
    expect(description).toBe('Too narrow')
  })

  test('Should return the right rating given an array of ratings', function () {
    const rating = helpers.findStarRating([4.5,2,3,4])
    expect(rating).toBe(1.5)
  })

  test('Should return the totalReviews given an array of ratings', function () {
    const rating = helpers.findTotalReviews([4,2,3,4])
    expect(rating).toBe(13)
  })

  test('Should return the totalReviews given an array of ratings', function () {
    const rating = helpers.findTotalReviews([4,2,3,4])
    expect(rating).toBe(13)
  })

  test('Should return 1 for a rating of Poor', function () {
    const rating = helpers.getFormStarRating('Poor')
    expect(rating).toBe(1)
  })

  test('Should return 2 for a rating of Fair', function () {
    const rating = helpers.getFormStarRating('Fair')
    expect(rating).toBe(2)
  })

  test('Should return 3 for a rating of Average', function () {
    const rating = helpers.getFormStarRating('Average')
    expect(rating).toBe(3)
  })

  test('Should return 4 for a rating of Good', function () {
    const rating = helpers.getFormStarRating('Good')
    expect(rating).toBe(4)
  })

  test('Should return 5 for a rating of Great', function () {
    const rating = helpers.getFormStarRating('Great')
    expect(rating).toBe(5)
  })


})