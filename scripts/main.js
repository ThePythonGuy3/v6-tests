const weather1 = extendContent(Weather, "electric-storm", {
	load(){
        this.super$load();
        this.region = Core.atlas.find("circle-shadow");
    },
	drawOver(state){
		try{
			var yspeed = 2;
			var xspeed = 0.25;
			var padding = 16;
			var size = 12;
			var density = 1200;
			var rand = new Rand(0);
			Tmp.r1.setCentered(Core.camera.position.x, Core.camera.position.y, Core.graphics.getWidth() / Vars.renderer.minScale(), Core.graphics.getHeight() / Vars.renderer.minScale());
			Tmp.r1.grow(padding);
			Core.camera.bounds(Tmp.r2);
			var total = Tmp.r1.area() / density * state.intensity;
			for(var i = 0; i < total; i++){
				var scl = rand.random(0.5, 1);
				var scl2 = rand.random(0.5, 1);
				var sscl = rand.random(0.2, 1);
				var x = (rand.random(0, Vars.world.unitWidth()) + Time.time() * xspeed * scl2);
				var y = (rand.random(0, Vars.world.unitHeight()) - Time.time() * yspeed * scl);

				x += Mathf.sin(y, rand.random(30, 80), rand.random(1, 7));

				x -= Tmp.r1.x;
				y -= Tmp.r1.y;
				x = Mathf.mod(x, Tmp.r1.width);
				y = Mathf.mod(y, Tmp.r1.height);
				x += Tmp.r1.x;
				y += Tmp.r1.y;

				if(Tmp.r3.setCentered(x, y, size * sscl).overlaps(Tmp.r2)){
					Draw.rect(this.region, x, y, size * sscl, size * sscl);
				}
			}
		}catch(err){
			print(err);
		}
	}
});

this.global.customWth = [weather1];