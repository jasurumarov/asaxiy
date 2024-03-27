const products = document.querySelector(".products-section__products")
const loadingGroup = document.querySelector(".loading-group")

// LOADING

let arr = Array(20).fill("")
let fragmentLoading = document.createDocumentFragment()
arr.forEach((el, i)=>{
    let loading = document.createElement("div")
    loading.innerHTML = `
        <img src="./images/main/loading.png" alt="Loading">
    ` 
    fragmentLoading.appendChild(loading)
})
loadingGroup.appendChild(fragmentLoading)

// API

const API_URL = "https://fakestoreapi.com/products"

async function fetchData(api) {
    let data = await fetch(api)
    data 
        .json()
        .then(res => createProduct(res))
        .catch(err => console.log(err))
        .finally(()=>{loadingGroup.style.display = "none"})
}
fetchData(API_URL)

function createProduct(data) {
    let fragment = document.createDocumentFragment()
    data.forEach(el => {
        let product = document.createElement("div")
        product.classList.add("products-section__products__card")
        product.innerHTML = `
            <div class="products__card-absolutes">
                <p>Новинка</p>
                <button  class="products__card-absolutes--heart">
                    <img data-id=${el.id} name="btn-heart" src="./images/main/heart.svg" alt="Heart Image">
                </button>
                <img class="products__card-absolutes--compare" src="./images/main/compare_gray.svg" alt="Compare Image">
            </div>
            <div class="products__card-img">
                <img data-id=${el.id} name="product-img" src="${el.image}" alt="">
            </div>
            <div class="products__card-info">
                <p class="products__card-info--title" title="${el.description}">${el.description}</p>
                <div class="products__card-info--rating">
                    <img src="./images/main/starss.svg" alt="">
                    <div>
                        <p>(${el.rating.rate})</p>
                    </div>
                </div>
                <div class="products__card-info--prices">
                    <h3>${el.price * 12500} сум</h3>
                    <p>${Math.trunc((el.price * 12500) / 12)} сум x 12 мес</p>
                </div>
            </div>
            <div class="products__card-btns">
                <button class="products__card-btns--buy">Купить сейчас</button>
                <button class="products__card-btns--cart">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.5 1.14286C0.5 0.78782 0.826217 0.5 1.22862 0.5H1.77096C2.69434 0.5 3.24721 1.04771 3.56336 1.55685C3.77408 1.89623 3.92653 2.28987 4.04577 2.64624C4.07806 2.64401 4.11078 2.64286 4.14387 2.64286H16.2849C17.0914 2.64286 17.6738 3.32379 17.4527 4.00811L15.677 9.50163C15.3498 10.5142 14.3012 11.2124 13.1079 11.2124H7.32937C6.12618 11.2124 5.07145 10.5028 4.75303 9.47909L4.01422 7.10386L2.7915 3.4621L2.78952 3.45572C2.63825 2.96901 2.49629 2.51433 2.28534 2.1746C2.08048 1.84469 1.91718 1.78571 1.77096 1.78571H1.22862C0.826217 1.78571 0.5 1.49789 0.5 1.14286Z"
                            fill="white"></path>
                        <path
                            d="M6.81481 15.5C7.88792 15.5 8.7578 14.7325 8.7578 13.7857C8.7578 12.8389 7.88792 12.0714 6.81481 12.0714C5.74173 12.0714 4.87183 12.8389 4.87183 13.7857C4.87183 14.7325 5.74173 15.5 6.81481 15.5Z"
                            fill="white"></path>
                        <path
                            d="M13.6151 15.5C14.6882 15.5 15.5581 14.7325 15.5581 13.7857C15.5581 12.8389 14.6882 12.0714 13.6151 12.0714C12.542 12.0714 11.6721 12.8389 11.6721 13.7857C11.6721 14.7325 12.542 15.5 13.6151 15.5Z"
                            fill="white"></path>
                    </svg>
                </button>
            </div>
        `
        fragment.appendChild(product)
    });
    products.appendChild(fragment)   
}

// MENU

const menuBtn = document.querySelector(".header-mobile__menu-btn")
const menuCloseBtn = document.querySelector(".header-top__menuClose-btn")

menuBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("menu-opened")
})
menuCloseBtn.addEventListener("click", ()=>{
    document.body.classList.remove("menu-opened")
})

////////////// SINGLE ROUTE ///////////////////

const singleRoute = (id)=>{
    window.open(`/pages/singleProduct.html?id=${id}`, "_self") 
}

products.addEventListener("click", (e)=> {
    if (e.target.name === "product-img") {
        let id = e.target.dataset.id;  
        singleRoute(id)          
    }
})