const highScoreList = document.getElementById("highscore-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;
const clearScores = document.getElementById("clearLocal");

console.log(highScores);
highScoreList.innerHTML = highScores
    .map(newScore => {
        return `<li class="high-score">${newScore.initials}-${newScore.score}</li>`
    }) 
    .join("");


function clearLocalStorage() {
    localStorage.clear();
    highScoreList.innerHTML = "";
}

clearScores.addEventListener("click", clearLocalStorage);