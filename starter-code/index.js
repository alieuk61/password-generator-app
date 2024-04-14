const copyIcon = document.querySelector('.copy__icon');
const slider = document.querySelector('.slider');
const characters = {
    uppercase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase : 'abcdefghijklmnopqrstuvwxyz',
    numbers : '0123456789',
    symbols: '\|¬"£%!^&*()_-+=/~#@;:}{[]?><.,`'
};
const generateButton = document.querySelector('.generate__button');
const characterLength = document.querySelector('.character-length');
const [uppercaseButton, lowercaseButton, symbolButton, numbersButton] = document.querySelectorAll('input[type="checkbox"]');
const inputsCheckedLength = document.querySelectorAll('input[type="checkbox"]:checked');
const strengthRating = document.querySelector('.password-strength__rating');
const password = document.querySelector('.password');
const ratingBars = document.querySelectorAll('.strength__bar');
const textCopied = document.querySelector('.copied-text')

console.log(characters.symbols, ratingBars[0])

function progressScript() {
  const sliderValue = slider.value;
  const percentage = (sliderValue - 1) * 5;
  slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
}

progressScript()

// passwrd strength
const veryWeakPassword = false;
const weakPassword = false;
const strongPassword = false;
const veryStrongPassword = false;

// we want to click on the copy button and have the password generated, copied for the user to be able to paste it

copyIcon.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(password);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected text to the clipboard
    document.execCommand('copy');
    
    // Deselect the text
    selection.removeAllRanges();
    textCopied.style.display = 'block';
    
})

// CHARACTER LENGTH BUTTON
let sliderValue;


slider.addEventListener('input', function() {
     sliderValue = Number(this.value); //"this" is referring to slider
     characterLength.textContent = sliderValue
     progressScript()
    console.log('Slider value:', sliderValue);
});

// GENERATING THE PASSWORD

// generate button
let generatedPassword = '';

generateButton.addEventListener('click', function(){
    let passwordStrength = '';
    let selectedCharacters = '';
    let strengthPoints = 0;

    if (uppercaseButton.checked) {
        selectedCharacters += characters.uppercase
        strengthPoints += 5;
    };
    if (lowercaseButton.checked) {
        selectedCharacters += characters.lowercase
        strengthPoints += 5;
    };
    if (symbolButton.checked) {
        selectedCharacters += characters.symbols
        strengthPoints += 5;
    };
    if (numbersButton.checked) {
        selectedCharacters += characters.numbers
        strengthPoints += 5;
    }

    strengthPoints += sliderValue * 4;

    for (let i = 0; i < slider.value; i++) {
        const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
        generatedPassword += selectedCharacters[randomIndex];
    }

     // Check password strength /[^\w\s]/
     if (strengthPoints < 45) {
        passwordStrength = 'Very Weak';
        [0, 1, 2, 3].map(i => {
           i == 0 ? ratingBars[i].style.backgroundColor = '#F64A4A' : ratingBars[i].style.backgroundColor = '#18171F'
        })
        
    } else if (strengthPoints >= 45 && strengthPoints < 50) {
        passwordStrength = 'Weak';
        [0, 1, 2, 3].map(i => {
            ratingBars[i].style.backgroundColor = '#FB7C58'
            i > 1 ? ratingBars[i].style.backgroundColor = '#18171F' : null;
        })
    } else if (strengthPoints >= 50 && strengthPoints < 65) {
        passwordStrength = 'Medium';
        [0, 1, 2, 3].map(i => {
            ratingBars[i].style.backgroundColor = '#F8CD65'
            i > 1 ? ratingBars[i].style.backgroundColor = '#18171F' : null;
        })
        ratingBars[3].style.backgroundColor = '#18171F';

    } else {
        passwordStrength = 'Strong';
        [0, 1, 2, 3].map(i => {
            ratingBars[i].style.backgroundColor = '#A4FFAF'
        })
    }

    console.log('Generated Password:', generatedPassword);
    console.log('Password Strength:', passwordStrength);

    strengthRating.textContent = passwordStrength;
    password.textContent = generatedPassword;
    password.style.color = '#E6E5EA';


});