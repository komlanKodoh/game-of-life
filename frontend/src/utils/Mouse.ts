
const Mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
  Mouse.x = e.clientX;
  Mouse.y = e.clientY;
});


export default Mouse;
