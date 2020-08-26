//Create variables here
var dog, happyDog, database, foodS, foodStock,dogsad;
var NOTE;
var button1,button2;
var fedTime, lastFed;
var foodObj;

function preload(){
  //load images here
  dogsad=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog = createSprite(250,250);
  dog.addImage(dogsad);
  dog.scale=0.1;

  feed=createButton('Feed the dog')
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousepressed(addFoods);

  var foodStockRef=database.ref('Food');
  foodStockRef.on("value",readStock);
  textSize (15)
  fill(255,255,255);
  if(lastFeb>=12){
    text("Last Feed : "+lastfed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastfed +"AM",350,30);
  }
}

function draw() {  
  background(46, 139, 87);
  fedTime=database.ref('FedTime');
  fedTime.on("value",function(data){ 
    lastFed=data.val();
  });

  drawSprites();
  //add styles here
  text("Note:Press UP_ARROW key To Feed Drago Milk! ",100, 100);
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
});
}
  function addFood(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

  function feedTheDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
    FeedTime:hour()
    })
  }
