let roadSide = document.querySelector(".roadSide");
let roadSidePosition = roadSide.getBoundingClientRect();
let mainCar = document.getElementById("mainCar");
let roadSport = document.getElementById("roadSport");

let player = {
    name: "admin",
    score: 0,
    status: false,
    speed: 5,
    top: 500,
    left: 50
};




let keys = {w: false, d: false, s: false, a: false}
document.addEventListener('keydown',function(e){
    e.preventDefault();
    keys[e.key] = true;
    if(keys.w == true && player.top > (roadSidePosition.top + 140)){
        player.top -= player.speed * 5;
        mainCar.style.top = player.top+"px";
    }else if(keys.d == true && player.left < (roadSidePosition.width - 52)){
        player.left += player.speed * 5;
        mainCar.style.left = player.left+"px";
    }else if(keys.s == true && player.top < (roadSidePosition.bottom - 70)){
        player.top += player.speed * 5;
        mainCar.style.top = player.top+"px";
    }else if(keys.a == true && player.left > 0){
        player.left -= player.speed * 5;
        mainCar.style.left = player.left+"px";
    }
});
document.addEventListener('keyup',function(e){
    e.preventDefault();
    keys[e.key] = false; 
});



function moveLines(){
  let lines = document.querySelectorAll('.roadSport');
  lines.forEach(function(v) {
    if(v.top >= 700){
      v.top -= 750;
    }
    v.top += player.speed;
    v.style.top = v.top + "px";
  });
}






function moveEnemy(car){
  let ememy = document.querySelectorAll('.roadEmemy');
  ememy.forEach(function(v) {
    if(isCollide(car, v)){
      player.status = false;
      document.querySelectorAll('.roadSport').forEach(e => e.remove());
      document.querySelectorAll('.roadEmemy').forEach(e => e.remove());
      document.getElementById('alertMsg').style.display = "block";
    }
    if(v.top >= 700){
      v.top = -300;
      v.style.left = Math.floor(Math.random() * 250) + "px";
    }
    v.top += player.speed;
    v.style.top = v.top + "px";
    
  });
}




function isCollide(a, b){
  let mainCar = a.getBoundingClientRect();
  let enemyCar = b.getBoundingClientRect();
  return !((mainCar.bottom < enemyCar.top) || (mainCar.top > enemyCar.bottom) || (mainCar.right < enemyCar.left) || (mainCar.left > enemyCar.right));
}



function play(){
  if(player.status){
    moveLines();
    moveEnemy(mainCar);
    window.requestAnimationFrame(play);
    ++player.score; 
    document.getElementById("showScore").innerHTML = player.score;
  }
}




function start(){
  player.score = 0;
  player.status = true;
  document.getElementById('alertMsg').style.display = "none";
  window.requestAnimationFrame(play);
  


  for (let i = 0; i < 5; i++) {
    let roadSport = document.createElement('div');
    roadSport.setAttribute("class", "roadSport");
    roadSport.top = 150 * i;
    roadSport.style.top = roadSport.top + "px";
    roadSide.appendChild(roadSport); 
  }


  for (let i = 0; i < 4; i++) {
    let roadEnemy = document.createElement('div');
    roadEnemy.setAttribute("class", "roadEmemy");
    let enemy_car_image = Math.floor(Math.random() * 6)+".png";
    roadEnemy.style.backgroundImage = `url(${enemy_car_image})`;
    /* roadEnemy.style.backgroundColor = getColor(); */
    roadEnemy.top = ((i+1) * 250) * -1;
    roadEnemy.style.top = roadEnemy.top + "px";
    roadEnemy.left = Math.floor(Math.random() * 250);
    roadEnemy.style.left = roadEnemy.left + "px";
    roadSide.appendChild(roadEnemy); 
  }
  /* function getColor(){
    let color = Array('red', 'green', 'blue', 'black', 'white');
    let coun = Math.floor(Math.random() * 5);
    return color[coun];
  } */
}











