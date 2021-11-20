

let Cards = document.querySelectorAll('.card-box');
let Eye = document.querySelectorAll(".eye");

const all_images = ["Air.png", "Artificial.png", "Flame.png", "Forest.png", "Healing.png", "Holy.png", "Insect.png", "Mineral.png", "Mythical.png", "Nocturnal.png", "Occult.png", "Ocean.png", "Snow.png", "Storm.png"];

class Game {
  constructor(num_cards) {
    this.number_of_cards = num_cards;
    this.points=0;
    this.flips=0;
    this.cards = [];
    this.state_cards = [];
    this.eye_under_use=false;

    if(num_cards==25)
    {
      this.time=150;//150
      this.number_of_eyes=0;
      console.log(Eye);
    }
    else if(num_cards==36)
    {
      this.time=210;//210
      this.number_of_eyes=1;
      //this.Eye = document.querySelectorAll('.eye');
      console.log(Eye);
    }
    else if(num_cards==64)
    {
      this.time=20;//270
      this.number_of_eyes=3;
      //this.Eye = document.querySelectorAll('.eye');
      console.log(Eye);
    }

    this.flipSound = new Audio('Assets/Audio/flip.wav');
    this.matchSound = new Audio('Assets/Audio/match.wav');
    this.bgSound= new Audio('Assets/Audio/bg.mp3');
    this.successSound=new Audio('Assets/Audio/success.wav');
    this.loseSound=new Audio('Assets/Audio/lose.wav');
    this.eyeSound=new Audio('Assets/Audio/eye.wav');
    this.clockSound=new Audio('Assets/Audio/clock.wav');

    for (let i = 0; i < this.number_of_cards; ++i) {
      this.cards.push(0);
      this.state_cards.push(0);
    }

  }
  card_setter() {

    for (let i = all_images.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [all_images[i], all_images[j]] = [all_images[j], all_images[i]];
    }

    all_images.push("Key.png");
    all_images.push("Clock.png");
    for (let i = 0; i < this.cards.length; ++i) {

      if(this.number_of_cards==25)
        var num = Math.floor(i / 6);
      
      else
        var num=Math.floor(i/4);

      this.cards[i] = num;
    }
    if(this.number_of_cards==25)
      this.cards[24]=14;

    else if(this.number_of_cards==36){
      this.cards[32]=14;
      this.cards[33]=14;
      this.cards[34]=15;
      this.cards[35]=15;
    }

    else if(this.number_of_cards==64){
      this.cards[58]=14;
      this.cards[59]=14;
      this.cards[60]=15;
      this.cards[61]=15;
      this.cards[62]=15;
      this.cards[63]=15;
    }
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    for (let i = 0; i < this.cards.length; ++i) {
      let card_change = document.querySelectorAll('.back-card')[i];
      
      //console.log(card_change);
      let img_card_src="Assets/Images/"+all_images[this.cards[i]];
      let card_img=document.createElement('img');
      card_img.setAttribute('src',img_card_src);
      card_change.appendChild(card_img);
    }

  }
}
var game = new Game(Cards.length);
//console.log(game.cards);
game.card_setter();
var totalSeconds_left=game.time;
var down_timerVar=setInterval(down_countTimer,1000);

game.bgSound.volume=0.1;
game.bgSound.play();
game.bgSound.loop=true;

//console.log(all_images);

for(let i=0;i<game.number_of_cards;++i)
{
    Cards[i].addEventListener("click",function(){ controller(i);  });
}

for(let i=game.number_of_eyes-1;i>=0;i--)
{
  Eye[i].addEventListener("click",function(){ eye_caller(i);  });
}

