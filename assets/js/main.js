let container = document.querySelector("#container")
let grille = document.createElement("div")
let winner = document.createElement("p")
let play = document.createElement("button")
play.addEventListener("click", () => { cpuMode = false })
container.appendChild(play)
play.classList.add("buttonPlay")
play.innerHTML = "1 VS 1"
let ia = document.createElement("button")
ia.addEventListener("click", () => { cpuMode = true })
container.appendChild(ia)
let replay = document.createElement("button")
replay.innerHTML = "replay"
replay.classList.add("replay")
container.appendChild(replay)
ia.classList.add("buttonIa")
ia.innerHTML = "1 VS IA"
let cpuMode = false
container.appendChild(winner)
let endGame = false
let counter = 0
let joueur1 = "X"
let scoreplayer1 = 0
let scoreplayer2 = 0
let score = document.createElement("p")
score.innerHTML = "scoreJ1 : " + scoreplayer1
score.classList.add("score1")
container.appendChild(score)
let joueur2 = "O"
let score2 = document.createElement("p")
score2.classList.add("score2")
score2.innerHTML = "scoreJ2 : " + scoreplayer2
container.appendChild(score2)
container.appendChild(grille)
replay.addEventListener("click", () => { refresh() })
let modePuissance4 = false
let modeMorpion = false
let game = null
let btnMorpion = document.createElement("button")
container.appendChild(btnMorpion)
btnMorpion.innerHTML = "Morpion"
btnMorpion.addEventListener("click", () => {
    game = gameMorpion;
    createGrid(game);
    modePuissance4 = false;
    modeMorpion = true;
    game = gameMorpion
    grille.classList.remove("puissance4");
    grille.classList.add("morpion");
    refresh()
    scoreplayer1=0
    score.innerHTML = "scoreJ1 : " + scoreplayer1
    scoreplayer2=0
    score2.innerHTML = "scoreJ1 : " + scoreplayer2
    
})
let btnPuissance4 = document.createElement("button")
container.appendChild(btnPuissance4)
btnPuissance4.innerHTML = "Puissance 4"
btnPuissance4.addEventListener("click", () => {
    game = gamePuissance4;
    createGrid(game);
    modeMorpion = false;
    modePuissance4 = true;
    game = gamePuissance4
    grille.classList.remove("morpion");
    grille.classList.add("puissance4");
    refresh()
    scoreplayer1=0
    score.innerHTML = "scoreJ1 : " + scoreplayer1
    scoreplayer2=0
    score2.innerHTML = "scoreJ1 : " + scoreplayer2
})

let gameMorpion = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let gamePuissance4 = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
]

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ifWinner(player) {
    if (modePuissance4) {
        if (findwinner(player)) {
            winner.innerHTML = `${player} a gagné!`
            endGame = true
            if (player == joueur1) {
                scoreplayer1++
                score.innerHTML = "scoreJ1 : " + scoreplayer1
            } else {
                scoreplayer2++
                score2.innerHTML = "scoreJ2 : " + scoreplayer2
            }
        } else if (counter === 41) {
            winner.innerHTML = "Match nul!"
            endGame = true
        }}
        else {
            if (findwinner(player)) {
                winner.innerHTML = `${player} a gagné!`
                endGame = true
                if (player == joueur1) {
                    scoreplayer1++
                    score.innerHTML = "scoreJ1 : " + scoreplayer1
                } else {
                    scoreplayer2++
                    score2.innerHTML = "scoreJ1 : " + scoreplayer2
                }
            } else if (counter === 8) {
                winner.innerHTML = "Match nul!"
                endGame = true
            }
        }
    }



function choiceplayer(row, col) {
    if (!endGame) {
        if (modePuissance4) {
            let targetRow = -1;
            for (let i = 5; i >= 0; i--) {
                if (game[i][col] === "") {
                    targetRow = i;
                    break;
                }
            }
            if (targetRow !== -1) {
                if (counter % 2 == 0) {
                    game[targetRow][col] = joueur1;
                    ifWinner(joueur1);
                    if (cpuMode == true) {
                        cpu();
                    }
                } else {
                    game[targetRow][col] = joueur2;
                    ifWinner(joueur2);
                }
                counter++;
                createGrid(game);
            }
        } else {
            if (game[row][col] === "") {
                if (counter % 2 == 0) {
                    game[row][col] = joueur1;
                    ifWinner(joueur1);
                    if (cpuMode == true) {
                        cpu();
                    }
                } else {
                    game[row][col] = joueur2;
                    ifWinner(joueur2);
                }
                counter++;
                console.log(counter);
                createGrid(game);
            }
        }
    }
}

