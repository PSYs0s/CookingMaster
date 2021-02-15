//enter key activation in searchbox
document.getElementById("search-feild").addEventListener("keypress",function(event){
    // event.preventDefault()
    if(event.key== "Enter"){
        document.getElementById("search-button").click()
    }
})


const searchMeal = () => {
    const searchText = document.getElementById("search-feild").value
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`
    //load data
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals))
}

//display meal after search
const displayMeal = meals => {
    
    const mealsContainer = document.getElementById("mealsContainer")
    mealsContainer.innerHTML=""
    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement("div")
        mealDiv.className = "mealsNameWithPicture"
        mealDiv.innerHTML = `     
            <div class="col h-100">
                <div class="card overflow-hidden meal-thum-radius-control h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" onclick="getMealId(${meal.idMeal})" alt="...">
                    <div class="card-body">
                        <h6 class="card-title title-size text-center">${meal.strMeal}</h6>
                    </div>
                </div>
            </div>  
        `
        mealsContainer.appendChild(mealDiv)
    });
}

//taking meal id 
const getMealId = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMealIngredient(data.meals))
}

//display meal ingredient
const displayMealIngredient = meals =>{
    document.getElementById("mealSectionShowingSearchResult").style.display="none"
    document.getElementById("displayMealIngredient").style.display="block"
    meals.forEach(meal => {
        const mealIngredientContainer=document.getElementById("displayMealIngredient")
        mealIngredientContainer.innerHTML= `
        <div>
            <button onclick="backHomePage()" class="btn btn-danger">Back</button>
        </div>
        <div class="card" style="width: 18rem;background-color: tomato;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="fw-1 card-title">${meal.strMeal}</h5>
                <h6>Ingredients</h6>
                <p><i class="far fa-check-square"></i>${meal.strIngredient1}</p>
                <p><i class="far fa-check-square"></i>${meal.strIngredient2}</p>
                <p><i class="far fa-check-square"></i>${meal.strIngredient3}</p>
                <p><i class="far fa-check-square"></i>${meal.strIngredient4}</p>
                <p><i class="far fa-check-square"></i>${meal.strIngredient5}</p>
                <p><i class="far fa-check-square"></i>${meal.strIngredient6}</p>    
            </div>
        </div>
        `
    });
}

//back home page
const backHomePage = () =>{
    const mealsContainer = document.getElementById("mealsContainer")
    mealsContainer.innerHTML=""
    const mealIngredientContainer=document.getElementById("displayMealIngredient")
    mealIngredientContainer.innerHTML=""
    document.getElementById("mealSectionShowingSearchResult").style.display="block"
    document.getElementById("displayMealIngredient").style.display="none"
}