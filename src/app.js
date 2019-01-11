new Vue({
	el:'#app',
	data:{
		playerHealth:100,
		monsterHealth:100,
		gameRunning:false,
		turns:[]
	},
	methods:{
		startGame:function(){
			this.gameRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
		},
		attack:function(){
			var max=10;
			var min=3;
			var damage = this.calculateDamage(3, 10);
			
			this.monsterHealth -= damage;
			this.turns.unshift(
				{	isPlayer:true,
					text:"player attacked monster with " + damage}
				);
			if (this.checkWin()) 
			{return;}
			this.monsterAttack();
			
		},
		specialAttack:function(){
			var max=12;
			var min=5;
			var damage = this.calculateDamage(5, 12);
			
			this.monsterHealth -= damage;
			this.turns.unshift(
				{	isPlayer:true,
					text:"player attacked monster hard with " + damage}
				);
			if (this.checkWin()) 
			{return;}
			this.monsterAttack();
			
		},
		heal:function(){
			
			if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
           	this.turns.unshift(
				{	isPlayer:true,
					text:"player heals by 10"}
				);
            this.monsterAttack();

		},
		giveUp: function () {
            this.gameRunning = false;
            this.turns = [];
        },
		calculateDamage:function(min, max){
			return Math.max(Math.floor(Math.random()*max)+1, min);
		},
		monsterAttack:function(){
			var damage = this.calculateDamage(5,10);
			this.playerHealth -= damage;
			this.turns.unshift(
				{	isPlayer:false,
					text:"monster attacked player with " + damage}
				);
		},
		checkWin(){
			if(this.monsterAttack<=0)
			{
				if(confirm("You Won, New Game!"))
					this.startGame();
				else
					this.gameRunning = false;
				this.turns = [];
				return true;
			}
			else if(this.playerHealth<=0){
				if(confirm("You Loose, New Game!"))
					this.startGame();
				else
					this.gameRunning = false;
				this.turns = [];
				return true;
			}
			return false;
		}
	}



});