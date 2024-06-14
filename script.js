
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebutton = document.querySelector(".newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winpatterns = [
    [0 ,1 ,2], 
    [0 ,3 ,6],
    [0 ,4 ,8],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [2 ,4 ,6],
    [3 ,4 ,5],
    [6 ,7 ,8],
];

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const resetgame = () => {
    turnO = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
};

const gamedraw = () => {
    msgcontainer.classList.remove("hide");
    msg.innerHTML = `Game was a draw`;
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                return pos1val;
            }
        }
    }
    return null;
};

const showwinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove('hide');  
    disableboxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (box.innerHTML != "") return;
        if (turnO) {  // playerO
            box.innerHTML = "O";
            turnO = false;
        } else {  // playerX
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let winner = checkwinner();

        if (winner) {
            showwinner(winner);
        } else if (count === 9) {
            gamedraw();
        }
    });
});


newgamebutton.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