function createGrid(table) {
    grille.innerHTML = ''
    table.forEach((row, rowIndex) => {
        let ligne = document.createElement("div");
        ligne.classList.add("ligne");
        row.forEach((cell, colIndex) => {
            let cellule = document.createElement("div");
            cellule.classList.add("cellule");
            cellule.addEventListener("click", () => {
                choiceplayer(rowIndex, colIndex);
            });
            if (modePuissance4) {
                switch (cell) {
                    case joueur1:
                        cellule.innerHTML = joueur1
                        cellule.style.backgroundColor = 'yellow'
                        cellule.style.color = 'yellow'
                        cellule.style.transition = 'all 1s ease'
                        break
                    case joueur2:
                        cellule.innerHTML = joueur2
                        cellule.style.backgroundColor = 'red'
                        cellule.style.color = 'red'
                        cellule.style.transition = 'all 1s ease'
                        break
                }
            } else {
                switch (cell) {
                    case joueur1:
                        cellule.innerHTML = joueur1
                        break
                    case joueur2:
                        cellule.innerHTML = joueur2
                        break
                }
            }
            ligne.appendChild(cellule);
        });
        grille.appendChild(ligne);
    });
}

function cpu() {
    if (modePuissance4) {
        if (counter < 41 && !endGame) {
            let randomCol = random(0, game[0].length - 1)
            let targetRow = -1
            for (let i = 5; i >= 0; i--) {
                if (game[i][randomCol] === "") {
                    targetRow = i
                    break
                }
            }
            if (targetRow !== -1) {
                game[targetRow][randomCol] = joueur2
                counter++
                ifWinner(joueur2)
            } else {
                cpu()
            }
        }
    }
    else {
        if (counter < 8 && endGame == false) {
            let randomX = random(0, game.length - 1);
            let randomY = random(0, game[0].length - 1);

            while (game[randomX][randomY] !== "") {
                randomX = random(0, game.length - 1);
                randomY = random(0, game[0].length - 1);
            };
            game[randomX][randomY] = joueur2;
            counter++;
            ifWinner(joueur2)
        }
    }

}

function findwinner(player) {
    if (modePuissance4) {
        for (let row = 0; row < game.length; row++) {
            for (let col = 0; col < game[row].length - 3; col++) {
                if (game[row][col] === player && game[row][col + 1] === player &&
                    game[row][col + 2] === player && game[row][col + 3] === player) {
                    return true;
                }
            }
        }
        for (let col = 0; col < game[0].length; col++) {
            for (let row = 0; row < game.length - 3; row++) {
                if (game[row][col] === player && game[row + 1][col] === player &&
                    game[row + 2][col] === player && game[row + 3][col] === player) {
                    return true;
                }
            }
        }
        for (let row = 0; row < game.length - 3; row++) {
            for (let col = 0; col < game[row].length - 3; col++) {
                if (game[row][col] === player && game[row + 1][col + 1] === player &&
                    game[row + 2][col + 2] === player && game[row + 3][col + 3] === player) {
                    return true;
                }
            }
        }
        for (let row = 0; row < game.length - 3; row++) {
            for (let col = 3; col < game[row].length; col++) {
                if (game[row][col] === player && game[row + 1][col - 1] === player &&
                    game[row + 2][col - 2] === player && game[row + 3][col - 3] === player) {
                    return true;
                }
            }
        }
        return false;
    }
    else {
        for (let row = 0; row < game.length; row++) {
            if (game[row][0] === player && game[row][1] === player && game[row][2] === player) {
                return true;
            }
        }
        for (let col = 0; col < game[0].length; col++) {
            if (game[0][col] === player && game[1][col] === player && game[2][col] === player) {
                return true;
            }
        }
        if (game[0][0] === player && game[1][1] === player && game[2][2] === player) {
            return true;
        }
        if (game[0][2] === player && game[1][1] === player && game[2][0] === player) {
            return true;
        }
    }
    return false;
}

function refresh() {
    if (modePuissance4) {
        game.forEach((row, i) => {
            row.forEach((cell, j) => {
                game[i][j] = "";
            });
        });

    } else {
        game = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }
    winner.innerHTML = ""
    counter = 0
    endGame = false
    createGrid(game)
    
}

createGrid(game)

