window.addEventListener("keydown", (event) => {
  if (player.preventInput) return;
  switch (event.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
	  // test comment v2
          player.hitBox.position.x + player.hitBox.width <=
            door.position.x + door.width &&
          player.hitBox.position.x >= door.position.x &&
          player.hitBox.position.y + player.hitBox.height >= door.position.y &&
          player.hitBox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
      if (player.velocity.y == 0) player.velocity.y = -25;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
