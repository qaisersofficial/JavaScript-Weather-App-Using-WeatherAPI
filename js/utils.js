export function showSpinner() {
    const spinner = document.querySelector(".loader");
    spinner.style.display = "grid";
  }
  
  export function hideSpinner() {
    const spinner = document.querySelector(".loader");
    spinner.style.display = "none";
  }