//By Fraiolefano

var mode=0;
var startingNumber=1;
var startingNumberButton;
var number=startingNumber;
var stepSize=52;
var direction=0;  //0=right,1=up,2=left,3=down
var currentStep=0;
var nSteps=1;
var pos,prePos;
var toIncrease=true;
var maxN;
var bg,fg;
var colorIndex=0;
function setup()
{
    pixelDensity(1);
    createCanvas(window_size,window_size);
    console.log("inizio con "+mode);
    textSize(50);
    startingNumberButton=document.getElementById("startingNumberButton");
    startingNumberButtonValue=Math.abs(parseInt(startingNumberButton.value,10));
    if (isNaN(startingNumberButtonValue) || startingNumberButtonValue==0){startingNumberButtonValue=1;}
    startingNumberButton.value=startingNumberButtonValue;
    startingNumber=startingNumberButtonValue;
    number=startingNumber;
    direction=0;
    currentStep=0;
    nSteps=1;
    pos=new p5.Vector(width/2,height/2);
    prePos=new p5.Vector(pos.x,pos.y);
    toIncrease=true;
    textSize((stepSize/2)-2);
    row=parseInt(width/stepSize,10);
    maxN=startingNumber+pow(row,2)+(5*row); //per farlo continuare un po'oltre il bordo
    colorIndex=0;
    textAlign(CENTER,CENTER);
    rectMode(CENTER);


    if (bg==null){bg=color(0,0,0);}
    if (fg==null){fg=color(0,255,127);}
    background(bg);
    if (mode<2){fill(bg);}
    else
    {fill(fg);}
    startTimer=millis();
    stroke(fg);
}

function draw()
{
    switch(mode)
    {
        case 0:
            mode1();
            break;
        case 1:
            mode2();
            break;
        case 2:
            mode3();
            break;
    }
}

function init(styleNumber)
{
  if (styleNumber<3) {mode=styleNumber;}
  switch(styleNumber)
  {
      case 0:
          stepSize=52;
          stroke(255,0,0,50);
          bg=color(0,0,0);
          fg=color(0,255,127);
          break;
      case 1:
          stepSize=21;
          bg=color(0,0,0);
          fg=color(0,255,127);
          break;
      case 2:
          stepSize=1;
          bg=color(0,0,0);
          fg=color(0,255,127);
          stroke(fg);
          break;
  }

  setup();
}
function mode1()
{
  if (millis()-startTimer<100)
  {return ;}

  if (number<maxN)
  {
    
    if (isPrime())
    {
      fill(fg);
      colorIndex=0;
    }
    else
    {
      colorIndex=1;
      fill(bg);
    } 
    noFill();
    stroke(255,0,0,50);
    line(pos.x,pos.y,prePos.x,prePos.y);
    prePos.x=pos.x;
    prePos.y=pos.y;
    
    if (colorIndex==0)
    {
      stroke(0,127,255);
      circle(pos.x,pos.y,stepSize);
      fill(fg);
    }
    else
      fill(50,50,50);

    text(number,pos.x,pos.y);

    changeDir();
    step();
    number++;
    currentStep++;
  }
  startTimer=millis();
}
function mode2()
{
    for(c=0;c<3;c++)
    {
      if (number<maxN)
      {
        
        if (isPrime())
        {
          fill(fg);
          colorIndex=0;
        }
        else
        {
          colorIndex=1;
          fill(bg);
        } 
        noFill();
        stroke(255,0,0,25);
        line(pos.x,pos.y,prePos.x,prePos.y);
        prePos.x=pos.x;
        prePos.y=pos.y;
        
        if (colorIndex==0)
        {
          stroke(0,127,255);
          square(pos.x,pos.y,stepSize);
          fill(fg);
        }
        else
          fill(50,50,50);

        text(number,pos.x,pos.y);

        changeDir();
        step();
        number++;
        currentStep++;
    }
    else
    {
      break;
    }
  }
}
function mode3()
{
  
  for(c=0;c<500;c++)
  {
    if (number<maxN)
    {
      if (isPrime())
       {
        point(pos.x,pos.y);
       }
    
      changeDir();
      step();
      number++;
      currentStep++;

    }
    else
    {
      break;
    }
  }
}

function changeDir()
{
  if (currentStep>=nSteps)
  {
    toIncrease=!toIncrease;
    if (toIncrease)
      nSteps++;
    currentStep=0;
    if (direction<3)
      direction++;
    else
      direction=0;
  }
}

function step()
{
  switch (direction)
  {
     case 0:
       pos.x+=stepSize;
       break;
     case 1:
       pos.y-=stepSize;
       break;
     case 2:
       pos.x-=stepSize;
       break;
     case 3:
       pos.y+=stepSize;
       break;
  }
}

function isPrime()
{
  if (number==1)
    return false;
  for(n=2;n<=number/2;n++)
  {
    if (number%n==0)
      return false;
  }
  return true;
}

function saveSpiral()
{
  nowTime=year()+"_"+month()+"_"+day()+"-"+hour()+"-"+minute()+"-"+second();
  imageName="./imgs/UlamSpiral-"+width+"x"+width+"_"+nowTime+".tiff";
  save(imageName);
  console.log("Saved : "+imageName);
}
