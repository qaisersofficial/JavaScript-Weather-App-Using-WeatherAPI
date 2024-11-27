import {handleSearchButtonClick} from "./events.js";
import { showSpinner, hideSpinner } from "./utils.js";

window.onload = function () {
  showSpinner();
  setTimeout(hideSpinner, 1000);
};

document.getElementById("search-btn").addEventListener("click", handleSearchButtonClick);