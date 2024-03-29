window.addEventListener('load', function () {
    //canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if (((e.key === 'ArrowUp') ||
                    (e.key === 'ArrowDown') ||
                    (e.key === 'ArrowLeft') ||
                    (e.key === 'ArrowRight')
                ) && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key);
                }
                else if (e.key === ' ') {
                    this.game.player.shootTop();
                }
                else if (e.key === 'b') {
                    this.game.player.shootBottom();
                }
                console.log(this.game.keys);
            });
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
                console.log(this.game.keys);
            }
            );
        }

    }
    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 5;
            this.markedForDeletion = false;
        }
        update() {
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }
        draw(context) {
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    class Particle {

    }
    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.speedX = 0;
            this.maxSpeed = 2;
            this.projectiles = [];
        }
        update() {
            // Handle movement
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
            else this.speedX = 0;
            this.x += this.speedX;
            // Handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            })
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

        }
        draw(context) {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
            this, this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop() {
            if (this.game.ammo >= 1) {
                this.projectiles.push(new Projectile(this.game, this.x, this.y));
                this.game.ammo --;
                console.log(this.game.ammo);
            }
        }
        shootBottom() {
            if (this.game.ammo >= 1 ) {
                this.projectiles.push(new Projectile(this.game, this.x, this.y + 120));
                this.game.ammo --;
            }
        }
    }
    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.sppedX = Math.random() * -1.5 - 0.5;
            this.markedForDeletion = false;
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class EnemyTypeOne extends Enemy{
        constructor(game){
            super(game);
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
        }
    }

    class Layer {

    }
    class Background {

    }
    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }
        draw(context){
            //ammo 
            context.fill = this.color;
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
        }

    }
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);  //this refers to Game Class
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.ammo = 10;
            this.maxAmmo = 25;
            this.ammoTimer = 0;
            this.ammoInterval = 94500;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.enemies = [];
            this.gameOver = false;
        }

        update(deltaTime) {
            this.player.update();
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update();
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            console.log(this.enemies);

        }
        draw(context) {
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            });
            
        }
        addEnemy(){
            this.enemies.push(new EnemyTypeOne(this));
        }
    }
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    // animation loop
    animate = (timeStamp) => {   // requestAnimationFrame automatically passes TimeStamp to the function it calls
        const deltaTime = timeStamp - lastTime;
        lastTime = deltaTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);

});
