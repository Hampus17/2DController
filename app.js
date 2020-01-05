// Hampus Andersson 01/05/2020

let ctx, controller, rect, info;

ctx = document.querySelector('#canvas').getContext('2d');

ctx.canvas.height = 360; // Y
ctx.canvas.width = 720; // X

rect = {

    height: 32, 
    width: 32, 
    jumping: false,
    x: 330,
    y: 0, 
    x_vel: 0,
    y_vel: 0

};

controller = {

    left: false,
    right: false,
    up: false,

    keyListener: function(e) {

        let key_state = (e.type == "keydown") ? true : false; // Checks if a key is down and returns true or false

        switch(e.keyCode) {

            case 37: // Left key
                controller.left = key_state;
                break;
            case 65: // A key
                controller.left = key_state;
                break;
            case 38: // Up key
                controller.up = key_state;
                break;
             case 87: // W key
                controller.up = key_state;
                break;
            case 39: // Right key
                controller.right = key_state;
                break;
            case 68: // D key
                controller.right = key_state;
                break;
        }
    }
};

loop = function() {
    if (controller.up && rect.jumping == false) {
        rect.y_vel -= 22;
        rect.jumping = true;
    }

    if (controller.left) {
        rect.x_vel -= 0.9;
    }

    if (controller.right) {
        rect.x_vel += 0.9;
    }

    // Gravity
    rect.y_vel += 1.5; 
    // Friction
    rect.x_vel *= 0.9; 
    rect.y_vel *= 0.9

    rect.x += rect.x_vel;
    rect.y += rect.y_vel;

    ctx.fillStyle = "#1f1e1d",
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ff0000";// hex for red
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
    ctx.strokeStyle = "#202830";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, 282);
    ctx.lineTo(720, 282);
    ctx.stroke();

    if (rect.y > ctx.canvas.height - rect.height - 84) {
        rect.y = ctx.canvas.height - rect.height - 84;
        rect.jumping = false;
        rect.y_vel = 0;
    }

    if (rect.x > ctx.canvas.width) {
        rect.x = -rect.width;
    } else if (rect.x < -rect.width) {
        rect.x = ctx.canvas.width - rect.width;
    }

    document.querySelector('#pos').innerHTML = `(X, Y): (${Math.floor(rect.x)}, ${Math.floor(rect.y)})`;
    document.querySelector('#xvel').innerHTML = `X_Velocity: ${Math.floor(rect.x_vel)}`;
    document.querySelector('#yvel').innerHTML = `Y_Velocity: ${Math.floor(rect.y_vel)}`;

    
    window.requestAnimationFrame(loop);

}


// Event listeners
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);

// Loop
window.requestAnimationFrame(loop);

