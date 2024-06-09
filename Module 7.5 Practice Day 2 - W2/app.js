const loadAllmeals = (query)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(res=>res.json())
            .then(data=> {
                displayMeals(data);

            });

const displayMeals = (data) => {
    const meals = data.meals;
    const mealContainer = document.getElementById("meal-container");

    mealContainer.innerHTML = ""
    if(data.meals){
        console.log('found');
    }
    else{
        console.log('not found');
        mealContainer.innerHTML += `<h1 >Not found...!</span></h1>`
    }

    meals.forEach(meal => {

        console.log(meal);

        const divCard = document.createElement("divCard");
        // divCard.classList.add("card")
        divCard.innerHTML = `
       <div onClick={openModal(${meal.idMeal})} class="card">
            <img src="${meal.strMealThumb}"/>
            <div class="carddetail">
                <h1>${meal.strMeal}</h1>
                <p>${meal.strInstructions.slice(0,250)}</p>
                <button>Read more</button>
            </div>
        </div>
        `;

        mealContainer.appendChild(divCard)
    });
}

};
loadAllmeals("")
const searchBtn = document.getElementById("searchBtn")
const inputValue = document.getElementById("inputValue")

searchBtn.addEventListener("click", () => {
    loadAllmeals(inputValue.value)
})



const modalcard = document.getElementById("modalcard")
const modal = document.getElementById("modal")

const openModal = async(id) =>{

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await res.json()
    const meal = data.meals[0]


    modalcard.innerHTML = `
        <div class="modalcontent">
        <div class="close">
                <i onclick="closeModal()" class="fa-solid fa-circle-xmark"></i>
            </div>
        <img src="${meal.strMealThumb}"/>
        <div class="modaldetail">
            
            <h1>${meal.strMeal}</h1>
            <p>${meal.strInstructions.slice(0,500)}</p>

            <div class="modalinfo">
                <h5><i class="fa-solid fa-utensils"></i> ${meal.strCategory}</h5>
                <h5><i class="fa-solid fa-location-dot"></i> ${meal.strArea}</h5>
            </div>
        </div>
        </div>
    `
    modal.style.display = 'flex'

    modalcard.style.display = 'flex'

}

const closeModal = () => {
    modal.style.display = 'none'
    modalcard.style.display = 'none'
}