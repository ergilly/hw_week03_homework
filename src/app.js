document.addEventListener('DOMContentLoaded', () => {
  console.log("jsLoaded");
  fetch('https://api.magicthegathering.io/v1/cards')
    .then((res) => console.log(res.json()));
})
