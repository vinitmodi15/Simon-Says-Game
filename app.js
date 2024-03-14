let heading = document.querySelector("h2");
let gamSeq= [];
let usrSeq = [];
let btns = ["yellow","red","purple","green"]; //colors ke naam
let level = 0;
let started = false; //game is not started yet so that's why false


document.addEventListener("keypress",function(){
    // console.log("key is pressed") //to check the code running or not and yeh baar baar console p count dikhayega kitni baar keypress hui
    if(started == false){
        console.log("key is pressed and the game is started");
        started = true;  //isse started ki jo value hai vo true hogyi and vo ek hi msg dikhayega console pe and baar baar nhi dikhayega kyoki condition yeh ki started==false ho tb chle 
        levelUP(); //jese hi keyprss hooke game start hojaaye levelUp function ko call kre and uski value update ho h2 m.
    }

})


function levelUP(){
    usrSeq = [];
    level++;
    heading.innerText = `level ${level}`; //isse level ki value update ho rhi hai


    //random btn flash jo bhi hoga uske liye niche vaala call hoga and random btn ka code aayegayah
    let randIdx = Math.floor(Math.random()*3);       //*3 isliye kyoki btns ki array ki length 4 hai yellow green purple red 0 se kre to 3 hai
    let randColorBtn = btns[randIdx];         //btns array ka jo bhi index no. generate hoga ho idhr jaayega and randidx m store hojaayega
    let randBtn = document.querySelector(`.${randColorBtn}`);
    gamSeq.push(randColorBtn);
    console.log(gamSeq);
    // console.log(randIdx);
    // console.log(randColorBtn);
    // console.log(randBtn);
    btnflash(randBtn);//yeh isliye call ho rha hai taaki jese ki dekha apn key press hote hi random btn flash hota hai to usak back-col white ho rha hai
}


function btnflash(btn){ //jo bhi button hume flash krana hai vo as a argument aayega and uske andr hume classlist add krte hai
    btn.classList.add("flash");
    setTimeout(function(){  //flash class ko remove krdega 
        btn.classList.remove("flash")
    },250);
}
// jo bhi btn variable declare kiya hai vo saare alg name ke hai and vo function m use ho rhe hai alg alg isliye vo sab alg hai har ek function k liye
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnpress);
}
function btnpress(){
    // let btn=this.getAttribute("id"); 
    let btn = this;
    usrSeq.push(btn.id);
    // console.log(usrSeq);
    // console.log(btn);
    // console.log("btn pressed");
    // console.log(this);// vo btn jo click kra
    //jo user bhi butto flash krega uske liye button flash hona chiaye na
    btnflash(btn);
    checkAns(usrSeq.length-1); //check krega jo user n flash kiya hai ya click kiya button ko kyy vo shi hai 
}
function checkAns(idx){
    console.log("current level",level)
    // let idx = level -1; //jo bhi level ki value hai usko array me index m -1 krenge to hi elements ka shi value check ho paayegi jese level to 1 hai and array m to apn 0 se chalu krte hai index 
    if(usrSeq[idx] === gamSeq[idx]){
        // console.log("same values");
        if(usrSeq.length === gamSeq.length){
            // levelUP();
            // we are adding delay to move to another function
            setTimeout(levelUP,1000);
        }
    }else {
        // heading.innerText = "Game Is Over! Press Any Key To Start Again"; innertext me tags used nhi krr skte that's why we use innerhtml
        heading.innerHTML = `Game is over! <b>your score was${level}</b> <br> Press any key to start..`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}

function reset(){
    started = false;
    gamSeq = [];
    usrSeq = [];
    level = 0;
}





/*  Bhai, jab tu koi button press karta hai, tab btnpress function chalu hota hai. Iss function mein, woh pressed button ka ID user ki sequence mein daal deta hai (usrSeq). Fir, btnflash function ko bhi call karta hai jo visually pressed button ko highlight karta hai. Uske baad, checkAns function se user ki sequence aur game ki sequence ko compare karta hai.

checkAns function mein, woh current user sequence ka element aur corresponding game sequence ka element compare karta hai. Agar match hota hai, toh dekhta hai ki dono sequences ki length barabar hai ya nahi. Agar barabar hai, toh levelUP function ko 1-second ke delay ke baad chalu karta hai. Agar match nahi hota, toh HTML heading ko update karke dikhata hai ki game khatam ho gaya hai, user ka score (level) dikhata hai, background color thoda sa red ho jata hai, aur fir game ko reset kar deta hai.

Simple bhasha mein, jab tu koi button press karta hai, game dekhta hai ki tu sahi sequence follow kar raha hai ya nahi. Agar sahi hai, toh agla level start hota hai. Agar galat hai, toh game khatam ho jata hai aur tere score ko dikhaya jata hai. */















/*  ```
let start =true;
let level=0; 
let h2=document.querySelector("h2");
let btns=document.querySelectorAll(".btn"); 
let maxscr=document.querySelector(".max");
let color=["green","red","yellow","purple"];
let gameSeq=[];
let mySeq=[]  
let maxScore =0;
// gameSeq.push("blue");
// console.log(gameSeq);

document.addEventListener("keypress",function(){ 
if(start==true){ 
    start=false;
    levelUp();
}
});

function levelUp(){ 
level++;

// console.log(level);
h2.innerText=`Level ${level}`
let rIdx=Math.floor(Math.random()*3);
let clr=color[rIdx];
gameSeq.push(clr);
console.log(gameSeq);
flashGame(clr)

}


function flashGame(clr){ 
    // console.log(clr);
    document.querySelector(`.${clr}`).classList.add("flash")
    setTimeout(function(){ 
        document.querySelector(`.${clr}`).classList.remove("flash");
    },300);
}

function flashUser(clr){ 
    document.querySelector(`.${clr}`).classList.add("user")
    setTimeout(function(){ 
        document.querySelector(`.${clr}`).classList.remove("user");
    },200);
}


for(btn of btns){  
    btn.addEventListener("click",addUserSeq);
}

function addUserSeq(){ 
   let clr=this.getAttribute("id"); 
   mySeq.push(clr);
   flashUser(clr);
   check();
}

myseq=["ora","Res,","pur"]
function check(){ 
  
    let idx=mySeq.length-1;
    // console.log(mySeq)
 if(mySeq[idx]==gameSeq[idx] && idx==gameSeq.length-1){
    mySeq=[];
    levelUp();    
 }
 else if(mySeq[idx]!=gameSeq[idx]){ 
    
    h2.innerHTML=`You Lose game your score is <b> ${gameSeq.length} </b> <br> press any key to restart `;
    maxScore=Math.max(maxScore,gameSeq.length);
    maxscr.innerText=`MAX SCORE IS ${maxScore}`;
    reset();
 }
}

function reset(){ 
gameSeq=[];
mySeq=[];
start=true;
level=0;
// h2.innerText
}```       */