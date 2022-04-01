let letter;
let tries;
let time;
let t;
if(gc("lose")==""||isNaN(gc("lose"))){
  sc("best", Infinity, 1000)
  sc("lose", 0, 1000)
  sc("win", 0, 1000)
}
window.addEventListener('beforeunload', function (e) {
  
  e.preventDefault(); 
   
  e.returnValue = '';
});
function enter() {
  if(letter===5) {
     try {
      checkrow(tries, random.length, random, time)
      tries++
      letter = 0
      
      console.log("aha")
      console.log(tries, letter)
     } catch(e){console.log(e)}
    } else{letter++}
    if(tries===7){gameover(random)}
}
//cookies only run in new tab
let won = false
random = "";
function sc(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function gc(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function keydownevent(e){
  e.preventDefault()
  let c = e.code
  if(c=="Backspace"){
    document.getElementById("back").click()
  } else if (c.length===4){

 let k = ""
   for(let i = 1; i < 27; i++) {
     if(document.getElementById("k"+i).innerHTML===c.split("")[3]) {k = document.getElementById("k"+i)}
   }
  
   k.click()
  }
}
function checkenter(e){
  e.preventDefault()
  let c = e.code
  if(c=="Enter"){
    document.getElementById("enter").click()
  }
}

function rtf(file){
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    let txt = '';
    rawFile.onreadystatechange = function(){
if(rawFile.readyState === 4){
if(rawFile.status === 200 || rawFile.status == 0){
txt = rawFile.responseText}}}
rawFile.send(null);
return txt
}

let words = JSON.parse(rtf("list.json")).list

function start() {
  try{
clearInterval(t)
  } catch(err){}
  won = false
  for(let i = 1; i < 27; i++) {
     document.getElementById("k"+i).style["background-color"]= "white"
   }

time = ["00", "00", "00"]
document.getElementById("timer").innerHTML = time.join(":")
function tick() {
  if(parseInt(time[2])>=59) {
    time[2]="00"
    time[1]=(parseInt(time[1])+1)<10?"0"+parseFloat(parseInt(time[1])+1):parseFloat(parseInt(time[1])+1)
  } else{time[2]=(parseInt(time[2])+1)<10?"0"+parseFloat(parseInt(time[2])+1):parseFloat(parseInt(time[2])+1)}
  
    if(parseInt(time[1])>=59) {
    time[1]="00"
    time[0]=(parseInt(time[0])+1)<10?"0"+parseFloat(parseInt(time[0])+1):parseFloat(parseInt(time[0])+1)
  }
  document.getElementById("timer").innerHTML = time.join(":")
}
 t = setInterval(tick, 1000)

//start new game
   random = words[Math.floor(Math.random()*5757)]

  var l = random.length
  // window.alert(random)
  let div = document.getElementById("game")
  let html = ""
  div.style.width=l*50+"px"
  for(let e = 0; e < 6; e++) {
    let inner = "<div class = 'inner'>"
  for(let i = 0; i < l; i++) {
inner+='<div class="gamebox" id="b'+e+i+'"></div>'
  }
  inner+="</div>"
  html += inner
  }
div.innerHTML = html
document.addEventListener("keydown", keydownevent)
document.addEventListener("keydown", checkenter)
tries = 1;
letter = 0
for(let i = 1; i < 27; i++) {
  let e = document.getElementById("k"+i) 
  e.addEventListener("click", function(){
    document.getElementById("b"+parseFloat(tries-1)+parseFloat(letter)).innerHTML = e.innerHTML
    if(letter !== 5) {letter++}
  })
  
}
document.getElementById("back").addEventListener("click", function(){
  if(letter>0) {
    document.getElementById("b"+parseFloat(tries-1)+parseFloat(letter - 1)).innerHTML = "";
    letter--;
  }
})
}
try {
function gameover(r){
  
  if(won==false) {
setTimeout(function(){

  window.alert("You lost... :(\n The wordle was " + r)
     try{
clearInterval(t)
  } catch(err){console.log(err)}
  sc("lose", parseInt(gc("lose"))+1)
}, 10)

  }
}

if(gc("allow")=="") {
  sc("allow", true, 1000)
}
function checkrow(n, l, w){
  // let allow = gc("allow")==="true"?true:false
  let wordarr = w.split("")
  let arr = []
  
    //   let currentWord = ""
    // for(let i = 0; i < 5; i++){
    //   currentword += document.getElementById("b"+parseFloat(n-1)+parseFloat(i)).innerHTML
    // }
  // if(words.indexOf(currentWord)===-1) {
  //   window.alert("Word not in list")
  //   return
  // }
  let k, d
  for(let i = 0; i < l; i++){
   
  }
  for(let i = 0; i < l; i++){
      k = ""
   d = document.getElementById("b"+parseFloat(n-1)+parseFloat(i))
  for(let i = 1; i < 27; i++) {
     if(document.getElementById("k"+i).innerHTML===d.innerHTML) {k = document.getElementById("k"+i)}
   }


    
    if(w.split("")[i]===d.innerHTML.toLowerCase()){
      arr.push(true)
      document.getElementById("b"+parseFloat(n-1)+parseFloat(i)).style["background-color"] = "limegreen"
      k.style["background-color"] = "limegreen"
      wordarr.splice(wordarr.indexOf(d.innerHTML.toLowerCase()), 1)
    } else {
      console.log(w.split("")[i], d.innerHTML.toLowerCase())
    }
  }
  
    for(let i = 0; i < 5; i++){
        k = ""
   d = document.getElementById("b"+parseFloat(n-1)+parseFloat(i))
  for(let i = 1; i < 27; i++) {
     if(document.getElementById("k"+i).innerHTML===d.innerHTML) {k = document.getElementById("k"+i)}
   }

let inner = d.innerHTML
      console.log(document.getElementById("k"+i), i)
      console.log(d, d.innerHTML)
    if(w.indexOf(inner.toLowerCase())!==-1 && wordarr.indexOf(inner.toLowerCase())!==-1){
     // window.alert(wordarr.indexOf(d.innerHTML.toLowerCase())) 
       wordarr.splice(wordarr.indexOf(d.innerHTML.toLowerCase()), 1)
      document.getElementById("b"+parseFloat(n-1)+parseFloat(i)).style["background-color"] = "yellow"
       k.style["background-color"] = "yellow"
    }
  }
  for(let i = 0; i < l; i++){
      k = ""
   d = document.getElementById("b"+parseFloat(n-1)+parseFloat(i))
    console.log(d)
  for(let i = 1; i < 27; i++) {
     if(document.getElementById("k"+i).innerHTML===d.innerHTML) {k = document.getElementById("k"+i)}
   }


    
     console.log(wordarr, d.innerHTML)
       if(wordarr.indexOf(d.innerHTML.toLowerCase())==-1) {
      if(k.style["background-color"]!=="limegreen"&&k.style["background-color"]!=="yellow") {
         document.getElementById("b"+parseFloat(n-1)+parseFloat(i)).style["background-color"] = "lightgray"
       k.style["background-color"] = "lightgray"
    }
       }
  }

  
  for(let i = 0; i < l; i++){
     k = ""
   d = document.getElementById("b"+parseFloat(n-1)+parseFloat(i))
    console.log(d)
  for(let i = 1; i < 27; i++) {
     if(document.getElementById("k"+i).innerHTML===d.innerHTML) {k = document.getElementById("k"+i)}
   }
    
    if(d.style["background-color"]!=="lightgray"&&d.style["background-color"]!=="limegreen"&&d.style["background-color"]!=="yellow") {
      d.style["background-color"]="lightgray"
      k.style["background-color"]="lightgray"
    }
  }
  if(arr.length === l) {
    for(let i = 0; i < l; i++){
  document.getElementById("b"+parseFloat(n-1)+parseFloat(i)).style["background-color"] = "limegreen"
  }
  won = true
  
  setTimeout(function(){
      
   window.alert("YOU WON!!!!!!!!!!!!!!!")
    document.getElementById("share").style.display = "block"
    try{
clearInterval(t)
  } catch(err){console.log(err)}
  sc("win", parseInt(gc("win"))+1)
  if(parseInt(time.join(""))<gc("best")){
    sc("best", parseInt(time.join("")), 1000)
  }
  },10)
  
  }

}


function q() {
  window.alert(`
  Guess the WORDLE in six tries.\n
Each guess must be a valid five-letter word. Hit the enter button to submit.\n
After each guess, the color of the tiles will change to show how close your guess was to the word.\n
Green means the correct letter in the correct place. \n
Yellow means that the letter belongs in the word, but in a different spot.\n
Gray means that the letter does not exist in this word.\n 
You can type with either the keyboard on the screen or your physical one. Use the backspace button or the back arrow button onscreen to backspace. 
`)

}


start()

window.rtf = rtf
} catch(e){console.log(e)}

function share() {
  
  let arr = []
  for(let i = 0; i < 6; i++){
let pushed = []
    for(let e = 0; e < 5; e++) { pushed.push(document.getElementById(`b${i}${e}`))
  //.style["background-color"]
    }
    arr.push(pushed)
  }

  //🟩🟨⬛
  let message = "WORDLE Results:\n"
  arr.map(e=>{
    e.map((a, i)=>{
    if(a.style["background-color"] ==="limegreen"){
      message+= "🟩"
    }else if (a.style["background-color"] ==="yellow"){
      message+= "🟨"
    } else if(a.style["background-color"] === "lightgray"){
      message+= "⬛"
    } else {
      //if(a.style["background-color"] === "white")
      message+= ""
    }

  })
          message+="\n"
  })
  message+="Got it on try "+(tries)+"/6"
    try{
      





// let input = document.createElement("textarea")
//       input.style="display:none; white-space: pre-wrap"
//     input.value = message
//     document.body.appendChild(input)
//     var copyText = input

//   /* Select the text field */
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(message);
  
  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
      document.body.innerHTML+=copyText.value
  } catch(e){console.log(e)}
}
