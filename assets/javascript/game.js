
// Ojbect Constructor
function GameChar(name, hp, ap, cap, attckCtr) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.cap = cap;
    this.attckCtr = attckCtr;
    this.attack = function(opp) {
        // increase attack multiplier (each click)
        this.attckCtr++;
        return battle(this, opp, this.attckCtr);
    }
}

// Game Character Creation
var mario = new GameChar("Mario", 120, 8, 0, 0);
var goomba = new GameChar("Goomba", 100, 0, 5, 0);
var koopaTroopa = new GameChar("Koopa Troopa", 150, 0, 20, 0);
var wario = new GameChar("Wario", 180, 0, 25, 0);

// Build characterArray
var characterArray = [ mario, goomba, koopaTroopa, wario ];


// This function is where HP points are taken away from the Opponent and Attacker (called by the Obj)
function battle(att, opp, attckCtr) {
    // Set variable for attack points
    var attack = att.ap;
    // Run multiplier for attack points
    attack = (att.ap * att.attckCtr);
    // Attack opponent and set new Health Points
    opp.hp -= attack;
    // Take away Counter Attack points from attacker's HPs
    att.hp -= opp.cap;
    // Check to see if either is dead
    if (att.hp <= 0) {
        // You died
        gameOver("lose");
    } else if (opp.hp <= 0) {
        // Your opponent died
        console.log("You defeated " + opp.name);
        // Remove opp from characterArray
        removeEnemy(opp);
        // if array <= 1, game over
        if (characterArray.length <= 1) {
            gameOver("win");
        // else, choose another enemy to fight
        } else {
            console.log("Congrats!  Now pick another enemy!");
        }
    }

}

function gameOver (result) {
    if (result === "win")
        console.log("You win!  This game is now completely over!")
    else
        console.log("LOSER!");
}

function removeEnemy (enemy) {
    var index = characterArray.indexOf(enemy);
    if (index > -1) {
        characterArray.splice(index, 1);
        console.log(characterArray);
    }
}

$("#goomba").on("click", function () {
    mario.attack(goomba);
    console.log("Mario HP: " + mario.hp);
    console.log("Goomba HP: " + goomba.hp);
});


$("#koopa-troopa").on("click", function () {
    mario.attack(koopaTroopa);
    console.log("Mario HP: " + mario.hp);
    console.log("Koopa Troopa HP: " + koopaTroopa.hp);
});

$("#wario").on("click", function () {
    mario.attack(wario);
    console.log("Mario HP: " + mario.hp);
    console.log("Wario HP: " + wario.hp);
});