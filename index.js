let level = document.querySelectorAll(".level");
let again = document.querySelector(".again");
let click = new Audio("click.mp3");
let error = new Audio("error.mp3");
let win = new Audio("win.mp3");
let lose = new Audio("lose.mp3");
let random;
let lev;
let score = 20;
let highScore = 0;
$(".part2").hide();
for (let i = 0; i < level.length; i++)
{
    level[i].addEventListener("click", () => {
        lev = level[i].getAttribute("value");
        random = Math.floor(Math.random() * lev) + 1;
        level[i].classList.toggle("pressed");
        click.play();
        setTimeout(() => {
            level[i].classList.toggle("pressed"); 
        }, 150);
        setTimeout(() => {
            $(".part1").hide();
        }, 200);
        $(".part2 h2").text("*Start guessing between 1 and " +lev + "*");
        setTimeout(() => {
            $(".part2").show();
        }, 200);
    });
}
$(".s1 span").text(score);
$(".s2 span").text(highScore);
$(".s1 span").css("color", "green");
$(".again").click(() => {
    again.classList.toggle("pressed");
    click.play();
    setTimeout(() => {
        again.classList.toggle("pressed"); 
    }, 150);
    setTimeout(() => {
        $(".part2").hide();
    }, 200);
    setTimeout(() => {
        $(".part1").show();
    }, 200);
    score = 20;
    document.querySelector("input").value = "";
    $(".s1 span").text(score);
    $(".s2 span").text(highScore);
    $(".result").text("Unknown!");
    setTimeout(() => {
        $(".check, .input, .s1, .s2, .part2 h2").slideDown();
    }, 200);
    $("body").css("background-color","black");
    $(".s1 span").css("color", "green");
});
$(".check").click(()=>{
    let input = document.querySelector("input").value;
    if (Number(input) <= 0 || Number(input) * 1 > lev || input == ""){
        error.play();
        $(".part2 h2").css("color", "red");
        setTimeout(() => {
          $(".part2 h2").css("color", "white");
        }, 1000);
    }
    else{
        if (Number(input) > random)
        {
            $(".result").text("too high 📈");
            score--;
            $(".s1 span").text(score);
        }
        else if (Number(input) < random)
        {
            $(".result").text("too low 📉");
            score--;
            $(".s1 span").text(score);
        }
        else
        {
            win.play();
            $("body").css("background-color","green");
            if (score > highScore)
            {
                $(".result").text("WIN HIGHSCORE 🏆🥇");
                highScore = score;
                $(".s2 span").text(highScore);
            }
            else
                $(".result").text("WIN (NO HIGHT SCORE) 🏆🥇");
            $(".check, .input, .s1, .s2, .part2 h2").slideUp();
        }
        if (!score)
        {
            lose.play();
            $(".result").text("YOU LOSE THE GAME😥");
            $(".check, .input, .s1, .s2, .part2 h2").slideUp();
            $("body").css("background", "red");
        }
        else if (random != Number(input))
            click.play();

    }
    if (score >= 10)
        $(".s1 span").css("color", "green");
    else
        $(".s1 span").css("color", "red");
    document.querySelector("input").value = "";
});
document.querySelector(".check").addEventListener("click", () => {
    document.querySelector(".check").classList.toggle("pressed");
        setTimeout(() => {
            document.querySelector(".check").classList.toggle("pressed"); 
        }, 150);
});
