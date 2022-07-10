const words = [
  [
    "Coward",
    "Careless",
    "Cute",
    "Excited",
    "Goalkeeper",
    "Criminal",
    "Carpenter",
    "Butcher",
    "Barber",
    "Banker",
    "Actress",
    "Neighbor",
    "Shaft",
    "Elevator",
    "Uniform",
    "Delicious",
    "Borrow",
    "Dentist",
    "Bowtie",
    "Annoying",
  ],
  [
    "Octopus",
    "Hardworking",
    "Common",
    "Immigration",
    "Interesting",
    "Divorce",
    "Shallow",
    "Expensive",
    "Cheap",
    "Soybean",
    "Broccoli",
    "Cabbage",
    "Carrot",
    "Eggplant",
    "Lettuce",
    "Spinach",
    "Pickle",
    "Cucumber",
    "Radish",
  ],
  [
    "Confidence",
    "Confused",
    "Pineapple",
    "Daughter",
    "Strawberry",
    "Watermelon",
    "Tangerine",
    "Nephew",
    "Straight",
    "Headache",
    "Toothache",
    "Delicious",
    "Spaghetti",
    "Temperature",
    "Lightning",
    "Booking",
    "Reservation",
    "Restaurant",
  ],
  [
    "Pizzeria",
    "Appetizer",
    "Vegetarian",
    "Allergic",
    "Acquaintance",
    "Colleague",
    "Bride",
    "Bridegroom",
    "Universe",
    "University",
    "Extremely",
    "Geography",
    "Cautious",
    "Especially",
    "Curious",
    "Innocent",
    "Guilty",
    "Optimistic",
  ],
  [
    "Pessimistic",
    "Satisfied",
    "Dissatisfied",
    "Aggressive",
    "Arrogant",
    "Exhausting",
    "Frustrated",
    "Awful",
    "Frustration",
    "Disappointed",
    "Advertise",
    "Advertisement",
    "Boycott",
    "Briefcase",
    "Currency",
    "Customer",
    "Consumer",
    "Receipt",
    "Wholesale",
  ],
  [
    "Encourage",
    "Bargain",
    "Discourage",
    "Ignorant",
    "Educated",
    "Ignorance",
    "Comfortable",
    "Scientist",
    "Spaceship",
    "Opinion",
    "Interesting",
    "Universe",
    "Stomach",
    "Yourselves",
    "Ourselves",
    "Themselves",
  ],
  [
    "Everybody",
    "Sometimes",
    "Usually",
    "Always",
    "Never",
    "Consonant",
    "Indefinite",
    "Electricity",
    "Surrender",
    "Shallow",
    "Pronunciation",
    "Perhaps",
    "Intoxicating",
    "Although",
    "Literatuer",
  ],
  [
    "Priority",
    "Suggestion",
    "Personification",
    "Neighbour",
    "Statistics",
    "Different",
    "Difference",
    "Interesting",
    "Science",
    "February",
    "Groundhog",
    "Vegetables",
    "Straight",
    "Scissors",
    "Piece",
    "Costume",
    "Excited",
    "Experiment",
    "Horseshoe",
    "Surprise",
  ],
  [
    "Congratulation",
    "Economic",
    "Dangerous",
    "Eyesight",
    "Practice",
    "Nowadays",
    "Jewelry",
    "Recently",
    "Familiar",
    "Comfortable",
    "Awesome",
    "Giraffe",
    "Schedule",
    "Competition",
    "Perhaps",
    "Citadel",
    "Fantastic",
  ],
];

let theinterval;
let current_level = 0;
let upcomming_words = document.querySelector(".game__play .upcomming__word");
let theworld = document.querySelector(".game__word .word");
let game_input = document.querySelector(".game__word input");
let total_time = document.querySelector(".game__control .time span");
let error_count = document.querySelector(".game__control .error span");
let successful_message = document.querySelector(".game .successful");
let speed_count = document.querySelector(".successful .message .count span");
let level_container = document.querySelector(".game__intro .levels__container");
let levels_shows = document.querySelector(".game__info .levels");
let thecounter = 1;
let words_clone = [];
// Sections
let game_intro = document.querySelector(".game__intro");
let game_play = document.querySelector(".game__play");
// Control Buttons
let home_button = document.querySelector(".game__info .home");
let menu_button = document.querySelector(".successful .buttons .menu");
let reload_button = document.querySelector(".successful .buttons .reload");
let next_button = document.querySelector(".successful .buttons .next");

// Generate All Levels
function generate_levels() {
  let all_levels = "";
  for (let i = 0; i < words.length; i++) {
    all_levels += `<li data-level="${i}">Level (${i + 1})</li>`;
  }
  level_container.innerHTML = all_levels;
  let level_elements = document.querySelectorAll(".game__intro .levels__container li");
  for (const element of level_elements) {
    element.addEventListener("click", function () {
      game_intro.style.display = "none";
      game_play.style.display = "flex";
      current_level = this.dataset.level;
      start_game();
    });
  }
}
generate_levels();

// Diable Paste Event
game_input.onpaste = () => false;

game_input.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) check_word();
});

function start_game() {
  total_time.innerHTML = 0;
  error_count = 0;
  thecounter = 1;
  levels_shows.innerHTML = `Level (${Number(current_level) + 1})`;
  theinterval = setInterval(() => {
    total_time.innerHTML++;
  }, 1000);
  game_input.focus();
  words_clone = [...words[current_level]];
  generate_word();
}

function generate_word() {
  game_input.value = "";
  let word = words_clone[0];
  words_clone.splice(0, 1);
  theworld.innerHTML = word;
  upcomming_words.innerHTML = "";
  let new_upcomming_words = words_clone.map((word) => `<span>${word}</span>`);
  for (const word of new_upcomming_words) upcomming_words.innerHTML += word;
}

function check_word() {
  if (theworld.innerHTML.toLowerCase() == game_input.value.toLowerCase()) {
    if (words_clone.length > 0) {
      thecounter++;
      generate_word();
    } else {
      clearInterval(theinterval);
      let thespeed = thecounter / (total_time.innerHTML / 60);
      successful_message.style.display = "grid";
      speed_count.innerHTML = Math.round(thespeed);
    }
  } else {
    game_input.value = "";
    error_count.innerHTML++;
    game_input.classList.add("input-error");
    setTimeout(function () {
      game_input.classList.remove("input-error");
    }, 300);
  }
}

function end_game() {
  clearInterval(theinterval);
  game_play.style.display = "none";
  game_intro.style.display = "block";
}

home_button.addEventListener("click", end_game);
menu_button.addEventListener("click", main_menu);
reload_button.addEventListener("click", reload_level);
next_button.addEventListener("click", next_level);

function main_menu() {
  successful_message.style.display = "none";
  game_play.style.display = "none";
  game_intro.style.display = "block";
}

function next_level() {
  successful_message.style.display = "none";
  current_level++;
  start_game();
}

function reload_level() {
  successful_message.style.display = "none";
  start_game();
}
