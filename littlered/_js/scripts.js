//Variables
var maxInv =		13;
var health = 	100;
var maxHealth = 	100;
var time = 		0;
var maxTime = 	7;
var days = 		1;
var maxDays = 	5;
var attack = 	25;
var sceneCnt = 	0;
var numScenes =	10;
var menuOpen = 	false;
var win = 		false;
var wolfhealth=	60;
var wolfbase = 	60;

//Weapons
WoodenSword =	["WoodenSword", 50];
Knife =			["Knife", 75];
Axe =			["Axe", 95];
//Food
Apple =			["Apple", 25];
Mushrooms =		["Mushrooms", 25];
Frog =			["Frog",25];
Blueberries =	["Blueberries", 25];
//Other
Sticks =			["Sticks", 0];
BandAid =		["BandAid", 50];
Blank =			["Blank", 0];

//Inventory Array initialization
var inventory = [];

//Puts a Blank item into every slot in the inventory
function clearInv()
{
	for(i=0;i<=maxInv;i++)
	{
		inventory[i]=Blank;
	}
	checkTime();
	updateInv();
}

//Goes through each item in the inventory and assigns them the appropriate image
function updateInv()
{
	for(i=0;i<=maxInv;i++)
	{
		var imagename = "item_"+(i+1);
		var image = document.getElementById(imagename);
		var itemname = inventory[i][0];
		image.src = "images/item_"+itemname.toLowerCase()+".png";
		image.alt = itemname;
	}
}

function addItem(name,iclass)
{
	//Name of item passed in
	this.name = name;
	//Div class name passed in
	this.iclass = iclass;
	newatt = attack;
	
	//If item is a blank, just say found nothing
	if(this.name=="Blank")
	{
		popAlert("found","nothing");
		time++;
	}
	//If you have found an item other than Blank
	else
	{
		//Loop through entire inventory
		for(i=0;i<=maxInv;i++)
		{
			//Find first blank spot
			if(inventory[i][0]==Blank[0])
			{
				//If found a weapon
				if(this.name=="Axe"||this.name=="Knife"||this.name=="WoodenSword")
				{
					//Save index of blank inventory
					wep = i;
					newatt = 0;
					//Set new attack value
					if (this.name=="Axe"){newatt=95;}
					else if (this.name=="Knife"){newatt=75;}
					else if (this.name=="WoodenSword"){newatt=50;}
					//See if new attack value is greater than what you have currently
					//If new attack is greater
					if (newatt>attack)
					{
						//Find the lesser weapon in the inventory
						for(i=0;i<=maxInv;i++)
						{
							if (inventory[i][0]=="Knife"||inventory[i][0]=="WoodenSword")
							{
								//save weapon index
								wep = i;
							}
						}
						popAlert("found",this.name);
						//Convert name of item into a variable
						inventory[wep]=eval(this.name);
						time++;
						//set attack to the new weapon's attack
						attack = newatt;
						break;
					}
					//If you found a weapon you already have
					else if (newatt==attack)
					{
						if (newatt==WoodenSword[1]){
							popAlert("haveone","sword");	
						}
						else if (newatt==Knife[1]){
							popAlert("haveone","knife");
						}
						else if (new att==Axe[1]){
							popAlert("haveone","axe");
						}
						time++;
						break;
					}
					//If you found a lesser weapon
					else if (newatt<attack)
					{
						if (newatt==WoodenSword[1]){
							popAlert("havebetter","sword");	
						}
						else if (newatt==Knife[1]){
							popAlert("havebetter","knife");
						}
						time++;
						break;
					}
				}
				//If you found an item other than a weapon
				else
				{
					//convert name of item into a variable
					inventory[i]=eval(this.name);
					popAlert("found",this.name);
					//If the item is not a band-aid(every other item is an on screen item and we must hide it)
					if (this.name!="BandAid")
					{
						//Find the HTML element with the class name of iclass(passed in variable)
						var element = document.getElementsByClassName(iclass);
						//Hide it
						element[0].style.visibility="hidden";
					}
					time++;
					break;
				}
			}
		}
	}
	updateInv();
	checkTime();
}

function dropItem(name)
{
	//Passed in name of item
	this.name = name;
	
	//Look through entire inventory for first instance of that name
	for(i=0;i<=maxInv;i++)
	{
		if(inventory[i][0]==this.name)
		{
			//Cut out the ittem found from the inventory
			inventory.splice(i,1);
			//Put a blank item on the end
			inventory.push(Blank);
			popAlert("drop",this.name);
			break;
		}
	}
	closeMenu();
	updateInv();
}


