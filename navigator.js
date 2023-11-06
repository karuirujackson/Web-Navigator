const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'This Page';
// ------------------------------

// ------------------------------
// Helper Functions
// ------------------------------
function showCurrentPage (action) {
    console.log(`\n${action}`);
    console.log(`Current page = ${currentPage}`);
    console.log('Back page = ', backPages.peek());
    console.log('Next page = ', nextPages.peek());
};

//Defines what happens when we visit a new page. Replaces the currentpage and hence the currentpage moves to the backPages.
function newPage (page) {
    backPages.push(currentPage);
    currentPage = page;
    //clear the nextPages Stack
    while (!nextPages.isEmpty()) {
        nextPages.pop();
    }
    showCurrentPage('New: ');
}

//backPage is called when we navigate backward a page.
function backPage () {
    nextPages.push(currentPage);
    currentPage = backPages.pop(); //Removes the top item from the backPages stack and set it as current page.
    showCurrentPage('Back: ')
}

function nextPage () {
    backPages.push(currentPage);
    currentPage = nextPages.pop();
    showCurrentPage('NEXT: ');
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
//Initialize finish. Controls the termination of a while loop that takes in user input
let finish = false;
let showBack = false;
let showNext = false;

//When the program is started, it shows a default page.
showCurrentPage('DEFAULT: ');

//While loop that controls the processing of user input.
//loop displays instructions to the user, prompt the user input and process the user input.
while (finish === false) {
    let instructions = baseInfo;
    if (backPages.peek() !== null) {
        instructions = `${instructions}, ${backInfo}`;
        showBack = true;
    } else {
        showBack = false;
    }
}

while (finish === false) {
    let instructions = baseInfo;
    if (nextPages.peek() !== null) {
        instructions = `${instructions}, ${nextInfo}`;
        showNext = true;
    } else {
        showNext = false;
    }
}

while (finish === true) {
    let instructions = baseInfo;
    instructions = `${instructions}, ${quitInfo}`;
    console.log(instructions);
}
  // ------------------------------
  // User Interface Part 2
  // ------------------------------
const answer = prompt('How are you today?');
let lowerCaseAnswer = answer.toLowerCase();
if ((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !=='b') && (lowerCaseAnswer !== 'q')) {
    // we create a new page based on the url
    newPage(answer);
} else if ((showNext ===true) && (lowerCaseAnswer === 'n')) {
    // we navigate forward a page
    nextPage();
} else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    // we navigate back a page
    backPage();
} else if (lowerCaseAnswer === 'b') {
    // invalid input to a non-available option
    console.log('Cannot go back a page. Stack is Empty!');
} else if (lowerCaseAnswer === 'n') {
    //invalid input to a non-available option.
    console.log('Cannot go to the next page. Stack is empty!')
} else if (lowerCaseAnswer === 'q') {
    //we quit the program
    finish = true;
}