var dog,happyDog,database,foodS,foodStock
//variable for dog and happy images
var dog_img,happyDog_img;
//variable for two buttons
var feed,addfood;
//variable to store last feeding time
var fedTime,lastFed;
//variable for food class
var foodObj;

var foodStock,currenttime;

var input,button,greeting,Name;

var nameref;

//database variable
var database;

// variables for reading and updating gameState
var readState;

var bedroom_img,garden_img,washroom_img;

var gameState;


function preload()
{
  //to load images
  dog_img=loadImage("images/dogImg.png");
  happyDog_img=loadImage("images/happy dog.png");
  bedroom_img=loadImage("images/Bed Room.png");
  garden_img=loadImage("images/Garden.png");
  washroom_img=loadImage("images/Wash Room.png");
}

function setup()
{
  //connecting database to firebase
  database=firebase.database();
  //fetching stock from DB
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  //console.log(foodStock)

  //reading name from database
  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data)
  {
    gameState=data.val();
  })

  //fetching fedtime from database
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })
  
  //To create Canvas
  createCanvas(600,800);

  //to create dog sprite
  dog=createSprite(300,600);
  dog.addImage(dog_img);
  dog.scale=0.3;

  //Creating foodObj using food class
  foodObj=new food();

  //feed the dog button
  feed=createButton("Feed the Dog");
  feed.position(640,67);
  feed.mousePressed(feedDog);

  //add food button
  addFood=createButton("Add Food")
  addFood.position(740,67);
  addFood.mousePressed(addFoods);

  input=createInput("Change Pet Name");
  input.position(440,67);
  
  button=createButton("SUBMIT");
  button.position(548,90);
  button.mousePressed(renamingDog)
  
}
 
function draw()
{
  //assigning RGB colour to background
  background(46, 139, 87);  

  if(gameState!=="Hungry")
  {
    feed.hide();  
    addFood.hide();
    dog.visible=false;
  }
  else 
  {
    feed.show();
    addFood.show();
    dog.visible=true;
   // dog.addImage(dog_img);
  }
  
  if(Name!==undefined)
  {
  text("Your Pet Name: "+ Name,685,32);
  }

  currenttime=hour();
  if(currenttime==(lastFed+1))
  {
    update("Playing")
    foodObj.garden();
    console.log(background);
  }
  else if(currenttime==(lastFed+2))
  {
    update("Sleeping");
    foodObj.bedroom()
    console.log(background);
  }
  else if(currenttime>(lastFed+2)&&currenttime<=(lastFed+4))
  {
    update("Bathing");
    foodObj.washroom();
   // console.log(background);
  }
  else{
    update("Hungry");
    foodObj.display();
    
    dog.addImage(dog_img);
   // console.log(background);
  }

  //To draw the sprites on canvas
  drawSprites();

  push();
  stroke("white");
  strokeWeight(1.5);
  textSize(25);
  fill("black")
  text("You love your pet "+name,105,760);
  pop();
 
  
}

//function to read value from database
function readStock(data)
{ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to feed the dog
function feedDog()
{
  dog.addImage(happyDog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    gameState:"Hungry"
  })
  
}

//function to add the dog
function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function renamingDog()
{
  Name=input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    name:Name
  })

}

function update(state)
{
  database.ref("/").update({
    gameState:state
  })
}