function useItem(name)
{
	//Gets name passed in
	this.name = name
	//Turns it into a variable
	temp = eval(this.name)
	
	//Finds first occurance of that item
	for(i=0;i<=maxInv;i++)
	{
		if(inventory[i][0]==this.name)
		{
			//Adds that item's value onto health
			health = health + temp[1];
			//If health is too high, set it back to 100
			if (health>100)
			{
				health = 100;
			}
			healthpercent = health / maxHealth;
			
			//Remove that item from the array
			inventory.splice(i,1);
			//Push a blank on the end
			inventory.push(Blank);
			popAlert("used",this.name);
			time++;
			break;
		}
	}
	//close the open menu
	closeMenu();
	//update time
	checkTime();
	//update inventory
	updateInv();
	//update the health bar to reflect new health
	checkHealth();
}

function getWep(){
	var name;
	if (attack==WoodenSword[1]){
		name = "sword";	
	}
	else if (attack==Knife[1]){
		name = "knife";
	}
	else if (attack==Axe[1]){
		name = "axe";
	}
	else{
		name = "none"
	}
	return name;
}

//Checks to see if a new day has passed, if so alert, reset time, add a day, call checkDay, decrease health, call checkHealth
//Then sets the clock image to the appropriate one
function checkTime()
{
	if(time>=maxTime)
	{
		popAlert("forgot","fire");
		time = 0;
		days++;
		checkDay();
		health = health - 50;
		checkHealth();
	}
	var imagename = "images/clock_"+time+".png";
	var clockname = "clock";
	var duck = document.getElementById(clockname);
	duck.src = "images/clock_"+time+".png";
}


function searchThing()
{
	chance = Math.floor((Math.random()*100)+1);
	if(chance<20) {addItem("BandAid");}
	else if(chance>=20&&chance<50) {addItem("Blank");}
	else if(chance>=50&&chance<75) {addItem("WoodenSword");}
	else if(chance>=75&&chance<95) {addItem("Knife");}
	else if(chance>=95) {addItem("Axe");};

}

function arrow()
{
	time++;
	checkTime();
	if(time!=-2){nextScene();}
}

//Changes the day text to current day then checks to see if too many days have passed, if so reset game
function checkDay()
{
	var daycnt = document.getElementsByClassName("clock")[0].getElementsByTagName('p')[0];
	daycnt.innerHTML = "Day "+days;
	if (days>maxDays)
	{
		restartGame();
		element = document.getElementById("scene_background");
		element.src="images/gameover.png";
		element = document.getElementsByClassName("playButton")[0];
		element.style.visibility = "visible";
	}
}

function wolfAttack(num)
{
	health = health - 25;
	chance = Math.floor((Math.random()*100)+1);
	scenename = "scene"+num+"_wolf"
	if(chance<attack)
	{
		popAlert("success","wolf");
		element = document.getElementsByClassName(scenename)[0];
		element.style.visibility = "hidden"
		win = true;
	}
	else
	{
		wolfSlash();
		setTimeout(function() {	
			health = health - 25;
			popAlert("failed","wolf");
			element = document.getElementsByClassName(scenename)[0];
			element.style.visibility = "hidden"
			win = false;
			checkHealth();
		},900);
	}
	checkHealth();
}

function wolfSlash()
{
	element = document.getElementById("slash_attack");
	element.style.visibility = "visible";
	element.src="images/wolf_slash.gif";
	setTimeout(function() {
		element = document.getElementById("slash_attack");
		element.style.visibility = "hidden";
		element.src="";},1800);
}

//If health less than 0, retart game. Else change the width of health bar to appropriate value
function checkHealth()
{
	if (health<=0)
	{
		setTimeout(function() {gameOver()},2000);
	}
	if (health==100)
	{
		document.getElementsByClassName("healthBar_fill")[0].style.width = "200px";
	}
	else if (health==75)
	{
		document.getElementsByClassName("healthBar_fill")[0].style.width = "150px";
	}
	else if (health==50)
	{
		document.getElementsByClassName("healthBar_fill")[0].style.width = "100px";
	}
	else if (health==25)
	{
		document.getElementsByClassName("healthBar_fill")[0].style.width = "50px";
	}
}

function gameOver(){
	restartGame();
	element = document.getElementById("scene_background");
	element.src="images/gameover.png";
	element = document.getElementsByClassName("playButton")[0];
	element.style.visibility = "visible";
}

function makeFire(num)
{
	closeMenu();
	element = document.getElementsByClassName("buildfire")[0];
	element.style.visibility = "visible";
	setTimeout(function() {hideFire()},2000);
	time = 0;
	days++;
	checkDay();
	checkTime();
	health = health - 25;
	checkHealth();
	inventory.splice(num,1);
	inventory.push(Blank);
	updateInv();
}

