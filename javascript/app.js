
const loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
   
    // view all part 
    const viewAll = document.getElementById('view-all');
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0, 12);
        viewAll.classList.remove('d-none');
    }
    else{
        viewAll.classList.add('d-none');
    }

     // Error Part No Phone 
     const noPhone = document.getElementById('no-phone-massage');
     if(phones.length == 0){
         noPhone.classList.remove('d-none')
     }
     else{
         noPhone.classList.add('d-none')
     }
    
    phones.forEach(phone =>{
        // console.log(phone)
      const creatDiv = document.createElement('div');
      creatDiv.classList.add('col');
      creatDiv.innerHTML = `
    <div class="card h-100 p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.slug}</p>
          <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
    </div>  
    `
    phoneContainer.appendChild(creatDiv);
    })
    // stop loding spenner
    toggoleSpenner(false) 
}


const processSearch = (dataLimit) =>{
     // start loding spenner 
     toggoleSpenner(true)
     const filedSearch = document.getElementById('filed-search');
     const searchText = filedSearch.value;
    //  filedSearch.value = '';
     loadPhone(searchText, dataLimit);
     
}

// ******************seacrh Button Section */
const searchButton = () =>{
   processSearch(10);
}

// search input filed enter kew handler 
document.getElementById('filed-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

//*****************loding spenner sectin */
const toggoleSpenner = isLoding => {
    const lodingSpenner = document.getElementById('loding-spenner');
    if(isLoding){
        lodingSpenner.classList.remove('d-none');
    }
    else{
        lodingSpenner.classList.add('d-none');
    }
}
// viewAll Functon 
const viewAllButton = () =>{
    processSearch();
}

const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneModal(data.data);
}

const displayPhoneModal = phone =>{
    // console.log(phone)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalDetails = document.getElementById('phone-details');
    modalDetails.innerHTML = `
    <img src="${phone.image}">
    <p>Relais: ${phone.releaseDate ? phone.releaseDate : 'No Relais Date Found'} </p>
    <h6>Memory: ${phone.mainFeatures.memory}</h6>
    <h6>Storage: ${phone.mainFeatures.storage}</h6>
    <p>Display: ${phone.mainFeatures.displaySize}</p>
    <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
    <p>Others: Blutooth: ${phone.others ? phone.others.Bluetooth : 'No Bluthot Option'}</p>
    <button class="btn btn-danger">Buy Now</button>
    `
}
// loadPhone();