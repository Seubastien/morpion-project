let gameContainer = document.querySelector('#gameContainer')
let isPlayerOne = true
let cpuMode = true
let playAgain = document.querySelector('#replay')
let modeGame = document.querySelector('#modeGame')
let modePvp = document.querySelector('#pvp')
let modePvcpu = document.querySelector('#pvcpu')
let isOver = false

playAgain.style.display = 'none'
playAgain.addEventListener('click', () => {
    replay()
    startMenu()
})
let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
let turn = 0
//Rejouer
let replay = () => {
    turn = 0
    grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    isPlayerOne = true
    playAgain.style.display = 'none'
    modeGame.style.display = 'block'
    gameContainer.innerHTML = ""
    isOver = false

}
//Afficher menu début jeu
let startMenu = () => {
    modePvp.addEventListener('click', () => {
        cpuMode = false
        displayGrid()
        modeGame.style.display = 'none'
    })
    modePvcpu.addEventListener('click', () => {
        cpuMode = true
        displayGrid()
        modeGame.style.display = 'none'
    })
}
replay()
startMenu()

// Afficher grille
let displayGrid = () => {
    playAgain.style.display = 'block'
    gameContainer.innerHTML = ""
    grid.forEach((el, i) => {
        let rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        gameContainer.appendChild(rowContainer)
        el.forEach((cells, j) => {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.addEventListener('click', () => {
                play(cell, i, j)
            }, { once: true })
            rowContainer.appendChild(cell)
            cell.innerHTML = "?"
        });
    });
}
//Afficher choix joueurs
let play = (cell, i, j) => {
    if (!isOver) {
        if (isPlayerOne) {
            cell.innerHTML = "X"
            cell.style.background = "grey"
            cell.style.color = "white"
            grid[i][j] = cell.innerHTML
            victory("X")
            isPlayerOne = !isPlayerOne
            turn++
            if (cpuMode == true) {
                playCpu(cell)
            }
        } else {
            cell.innerHTML = "O"
            grid[i][j] = cell.innerHTML
            victory("O")
            isPlayerOne = !isPlayerOne
            turn++
        }

    }
}
//Mode aleatoire cpu
let playCpu = (cell) => {
    console.log(turn);
    if (turn < 9) {
        let random = randomize(0, document.querySelectorAll('.cell').length - 1)
        while (document.querySelectorAll('.cell')[random].innerHTML != "?") {
            random = randomize(0, document.querySelectorAll('.cell').length - 1)
        }
        document.querySelectorAll('.cell').forEach((e) => {
            e.style.pointerEvents = 'none'
        });
        setTimeout(() => {
            document.querySelectorAll('.cell')[random].click()
            document.querySelectorAll('.cell').forEach((e) => {
                e.style.pointerEvents = 'auto'
            });
        }, 1000)

    }
}
//Verification victoire
function victory(val) {
    let winner = document.createElement('div')
    winner.classList.add('winner')

    grid.forEach((el) => {
        if (el[0] == val && el[1] == val && el[2] == val) {
            gameContainer.appendChild(winner)
            winner.innerHTML = `Joueur ${val} WIN`
            isOver = true
        }
    })
    if (isOver) {
        return
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i + 2] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j] && grid[i + 1][j] == grid[i + 2][j]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return

                }
            }
        }
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i + 2] && grid[i + 2][j + 2] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j + 1] && grid[i + 1][j + 1] == grid[i + 2][j + 2]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return

                }
            } else if (grid[i + 2] && grid[i + 2][j - 2] && grid[i][j] == val) {
                if (grid[i][j] == grid[i + 1][j - 1] && grid[i + 1][j - 1] == grid[i + 2][j - 2]) {
                    gameContainer.appendChild(winner)
                    winner.innerHTML = `Joueur ${val} WIN`
                    isOver = true
                    return
                }
            }

        }
    }
    if (turn >= 8) {
        gameContainer.appendChild(winner)
        winner.innerHTML = "DRAW"
    }
}
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// grid.forEach((el) => {
//     if (el.every((e) => e == "X")){
//         console.log("X win");
//     }
// let resultContainer = document.createElement('div')
// gameContainer.appendChild(resultContainer)
// })

