const root = document.querySelector('#cartographer-v1-root');
const text = document.createTextNode('Hello World!');
const span = document.createElement('span').appendChild(text);

if (root) {
  root.appendChild(span);
}
