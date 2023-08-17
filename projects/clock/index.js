const draw = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.save();

    ctx.clearRect(0, 0, innerWidth, innerHeight);  
    ctx.translate(250, 250); //Move the origin from (0,0) to (250,250)
    
    //Numbers
    ctx.font = "20px Garamond";
    ctx.fillStyle = "#fff";
    ctx.fillText("12", -10, -221);
    ctx.fillText("3", 228, 5);
    ctx.fillText("6", -5, 235);
    ctx.fillText("9", -238, 5);

    ctx.rotate(-Math.PI / 2); //So the clock doesn't display upside down
    ctx.strokeStyle = "#000";

    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    //hours
    ctx.save();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(205, 0);
    ctx.stroke();
    ctx.restore();
    
    //minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(235, 0);
    ctx.stroke();
    ctx.restore();
    
    //seconds
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(235, 0);
    ctx.stroke();
    ctx.restore();

    //Outer Circle
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 6;
    ctx.arc(0, 0, 245, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    //Inner Circle
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    requestAnimationFrame(draw);
}

draw();