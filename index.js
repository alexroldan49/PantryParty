document.addEventListener("DOMContentLoaded", () =>{
    let form = document.querySelector(".add-item-form")
    const itemsList = document.querySelector(".items-list")
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
    })
    
    // const aboutUs = document.querySelector(".about-us")
    // aboutUs.addEventListener('click', ()=> {
    //     const aboutUsInfo = document.querySelector('.about-us-info')
    //     aboutUsInfo.innerText = "Hello Everyone, this is a little about us"
    

    // })

    const formbtn = document.querySelector(".formbtn")
    formbtn.addEventListener('click', (e)=> {
        e.preventDefault()
        createItem()
        itemsFiltered()
    })

    const formInput = ()=> {
        const list = document.querySelectorAll(".items-list li")
        const listArray = [...list]
        const mappedArray = listArray.map((li)=>{
            let str = li.innerText
            str = str.substring(0,str.length-1)
            return str
        })
        let ingredients = mappedArray.join(",+")
        return ingredients
    }

    const createItem = () =>{
        const newItem = document.createElement("li")
        newItem.className = "li-text"
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "x"
        deleteBtn.style.margin = "4px"
        deleteBtn.style.width = "20px"
        deleteBtn.addEventListener('click', handleDelete)
        newItem.textContent = document.querySelector(".input-text").value
        document.querySelector(".input-text").value = ""
        itemsList.append(newItem)
        newItem.append(deleteBtn)
        formInput()
    }
    function handleDelete (e) {
        e.target.parentNode.remove()
        itemsFiltered()
    }

const getRecipes = () => {
    fetch('https://api.spoonacular.com/recipes/complexSearch?&apiKey=73c1f28c74cd45d7a228263c6b0b3ea9')
    .then((res) => res.json())
    .then(recipes => recipes.results.forEach((recipe) =>renderARecipe(recipe)))
    // .then(results => results.forEach((recipe) => renderEntreeRecipe(recipe)))
}
 function renderARecipe(recipe) {
     const entreeRecipeCard = document.createElement('div')
     entreeRecipeCard.className = "popular-recipe-card"
     document.querySelector(".test").append(entreeRecipeCard)
     const entreeRecipeName = document.createElement('h4')
     entreeRecipeName.innerText = recipe.title
     const entreeRecipeImage = document.createElement('img')
     entreeRecipeImage.src = recipe.image
     entreeRecipeImage.className = "recipe-image"
     entreeRecipeCard.append(entreeRecipeName,entreeRecipeImage)
     }


    //  function renderARecipe2(recipe) {
    //     const entreeRecipeCard = document.createElement('div')
    //     entreeRecipeCard.className = "suggested-recipe-cards"
    //     document.querySelector(".test").append(entreeRecipeCard)
    //     const entreeRecipeName = document.createElement('h4')
    //     entreeRecipeName.innerText = recipe.title
    //     const entreeRecipeImage = document.createElement('img')
    //     entreeRecipeImage.src = recipe.image
    //     entreeRecipeImage.className = "recipe-image"
    //     const entreeRecipeIngredientes = document.createElement('li')
    //     entreeRecipeIngredientes.innerText = recipe.missedIngredients.original
    //     entreeRecipeCard.append(entreeRecipeName,entreeRecipeImage,entreeRecipeIngredientes)
    //     console.log(entreeRecipeIngredientes.innerText)
    //     }


    function renderARecipe3(recipe){
        const card = document.createElement("div")
        card.className = "suggested-recipe-cards"
        document.querySelector(".test").append(card)
        const recipeName = document.createElement("h3")
        recipeName.textContent = recipe.title
        const recipeImg = document.createElement("img")
        recipeImg.src = recipe.image
        recipeImg.className = "recipe-image"
        const ingredientsList = document.createElement("ul")
        const ingredientsYouHave = document.createElement("h4")
            ingredientsYouHave.innerText = "Ingredients You Have :"
        
        // recipeIngredients.textContent = recipe.usedIngredients[0].original
        recipe.usedIngredients.forEach((ingredient)=> {
            const recipeIngredients = document.createElement("li")
            recipeIngredients.className = "render-recipe-list"
            recipeIngredients.textContent =  ingredient.original
            ingredientsList.append(recipeIngredients)
            // console.log(ingredient.original)
        })
        const missedIngredientsList = document.createElement("ul")
        const ingredientsYouNeed = document.createElement("h4")
            ingredientsYouNeed.innerText = "Ingredients You Need :"
        recipe.missedIngredients.forEach((ingredient)=> {
            const missedRecipeIngredients = document.createElement("li")
            missedRecipeIngredients.textContent = ingredient.original
            missedIngredientsList.append(missedRecipeIngredients)
        })
        card.append(recipeName, recipeImg,ingredientsYouHave, ingredientsList,ingredientsYouNeed, missedIngredientsList)
        
        const mouseOver = ()=> {
            card.addEventListener('mouseover', ()=>{
                card.className = "card-mouse-over"
            })
            card.addEventListener('mouseleave', (e)=>{
                card.className = "suggested-recipe-cards"
            })
        }
        mouseOver()
    }

     function getFoodJokes(){
        fetch("https://api.spoonacular.com/food/jokes/random?&apiKey=73c1f28c74cd45d7a228263c6b0b3ea9")
        .then(resp => resp.json())
        .then(foodJokes => {
            const jokeDiv = document.querySelector(".jokes")
            const joke = document.createElement('h3')
            joke.textContent = foodJokes.text
            jokeDiv.append(joke)

        })

    }
    
    function itemsFiltered(food) {
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?&apiKey=73c1f28c74cd45d7a228263c6b0b3ea9&ingredients=${formInput()}`)
        .then(resp=> resp.json())
        .then(recipeByIngredient => {
            document.querySelector(".test").innerHTML = ""
            recipeByIngredient.forEach((recipe)=>renderARecipe3(recipe))})

    }
   
    
    
    
    
    
    getRecipes()
    
    getFoodJokes()
    
    // itemsFiltered(ingredients)
    // formInput()
})