function controller(card_num)
{

    
    if(game.state_cards[card_num]==1)
    {
      game.state_cards[card_num]=0;
      flipper(card_num);
      flip_counter();
    }
    else if(game.state_cards[card_num]==0)
    {
      game.state_cards[card_num]=1;
      game.flipSound.play();
      flipper(card_num);
      flip_counter();
      
    }
    //console.log(game.state_cards);
    
    
    let card_1;
    let card_2;
    let card_3;

    for(let i=0;i<game.number_of_cards;++i)
    {
      if(game.state_cards[i]==1)
      {
        if(card_1!=undefined)
          card_2=i;
        else
          card_1=i;
        
        if(card_1!=undefined && card_2!=undefined)
          break;
      }
    }
    //console.log(card_1);
    //console.log(card_2);
    if(card_1!=undefined && card_2!=undefined)
    {
      if(game.cards[card_1]!=game.cards[card_2] && (game.cards[card_1]==14 || game.cards[card_2]==14))
      {
        console.log("yo");
        if(game.cards[card_1]!=14)
          [card_1,card_2]=[card_2,card_1];

        for(let i=0;i<game.number_of_cards;++i)
        {
          if(game.cards[i]==game.cards[card_2] && game.state_cards[i]==0)
          {
            card_3=i;
            break;
          }
        }
        

        game.state_cards[card_1]=-1;
        game.state_cards[card_2]=-1;
        game.state_cards[card_3]=-1;
        console.log(card_1,card_2,card_3);
        setTimeout(function(){ flipper(card_3); }, 200);
        setTimeout(function(){ matcher(card_1,card_2,card_3); }, 800);
        pointer();

        if(game.cards[card_2]==15)
        {
          totalSeconds_left+=12;
          console.log("time added");
        }

      }
      else if(game.cards[card_1]!=game.cards[card_2])
      {
        game.state_cards[card_1]=0;
        game.state_cards[card_2]=0;
        setTimeout(function(){ flipper(card_1,card_2); }, 800);
        //console.log("hey");
      }
      else if(game.cards[card_1]==game.cards[card_2])
      {
        game.state_cards[card_1]=-1;
        game.state_cards[card_2]=-1;
        setTimeout(function(){ matcher(card_1,card_2); }, 800);
        //matcher(card_1,card_2);
        pointer();

        if(game.cards[card_1]==15)
        {
          totalSeconds_left+=12;
          console.log("time added");
        }
      }
      
    }

    
}
function flipper(card_num_1,card_num_2)
{
  const card_1=document.querySelectorAll('.card-box')[card_num_1];
  card_1.classList.toggle("flipCard");
  if(card_num_2!=undefined)
  {
    const card_2=document.querySelectorAll('.card-box')[card_num_2];
    card_2.classList.toggle("flipCard");

  }
  //finisher();
}
function matcher(card_num_1,card_num_2,card_num_3)
{
  Cards[card_num_1].children[1].style.opacity=0.4;
  Cards[card_num_2].children[1].style.opacity=0.4;
  game.matchSound.play();
  if(card_num_3!=undefined)
  {
    Cards[card_num_3].children[1].style.opacity=0.4;
  }
  finisher();

}
function pointer()
{
  game.points=game.points+20;
  document.getElementById('points').innerHTML=game.points;
}
function flip_counter()
{
  ++game.flips;
  document.getElementById('Flips').innerHTML=game.flips;
}
/*----------------------Timer-----------------------------*/
function down_countTimer()
{
  
  if(totalSeconds_left==0)
  {
      scorer("time_up");
      game.clockSound.pause();
      
  } 

  if(totalSeconds_left>0)
  {
    
    totalSeconds_left--;
    if(totalSeconds_left<=10)
    {
      game.clockSound.loop=true;
      game.clockSound.play();
      document.getElementById('timer').style.color="red";
      document.getElementById('timer_title').style.color="red";

    }
    
    else
    {
      game.clockSound.pause();
      document.getElementById('timer').style.color="black";
      document.getElementById('timer_title').style.color="black";
    }
  }

  else
  {
    clearInterval(down_timerVar);
    //calling of drop box for no time left condition
    return;
  }
  
  var hour_left=Math.floor(totalSeconds_left/3600);
  var minute_left=Math.floor((totalSeconds_left-hour_left*3600)/60);
  var seconds_left=totalSeconds_left-(hour_left*3600 + minute_left*60);

  if(hour_left<10)
  hour_left="0"+hour_left;

  if(minute_left<10)
  minute_left="0"+minute_left;

  if(seconds_left<10)
  seconds_left="0"+seconds_left;

  document.getElementById("timer").innerHTML=hour_left+":"+minute_left+":"+seconds_left;
}

