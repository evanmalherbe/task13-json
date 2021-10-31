// Task 13 - Compulsory task 2
// Declare variables

// Create constructor function to make creating objects easier. Can be used for food and drink objects
function cafeObj(item, price) {
    this.item = item;
    this.price = price
}

// Populate drink objects
let drink1 = new cafeObj("Orange juice", 25);
let drink2 = new cafeObj("Still water", 19);
let drink3 = new cafeObj("Gin and tonic", 35);
let drink4 = new cafeObj("Hunters Dry", 35);
let drink5 = new cafeObj("Castle Lite", 29);
let drink6 = new cafeObj("Red Wine", 36);

// Create array of drinks objects
let drinksArray = [drink1, drink2, drink3, drink4, drink5, drink6];

// Populate food objects
let food1 = new cafeObj("Bacon and egg sandwich", 45);
let food2 = new cafeObj("Chicken wrap", 89);
let food3 = new cafeObj("Bacon, avo and feta pizza", 119);
let food4 = new cafeObj("Steak and chips", 99);
let food5 = new cafeObj("Chicken salad", 59);
let food6 = new cafeObj("Burger and chips", 109);

// Create array of food objects
let foodArray = [food1, food2, food3, food4, food5, food6];

let drinksMessage = "";
let drinkChoice;
let drinkCost;

let foodMessage = "";
let foodChoice = "";
let foodCost;
let i;

let tipChoice;
let tipAmount;

let totalCost = 0;

// ---------------------------------------------------

/* Function to create prompt message to user. Populated from array of drinks objects. Used the following 
website to remind me how to use prompts correctly:
https://www.w3schools.com/jsref/met_win_prompt.asp */

function displayDrinks() {
    i = 1;
    // Cycle through drinks array and add drinks and their prices to a string variable.
    drinksArray.forEach(function (theDrinks) {
        /* Learned to create a line break in the prompt/alert message at this website: 
        https://www.tutorialspoint.com/How-to-Line-Breaks-to-JavaScript-Alert */

        drinksMessage += i + ". " + theDrinks.item + ": R" + theDrinks.price + "\r\n";
        i++;
    });

    // Display prompt to user
    drinkChoice = prompt("Choose a drink! Just enter the number of the drink you want. " + "\r\n \r\n" +
        drinksMessage);

    /* if statement to check that input from user is within bounds of choices 1 - 6 and is a number. I learned 
    about the isNaN() function at the following page: 
    https://mkyong.com/javascript/check-if-variable-is-a-number-in-javascript/ . Displays error
     message if wrong input and calls displayDrinks() function to start again. */

    if (drinkChoice < 1 || drinkChoice > 6) {
        alert("Your choice must be a number between 1 and 6. Please try again.");
        drinksMessage = "";
        displayDrinks();
    } else if (isNaN(drinkChoice)) {
        alert("Your choice must be a number between 1 and 6. Please try again.");
        drinksMessage = "";
        displayDrinks();
    }

    // Convert user input from string to number. Also had to minus 1 from their entered choice, since arrays
    // start at 0 not 1.
    drinkCost = Number(drinksArray[drinkChoice - 1].price);

    // Add drink cost to total
    totalCost += drinkCost;

    // Call next function to display food choices
    displayFoods();
}

// This function displays a prompt message with the food choices and takes the user's input.
function displayFoods() {
    i = 1;
    // Cycle through array and add food items and prices to message variable.
    foodArray.forEach(function (theFoods) {
        foodMessage += i + ". " + theFoods.item + ": R" + theFoods.price + "\r\n";
        i++;
    });

    // Display message prompt with info gathered from array
    foodChoice = prompt("Choose a meal! Just enter the number of the meal you want. " + "\r\n \r\n" +
        foodMessage);
    // Convert user input into a number from string
    foodChoice = Number(foodChoice);

    // If statement to check that user input is within bounds of choices and is a valid number
    if (foodChoice < 1 || foodChoice > 6) {
        alert("Your choice must be a number between 1 and 6. Please try again.");
        foodMessage = "";
        displayFoods();
    } else if (isNaN(foodChoice)) {
        alert("Your choice must be a number between 1 and 6. Please try again.");
        foodMessage = "";
        displayFoods();
    }

    // Convert user input to a number. Minus 1, since arrays start at 0 not 1
    foodCost = Number(foodArray[foodChoice - 1].price);

    // Add food cost to total cost of items
    totalCost += foodCost;

    // Call next function to display tip choices
    displayTipChoice();
}

/* Function to display message giving user a choice of how much, if any, tip to add to their meal price. */
function displayTipChoice() {

    // Display prompt with choices
    tipChoice = prompt("How much would you like to add as a tip? Choose a number below. \r\n \r\n 1. 10% \r\n 2. 15% \r\n 3. 20% \r\n 4. No tip");

    /* Switch statement to take user input and add the correct tip percentage to the tipAmount variable to be 
    added to total cost later. I reminded myself how to use the switch statement at the following website:
    https://www.w3schools.com/js/js_switch.asp */

    switch (tipChoice) {
        case "1":
            tipAmount = totalCost * 0.1;
            break;
        case "2":
            tipAmount = totalCost * 0.15;
            break;
        case "3":
            tipAmount = totalCost * 0.2;
            break;
        case "4":
            tipAmount = 0;
            break;
        default:
            // If user input does not match above choices, display error message and call function to start again
            alert("Your choice must be a number between 1 and 4. Please try again.");
            tipChoice = "";
            displayTipChoice();
    }

    // Add tip amount to total cost
    totalCost = totalCost + tipAmount;
    /* Round total cost off to 2 decimal places. Reminded myself how to do this at the following website:
    https://www.w3schools.com/jsref/jsref_tofixed.asp */
    totalCost = totalCost.toFixed(2);

    // Display alert message with total cost to customer.
    alert("The total price for your items is: R" + totalCost);
}