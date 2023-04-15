import "./Source.css";
import {Navigate} from 'react-router-dom';
function openTab() {
  window.open("https://github.com/TheLordSaurabh/tic-tac-toe-ai-game-app");
}
export const Source = () => {
  openTab();
  return <Navigate to="/home" replace />;
}
