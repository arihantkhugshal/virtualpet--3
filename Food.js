class food
{
    constructor()
    {
        //loading milk image
        this.image=loadImage("images/milk2.png");

        //Declaration of two variables foodStock and LastFed
        this.foodStock=0;
        this.lastFed;

    }

    getFoodStock()
    {
    return this.foodStock;
    }

    

    //updating Food into database by passing a parameter foodStock
    updateFoodStock(foodStock)
    {
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   

    deductFood()
    {
      if(this.footstock>0){
        this.foodStock=this.foodStock-1;
      }
        
    }
    

    //displaying food images in group of 10 using % operator and for loop
    display()
    {
        background(46,139,87);

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : "+ lastFed%12 + " PM", 50,30);
        }else if(lastFed==0){
            text("Last Feed : 12 AM",50,30);
        }else{
            text("Last Feed : "+ lastFed + " AM", 50,30);
        }

        var x=80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock!==0)
       {
           for(var i=0;i<this.foodStock;i++)
           {
               if(i%10===0)
               {
                   x=80 ;
                   y=y+50;
               }
                image(this.image,x,y,50,50);
                x=x+30;
           }
       }
    }

    bedroom()
    {
        background(bedroom_img,550,500);
    }

    garden()
    {
        background(garden_img,550,500);
    }

    washroom()
    {
        background(washroom_img,550,500);
    }
}