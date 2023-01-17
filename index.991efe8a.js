class t{width=1768;x=0;y=0;constructor(t,e,s){this.game=t,this.image=e,this.speedModifier=s,this.height=this.game.height}update(){this.x<=-this.width?this.x=0:this.x-=this.game.speed*this.speedModifier}draw(){this.game.ctx.drawImage(this.image,this.x,this.y),this.game.ctx.drawImage(this.image,this.x+this.width,this.y)}}class e{layers=[];topLayers=[];constructor(e){this.game=e;const s=document.getElementById("layer1"),i=document.getElementById("layer2"),h=document.getElementById("layer3"),a=document.getElementById("layer4");this.layers=[new t(this.game,s,.2),new t(this.game,i,.4),new t(this.game,h,1)],this.topLayers=[new t(this.game,a,1.5)]}update(){this.layers.forEach((t=>t.update()))}postUpdate(){this.topLayers.forEach((t=>t.update()))}draw(){this.layers.forEach((t=>t.draw()))}postDraw(){this.topLayers.forEach((t=>t.draw()))}}class s{isMobile=navigator.userAgentData.mobile;controlKeys=["ArrowUp","ArrowDown"];shootKey=" ";constructor(t){this.game=t,this.isMobile?this.addMobileControl():this.addDesktopControl()}addMobileControl(){try{this.isMobile&&this.game.canvas.requestFullscreen()}catch(t){console.log(t)}window.addEventListener("touchstart",(t=>{console.log("start")})),document.addEventListener("touchmove",(t=>{const e=t.changedTouches[0].clientY,s=this.game.player.y+this.game.player.height/2;if(e<s&&!this.game.keys.includes("ArrowUp")){this.game.keys.push("ArrowUp");const t=this.game.keys.indexOf("ArrowDown");t>-1&&this.game.keys.splice(t,1)}else if(e>s&&!this.game.keys.includes("ArrowDown")){this.game.keys.push("ArrowDown");const t=this.game.keys.indexOf("ArrowUp");t>-1&&this.game.keys.splice(t,1)}})),window.addEventListener("touchend",(t=>{const e=this.game.keys.indexOf("ArrowUp"),s=this.game.keys.indexOf("ArrowDown");e>-1&&this.game.keys.splice(e,1),s>-1&&this.game.keys.splice(s,1)}))}addDesktopControl(){window.addEventListener("keydown",(t=>{this.controlKeys.includes(t.key)&&!this.game.keys.includes(t.key)&&this.game.keys.push(t.key),this.shootKey===t.key&&this.game.player.shoot(),"d"===t.key&&(this.game.debug=!this.game.debug)})),window.addEventListener("keyup",(t=>{const e=this.game.keys.indexOf(t.key);e>-1&&this.game.keys.splice(e,1)}))}}class i{updateSprite(){this.frameX<this.maxFrame?this.frameX++:this.frameX=0}draw(){this.game.ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height),this.game.debug&&(this.game.ctx.strokeRect(this.x,this.y,this.width,this.height),"lives"in this&&(this.game.ctx.fillStyle="black",this.game.ctx.font="20px Helvetica",this.game.ctx.fillText(this.lives.toString(),this.x,this.y)))}}class h{image=document.getElementById("gears");frameX=Math.floor(3*Math.random());frameY=Math.floor(3*Math.random());width=50;height=50;sizeModifier=parseFloat((.5*Math.random()+.5).toFixed(1));size=this.width*this.sizeModifier;speedX=6*Math.random()-3;speedY=-15*Math.random();gravity=.5;markedForDelete=!1;angle=0;angleVelocity=.2*Math.random()-.1;bounced=2;bottomBounceBorder=80*Math.random()+60;constructor(t,e,s){this.game=t,this.x=e,this.y=s}update(){this.angle+=this.angleVelocity,this.speedY+=this.gravity,this.x-=this.speedX+this.game.speed,this.y+=this.speedY,(this.y>this.game.height+this.size||this.x<0-this.size)&&(this.markedForDelete=!0),this.y>this.game.height-this.bottomBounceBorder&&this.bounced>0&&(this.bounced--,this.speedY*=-.5)}draw(){this.game.ctx.save(),this.game.ctx.translate(this.x,this.y),this.game.ctx.rotate(this.angle),this.game.ctx.drawImage(this.image,this.frameX*this.size,this.frameY*this.size,this.width,this.height,-.5*this.size,-.5*this.size,this.width,this.height),this.game.ctx.restore()}}class a extends i{frameX=0;frameY=0;height=200;timer=0;fps=30;interval=1e3/this.fps;markedForDelete=!1;constructor(t){super(),this.game=t}update(t){this.x-=this.game.speed,this.timer>this.interval?(this.frameX++,this.timer=0):this.timer+=t,this.frameX>this.maxFrame&&(this.markedForDelete=!0)}}class r extends a{image=document.getElementById("smoke");maxFrame=8;width=200;height=200;constructor(t,e,s){super(t),this.x=e,this.y=s}}class o extends a{image=document.getElementById("fire");maxFrame=8;width=200;height=200;constructor(t,e,s){super(t),this.x=e,this.y=s}}class m extends i{markedForDelete=!1;frameX=0;constructor(t){super(),this.game=t,this.x=t.width,this.speedX=-1.5*Math.random()-.5}update(){this.x+=this.speedX-this.game.speed,this.x+this.width<0&&(this.markedForDelete=!0),this.updateSprite()}takeHit(){this.lives--,this.game.particles.push(new h(this.game,this.x+.5*this.width,this.y+.5*this.height))}kill(){this.markedForDelete=!0;const t=[o,r],e=t[Math.floor(Math.random()*t.length)];this.game.explosions.push(new e(this.game,this.x,this.y));for(let t=0;t<this.score;t++)this.game.particles.push(new h(this.game,this.x+.5*this.width,this.y+.5*this.height))}touch(){this.game.gameOver||(this.game.score-=this.score),this.kill()}}class n extends m{width=228;height=169;score=2;lives=2;image=document.getElementById("angler1");frameY=Math.floor(3*Math.random());maxFrame=37;type="angler1";constructor(t){super(t),this.y=Math.random()*(.95*t.height-this.height)}}class d extends m{width=213;height=165;score=3;lives=3;image=document.getElementById("angler2");frameY=Math.floor(2*Math.random());maxFrame=37;type="angler2";constructor(t){super(t),this.y=Math.random()*(.95*t.height-this.height)}}class l extends m{width=99;height=95;score=0;lives=3;image=document.getElementById("lucky");frameY=Math.floor(2*Math.random());maxFrame=37;type="lucky";constructor(t){super(t),this.y=Math.random()*(.9*t.height-this.height)}touch(){this.game.player.onTurbo(),this.kill()}}class g{width=10;height=3;speed=3;markForDelete=!1;image=document.getElementById("bullet");constructor(t,e,s){this.game=t,this.x=e,this.y=s}update(){this.x+=this.speed,this.width>.8*this.game.width&&(this.markForDelete=!0)}draw(){this.game.ctx.drawImage(this.image,this.x,this.y)}}class c extends i{width=120;height=190;x=20;y=100;frameX=0;frameY=0;maxFrame=37;speedY=0;maxSpeed=3;image=document.getElementById("player");turbo=!1;turboTimer=0;turboLimit=5e3;constructor(t){super(),this.game=t}update(t){this.game.keys.includes("ArrowUp")?this.speedY=-this.maxSpeed:this.game.keys.includes("ArrowDown")?this.speedY=this.maxSpeed:this.speedY=0,this.y+=this.speedY;const e=this.game.height-.5*this.height,s=.5*-this.height;this.y>e?this.y=e:this.y<s&&(this.y=s),this.game.bullets.forEach((t=>t.update())),this.game.bullets=this.game.bullets.filter((t=>!t.markForDelete)),this.updateSprite(),this.turbo&&(this.turboTimer>this.turboLimit?(this.turboTimer=0,this.turbo=!1,this.frameY=0):(this.turboTimer+=t,this.frameY=1,this.game.ammo+=.1))}shoot(){this.game.ammo>0&&(this.game.bullets.push(new g(this.game,this.x+90,this.y+33)),this.game.ammo--),this.turbo&&this.bottomShoot()}bottomShoot(){this.game.ammo>0&&(this.game.bullets.push(new g(this.game,this.x+90,this.y+175)),this.game.ammo--)}onTurbo(){this.turbo=!0,this.turboTimer=0,this.game.ammo<this.game.maxAmmo&&(this.game.ammo=this.game.maxAmmo)}}class u{fontSize=25;fontFamily="Bangers";color="yellow";constructor(t){this.game=t}draw(){const t=this.game.ctx;t.save(),t.font=this.fontSize+"px "+this.fontFamily,t.fillStyle="white",t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowColor="black",t.fillText("Score: "+this.game.score,20,40),t.fillStyle=this.game.player.turbo?this.color:"white";for(let e=0;e<this.game.ammo;e++)t.fillRect(20+5*e,50,3,20);t.fillStyle="white";const e=(.001*this.game.gameTime).toFixed(1);if(t.fillText("Time left: "+e,20,100),this.game.gameOver){t.textAlign="center";let e="You Lost!",s="Try Again Next Time!";this.game.winningScore<this.game.score&&(e="You Win!",s="Well Done!"),t.fillStyle="white",t.font="58px "+this.fontFamily,t.fillText(e,.5*this.game.width,.5*this.game.height-30),t.font="25px "+this.fontFamily,t.fillText(s,.5*this.game.width,.5*this.game.height+30)}t.restore()}}class y extends m{width=115;height=95;score=3;lives=3;image=document.getElementById("drone");frameY=Math.floor(2*Math.random());maxFrame=39;type="drone";speedX=-4.2*Math.random()-.5;constructor(t,e,s){super(t),this.x=e,this.y=s}}class p extends m{width=400;height=227;score=15;lives=15;image=document.getElementById("hivewhale");frameY=0;maxFrame=37;type="hive";speedX=-1.2*Math.random()-.2;constructor(t){super(t),this.y=Math.random()*(.95*t.height-this.height)}kill(){this.markedForDelete=!0;for(let t=0;t<this.score;t++)this.game.particles.push(new h(this.game,this.x+.5*this.width,this.y+.5*this.height));for(let t=0;t<5;t++){const t=new y(this.game,this.x+Math.random()*this.width,this.y+Math.random()*this.height*.5);this.game.enemies.push(t)}}}const w=new class{width=1024;height=500;score=0;keys=[];enemies=[];particles=[];explosions=[];bullets=[];debug=!1;gameTime=6e4;speed=1;ammo=20;maxAmmo=50;ammoTimer=0;ammoInterval=500;enemyInterval=1500;enemyTimer=0;winningScore=100;gameOver=!1;constructor(){this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.width,this.canvas.height=this.height,this.player=new c(this),this.control=new s(this),this.ui=new u(this),this.background=new e(this)}update(t){this.gameOver||(this.gameTime-=t),this.gameTime<0&&(this.gameOver=!0),this.ctx.fillStyle="#4d79bc",this.ctx.fillRect(0,0,this.width,this.height),this.background.update(),this.player.update(t),this.ammoTimer>this.ammoInterval?(this.ammo<this.maxAmmo&&this.ammo++,this.ammoTimer=0):this.ammoTimer+=t,this.enemies.forEach((t=>{t.update(),this.checkCollistions(this.player,t)&&(t.touch(),this.score<0&&(this.gameOver=!0)),this.bullets.forEach((e=>{this.checkCollistions(e,t)&&(t.takeHit(),t.lives<=0&&(t.kill(),this.gameOver||(this.score+=t.score),this.winningScore<this.score&&(this.gameOver=!0)),e.markForDelete=!0)}))})),this.enemies=this.enemies.filter((t=>!t.markedForDelete)),this.enemyTimer>this.enemyInterval&&!this.gameOver?(this.addEnemy(),this.enemyTimer=0):this.enemyTimer+=t,this.particles.forEach((t=>t.update())),this.particles=this.particles.filter((t=>!t.markedForDelete)),this.explosions.forEach((e=>e.update(t))),this.explosions=this.explosions.filter((t=>!t.markedForDelete)),this.background.postUpdate()}draw(){this.background.draw(),this.player.draw(),this.bullets.forEach((t=>t.draw())),this.enemies.forEach((t=>t.draw())),this.particles.forEach((t=>t.draw())),this.explosions.forEach((t=>t.draw())),this.ui.draw(),this.background.postDraw()}addEnemy(){const t=[l,n,d,p],e=t[Math.floor(Math.random()*t.length)];this.enemies.push(new e(this))}checkCollistions(t,e){return t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y}};let x=0;!function t(e){const s=e-x;x=e,w.update(s),w.draw(),requestAnimationFrame(t)}(0);
//# sourceMappingURL=index.991efe8a.js.map