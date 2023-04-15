import "./Source.css";
function openTab() {
  window.open("https://github.com/TheLordSaurabh/tic-tac-toe-ai-game-app");
}
export const Source = () => {
  openTab();
  window.location.href = "/home";
  return <h3>Source Code Available on Next Tab </h3>;
}
