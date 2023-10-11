# Deputy Chef - A rootin' tootin' Meal Planning Site 

<b>⚠️This site is still in development and there are some minor security issues.⚠️</b>

It is currently not supported on Mobile devices or Microsoft Edge. 

<a href="https://mealplan-c5e03.firebaseapp.com/" target="_blank">Hosted here!</a>

<b>Test user account:</b>

Email: test@test.com || Password: Testpass123

Otherwise, email currently does not need verification so feel free to use fake credentials to make an account. 

API for recipe fetching has a limit of 100 per month, so if there are issues fetching, that is why. 


## Description
<b>This website is purely a fun project for my portfolio, not intended for actual full scale deployment</b>

The main concept behind the website is to have a main storage point for your favourite recipes, that can easily be added to a meal plan and can produce a grocery list to make the overall experience easier. 
I find meal planning very stressful, so for me it was important to have a random meal plan function. The planning algorithm also attempts to find recipes with similar ingredients, to reduce the grocery list- although this function needs to be optimised further. I wanted the website to be fun to use and cute, which for me helps to incentivise meal planning. 

This project has been a great way to improve and widen my skillset in React and JavaScript while learning how to use NoSQL databases.

## Features: 
- Recipes can be parsed from a URL or added by the user
- Users can add recipes to collections and add tags
- Users can create a custom or random meal plan that can be edited at any time
- User can set meals to be used as leftovers to avoid cooking multiple times a day
- Ingredient amounts are automatically adjusted for the amount of portions
- Amounts can be converted between metric and imperial
- Users are able to hide either calories or all nutritional values, to make the website more accessible for those struggling with eating disorders or who simply do not wish to see those things for any reason.
  
There are still minor bugs that need to be ironed out, which I am working on while job searching. 
The project is visible <a href="https://github.com/users/jasperbobasper/projects/4">here</a>

## Implementation
The website uses React.js with a Firebase Firestore database.

This was actually my first time using any Firebase products, so it was an interesting learning experience. 

The website also implements several APIs including Cookr for recipe parsing, recipe ingredient parser v3, convert-units. 
The front end uses MUI Material UI. 

## Planned Features 
- Filter recipes in random meal plan generator by collection (Include or exclude) 
- Search recipes by name or tag

## Restrictions

Since I am trying to keep the build and deployment completely free, I had to cut down on a lot of intended functionality that would have needed expensive APIs or otherwise hosted backend functions. 

Most notably, the conversions between metric and imperial are limited because there is no way for the ingredient parser to be able to tell the difference between a cup of liquid or solid (e.g a cup on water should be converted to ml and a cup of flour should be converted to g. Due to the significant differences in density there is no blanket solution to this issue). 
There are also problems with the ingredient parser not recognising certain terms, which as of right now is beyond my control. 