function hideFire()
{
	element = document.getElementsByClassName("buildfire")[0];
	element.style.visibility = "hidden";
}

function popMenu(num)
{
	if (inventory[num-1][0]=="Blank"||inventory[num-1][0]=="Axe"||inventory[num-1][0]=="Knife"||inventory[num-1][0]=="WoodenSword")
	{
	}
	else if (!menuOpen)
	{
		width = 124 + 43*num;
		name = inventory[num-1][0];
		element = document.getElementsByClassName("menu")[0];
		element.style.visibility="visible";
		element.style.left=width+"px";
		element = document.getElementsByClassName("menu_use")[0];
		element.style.visibility="visible";
		if (name=="Sticks")
		{
			element.onclick = function() { makeFire(num-1); }
		}
		else
		{
			element.onclick = function() { useItem(name); }
		}
		element = document.getElementsByClassName("menu_drop")[0];
		element.style.visibility="visible";
		element.onclick = function() { dropItem(name); }
		menuOpen = true;
	}
	else if (menuOpen)
	{
		closeMenu();
	}
}

function closeMenu()
{
	element = document.getElementsByClassName("menu")[0];
	element.style.visibility="hidden";
	element = document.getElementsByClassName("menu_use")[0];
	element.style.visibility="hidden";
	element = document.getElementsByClassName("menu_drop")[0];
	element.style.visibility="hidden";
	menuOpen = false;
}

function popAlert(action,thing)
{
	var img_name = "images/alert/"+action+"_"+thing+"_alert.png";
	element = document.getElementById("alert");
	element.src = img_name;
	element.style.visibility = "visible";
	setTimeout(function() {killAlert()},2000);
}

function killAlert()
{
	element = document.getElementById("alert");
	element.style.visibility = "hidden";
}

function checkWin()
{
	if (win)
	{
		restartGame();
		element = document.getElementById("scene_background");
		element.src="images/gamewon.png";
		element = document.getElementsByClassName("playButton")[0];
		element.style.visibility = "visible";
	}
	else if (!win)
	{
		restartGame();
		element = document.getElementById("scene_background");
		element.src="images/gameover.png";
		element = document.getElementsByClassName("playButton")[0];
		element.style.visibility = "visible";
	}
}

