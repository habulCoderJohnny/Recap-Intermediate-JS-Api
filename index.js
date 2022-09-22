const spinner = document.getElementById('spinner'); //get spinner Id 
//Search btn function
const searchPhone = () => {
  spinner.style.display = "block"; //loading spinner display Block;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(json => displaySearchResult(json.data))
    searchField.value = '';
  }
  // displaySearchResult function & loope 
  const displaySearchResult = (phones) => {
    const SearchResult = document.getElementById('search-result');
    SearchResult.textContent = ''; //← ← clear previous search result
    if (phones.length == '') {
      document.getElementById('message').style.display = 'block';
      spinner.style.display = "none";
    }
      else {
        document.getElementById('message').style.display = 'none';
        if (phones.length >= 20 || phones.length < 20) {
          SearchResult.innerHTML = '';
          const part = phones.slice(0, 20); // only 20 item display
          part?.forEach(phone => {
          const div = document.createElement('div');
       div.classList.add('col');
        div.innerHTML =
        `
        <div class="card h-auto d-flex flex-column align-items-center ">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <div class="card-body d-flex flex-column align-items-start ">
          <h5 class="card-title text-primary">Phone Name: ${phone.phone_name}</h5>
          <p class="card-text fw-bolder text-primary">Brand: ${phone.brand}</p>
          <div class="text-center">
          <button onclick="loadPhoneById('${phone.slug}')" type="button" class="btn btn-primary ">Details</button></div>
        </div>
      </div> `;
      SearchResult.appendChild(div);
      spinner.style.display = "none";
    })
  }
}

} 

// get phone-Id | get phone details    
const loadPhoneById = phoneId => {
  // console.log(phoneId);
  const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
  .then(response => response.json())
  .then(json => displayPhoneById(json.data))
}




// Main Body Loading Spinner 
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
};