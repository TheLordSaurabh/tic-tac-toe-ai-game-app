import "./Source.css";
function openTab() {
  window.open("https://github.com/TheLordSaurabh/tic-tac-toe-game");
}
export const Source = () => {
  openTab();
  window.location.href = "/";
  return <h3>Source Code Available on Next Tab </h3>;
}
