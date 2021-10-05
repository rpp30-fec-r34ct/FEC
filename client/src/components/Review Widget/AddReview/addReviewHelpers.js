
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

const getFormRecommended = () => {
  let recommended = document.getElementById('yesRecommend').checked;
  return recommended;
}

const getFormCharacteristics = () => {
  let allRadios = document.getElementsByClassName("characteristicRadio")
  let checkedRadios = {};

  for (let i = 0; i < allRadios.length; i++) {
    if (allRadios[i].checked) {
      checkedRadios[allRadios[i].name] = allRadios[i].id
    }
  }

  return checkedRadios;
}

const getFormReviewSummary = () => {
  return document.getElementById("reviewSummary").value;
}

const getFormReviewBody = () => {
  return document.getElementById("reviewBody").value;
}

const getFormReviewNickName = () => {
  return document.getElementById("nickName").value;
}

const getFormReviewEmail = () => {
  return document.getElementById("email").value;
}






module.exports = {
  getFormStarRating,
  getFormRecommended,
  getFormCharacteristics,
  getFormReviewSummary
}