// Select all buttons
let buttons = document.querySelectorAll("button");

// Target input element
let input = document.querySelector("input");

// state variables
let busy = true;
let hold = undefined;
let is_busy = undefined;
let delay = 500;
let increament = -1;
let click = null;

const mouseUp = () => {
  for (var i = 0, len = buttons.length; i < len; ++i) {
    // invoke when user pull clicks on any of the button
    buttons[i].onmouseup = function (e) {
      clearTimeout(hold);
      busy = true;
      is_busy = setTimeout(function () {
        increament = -1;
        busy = false;
        e.target = null;
      }, delay);

      // put cursor at the end of text input
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;
    };
  }
};

const getBtnsData = () => {
  // Loop over all selected buttons to access its attributes
  for (var i = 0, len = buttons.length; i < len; ++i) {
    // invoke when user clicks on any of the button
    buttons[i].onmousedown = function (e) {
      const text = this.getAttribute("data-text").split("");
      const number = this.getAttribute("data-number");

      // Set busy state to true
      busy = true;

      clearTimeout(is_busy);
      if (click !== e.target) {
        busy = false;
      }

      // Loop over splited array to input in inputbox
      if (increament >= text.length - 1 || click !== e.target) {
        increament = 0;
        click = e.target;
      } else {
        increament = increament + 1;
      }

      // Hold for 0.5 seconds to input numbers
      hold = setTimeout(function () {
        input.value = input.value.slice(0, -1) + number;
      }, delay);

      input.value = busy
        ? input.value.slice(0, -1) + text[increament]
        : input.value + text[increament];
    };
  }

  // Invoke when btn isnt clicked
  mouseUp();
};

// Invoke on page view
getBtnsData();
