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


try {
let b = gc("best")
if(b!=Infinity) {
b = b.split("")
b = [b[0]+b[1], b[2]+b[3], b[4]+b[5]]
b = b.join(":")
} else {
  b = "None achived"
}
let w = gc("win")
let l = gc("lose")
let t = parseInt(w)+parseInt(l)
let s = document.getElementById("stats")
let m = `
Your stats: <br>Total plays: ${t}<br>Wins: ${w}<br>Losses: ${l}<br>Best time: ${b}`

s.innerHTML = m
} catch(err) {window.alert(err)
}
// if(gc("allow")==null) {
//   sc("allow", true, 1000)
// }
// document.getElementById("allow").innerHTML = gc("allow")
// function toggle(){
//   sc("allow", gc("allow")=="true"?false:true)
//   document.getElementById("allow").innerHTML = gc("allow")
// }