function nextScene()
{
	sceneCnt++;
	if (sceneCnt==1)
	{
		element = document.getElementsByClassName("playButton")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/intro1.png";
		element = document.getElementById("arrow");
		element.style.visibility="visible";
	}
	else if (sceneCnt==2)
	{
		element = document.getElementById("scene_background");
		element.src="images/intro2.png";
	}
	else if (sceneCnt==3)
	{
		element = document.getElementById("scene_background");
		element.src="images/scene1.png";
		document.getElementsByClassName("arrow")[0].onclick = function() { arrow(); }
		element = document.getElementsByClassName("healthBar_empty")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("healthBar_fill")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("inventory")[0];
		element.style.visibility="visible";
		for (i=0;i<=maxInv;i++)
		{
			element = document.getElementsByClassName("item")[i];
			element.style.visibility="visible";
		}
		element = document.getElementsByClassName("littlered")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("clock")[0];
		element.style.visibility="visible";
		element = document.getElementById("clock");
		element.style.visibility="visible";
		element.src="images/clock_0.png";
		element = document.getElementsByClassName("clock")[0].getElementsByTagName('p')[0];
		element.style.visibility="visible";
		element.innerHTML = "Day "+days;
		element = document.getElementsByClassName("scene1_bushes")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene1_sticks")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene1_apple1")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene1_apple2")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==4)
	{
		element = document.getElementsByClassName("scene1_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_apple1")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_apple2")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene2.png";
		element = document.getElementsByClassName("scene2_bushes")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene2_frog")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==5)
	{
		element = document.getElementsByClassName("scene2_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene2_frog")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene3.png";
		element = document.getElementsByClassName("scene3_apple")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene3_sticks")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==6)
	{
		element = document.getElementById("arrow");
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene3_apple")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene3_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene4.png";
		element = document.getElementsByClassName("scene4_wolf")[0];
		element.style.visibility="visible";
		var img_src = 'url(images/'+getWep()+'_nobackground.png), auto';
		document.body.style.cursor = img_src;
		document.getElementsByClassName("scene4_wolf")[0].onclick = function() { clickAttack(); };
	}
	else if (sceneCnt==7)
	{
		element = document.getElementsByClassName("scene4_wolf")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene5.png";
		element = document.getElementsByClassName("scene5_mushrooms")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene5_sticks")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==8)
	{
		element = document.getElementsByClassName("scene5_mushrooms")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene5_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene6.png";
		element = document.getElementsByClassName("scene6_frog")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==9)
	{
		element = document.getElementById("arrow");
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene6_frog")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene7.png";
		element = document.getElementsByClassName("scene7_mushrooms")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene7_sticks")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene7_wolf")[0];
		element.style.visibility="visible";
		var img_src = 'url(images/'+getWep()+'_nobackground.png), auto';
		document.body.style.cursor = img_src;
		document.getElementsByClassName("scene7_wolf")[0].onclick = function() { clickAttack(); }
	}
	else if (sceneCnt==10)
	{
		element = document.getElementsByClassName("scene7_mushrooms")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene7_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene7_wolf")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene8.png";
		element = document.getElementsByClassName("scene8_bushes")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==11)
	{
		element = document.getElementsByClassName("scene8_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene9.png";
		element = document.getElementsByClassName("scene9_bluebushes")[0];
		element.style.visibility="visible";
		element = document.getElementsByClassName("scene9_sticks")[0];
		element.style.visibility="visible";
	}
	else if (sceneCnt==12)
	{
		element = document.getElementsByClassName("scene9_bluebushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene9_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementById("scene_background");
		element.src="images/scene10.png";
		element = document.getElementById("arrow");
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene10_wolf")[0];
		element.style.visibility="visible";
		var img_src = 'url(images/'+getWep()+'_nobackground.png), auto';
		document.body.style.cursor = img_src;
		document.getElementsByClassName("scene10_wolf")[0].onclick = function() { clickAttack(); }
		setTimeout(function() {checkWin()},2500);
	}
	
	if (sceneCnt==6||sceneCnt==9||sceneCnt==12)
	{
		wolfSlash();
		setTimeout(function() {checkWolfAttack(sceneCnt-2)},1800);
	}
}

function hideAll()
{
		element = document.getElementsByClassName("healthBar_empty")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("healthBar_fill")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("inventory")[0];
		element.style.visibility="hidden";
		for (i=0;i<=maxInv;i++)
		{
			element = document.getElementsByClassName("item")[i];
			element.style.visibility="hidden";
		}
		element = document.getElementsByClassName("littlered")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("clock")[0];
		element.style.visibility="hidden";
		element = document.getElementById("clock");
		element.style.visibility="hidden";
		element = document.getElementsByClassName("clock")[0].getElementsByTagName('p')[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_apple1")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene1_apple2")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene2_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene2_frog")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene3_apple")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene3_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene4_wolf")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene5_mushrooms")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene5_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene6_frog")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene7_mushrooms")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene7_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene7_wolf")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene8_bushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene9_bluebushes")[0];
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene9_sticks")[0];
		element.style.visibility="hidden";
		element = document.getElementById("arrow");
		element.style.visibility="hidden";
		element = document.getElementsByClassName("scene10_wolf")[0];
		element.style.visibility="hidden";
}

function restartGame()
{
	hideAll();
	clearInv();
	health = 	100;
	checkHealth();
	time = 		-2;
	days = 		1;
	attack = 	15;
	sceneCnt = 	0;
	menuOpen = 	false;
	win = 		false;
	attclicks = 	0;
	wolfhealth=	60;
	wolfbase = 	60;
}






//SUPER SECRET--------------------------------------------------------------------
function clickAttack()
{
	chance = Math.floor((Math.random()*100)+1);
	if(chance<attack)
	{
		wolfhealth = wolfhealth - 10;
	}
	else
	{
	}
}

function checkWolfAttack(num)
{
	scenename = "scene"+num+"_wolf";
	element = document.getElementsByClassName(scenename)[0];
	element.style.visibility = "hidden";
	scenename = scenename+"_blood";
	element = document.getElementsByClassName(scenename)[0];
	if(wolfhealth>wolfbase/2)
	{
		popAlert("failed","wolf");
		health = health - 50;
		checkHealth();
		win = false;
	}
	else if(wolfhealth>0)
	{
		element.style.visibility = "visible";
		popAlert("gotaway","wolf");
		health = health - 25;
		checkHealth();
		win = false;
	}
	else
	{
		element.style.visibility = "visible";
		element.className += element.className ? ' spin_out' : 'spin_out';
		popAlert("success","wolf");
		win = true;
	}
	wolfbase = wolfbase + 20;
	wolfhealth = wolfbase;
	element = document.getElementsByClassName(scenename)[0];
	element.style.visibility = "hidden";
	element = document.getElementById("arrow");
	element.style.visibility="visible";
	document.body.style.cursor = 'auto';
}