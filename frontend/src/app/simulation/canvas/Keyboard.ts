const keys_pushed = new Set();

window.addEventListener('keydown', (e) => {
  keys_pushed.add(e.key);
});

window.addEventListener('keyup', (e) => {
  keys_pushed.delete(e.key);
});

const Keyboard = {
  keys_pushed,
};

export default Keyboard;