/*--------------------Aborter Functions---------------------------*/

function finisher()
{
  var count=0;
  for(i=0;i<game.number_of_cards;i++)
  {
    if(game.state_cards[i]==-1)
    {
      count++;
    }
  }

  console.log(count);
  if(count==game.number_of_cards || count==(game.number_of_cards-1))
  {
    //calling of drop box for success condition
    clearInterval(down_timerVar);
    if(count==game.number_of_cards-1)
    {
      for (var i = 0; i < game.number_of_cards; i++) 
      {
        if(game.state_cards[i]==0)
        {
          controller(i);
          Cards[i].children[1].style.opacity = 0.4;
          break;
        }
      }
    }
    scorer("success");
  }
}

/*-------------------Score Calculator-----------------------*/

function scorer(called_by)
{
  //game.points;
  //game.flips;
  //totalSeconds_left;
  game.bgSound.pause();
  
  var final_score=(game.points + totalSeconds_left)-(game.flips*2);
  if(final_score<0)
  {
    final_score=0;
  }

  if(game.number_of_cards==25)
  {
    final_score+=5;
  }

  else if(game.number_of_cards==36)
  {
    final_score+=15;
  }

  else if(game.number_of_cards==64)
  {
    final_score+=25;
  }

  if(called_by=="success")
  {
    $('#success').modal();
    setTimeout(function(){game.successSound.play();},700);
    document.getElementById('final_score').innerHTML=final_score;
    document.getElementById('final_flips').innerHTML=game.flips;
    document.getElementById('final_points').innerHTML=game.points;
    document.getElementById('time_left').innerHTML=totalSeconds_left;
  
  }

  else if(called_by=="time_up")
  {
    $('#time_up').modal();
    game.loseSound.play();
    document.getElementById('final_score_time').innerHTML=final_score;
    document.getElementById('final_flips_time').innerHTML=game.flips;
    document.getElementById('final_points_time').innerHTML=game.points;
    document.getElementById('time_left_time').innerHTML=totalSeconds_left;
  
  }

  //final_score to be added in drop down box

}

/*---------------------Eye function---------------------------*/

function eye_caller(num_eye)
{
  
  if(Eye[num_eye].style.opacity!=0.4 && game.eye_under_use==false)
  {
    Eye[num_eye].style.opacity=0.4;
    game.eye_under_use=true;
    game.eyeSound.play();

    for(let i=0;i<game.number_of_cards;i++)
    {
      if(game.state_cards[i]==0)
      {
        flipper(i);
        game.state_cards[i]=2;
      }
    }

    setTimeout(function(){    
      for(let i=0;i<game.number_of_cards;i++)
      {
        if(game.state_cards[i]==2)
        {
          flipper(i);
          game.state_cards[i]=0;
        }
      }
      game.eye_under_use=false;
  },2500);

  }


}

function cheat_code() {
  if (game.number_of_cards == 25) {
    controller(0);
    for (let i = 0; i < game.number_of_cards; ++i) {
      if (game.cards[i] == 14)
        controller(i);
    }

  }
  for (let i = 0; i < game.number_of_cards; ++i) {
    if (game.state_cards[i] != -1) {
      controller(i);
      for (let j = i + 1; j < game.number_of_cards; ++j) {
        if (game.cards[j] == game.cards[i] && game.state_cards[j] != -1) {
          controller(j);
          break;
        }
      }
    }
  }
}

let card_scale=document.querySelectorAll('.col');
//console.log(card_scale);
let card_height=card_scale[0].offsetHeight;
console.log(card_height);
let card_width=card_scale[0].offsetWidth;
console.log(card_width);

let card_ratio=card_height/card_width;
console.log(card_ratio);









