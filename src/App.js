import React from "react";
import "./App.css";
import {Home} from "./pages/Home";
import {Source} from "./pages/Source";
import {About} from "./pages/About";
import {Developer} from "./pages/Developer";
import {Nav} from "./pages/Nav";
import {Foot} from "./pages/Foot"


import {
  Routes,
  Route,
} from "react-router-dom";


// function Users() {
//   return (
//     <div>
//       <nav>
//         <Link to="me">My Profile</Link>
//       </nav>

//       <Outlet />
//     </div>
//   );
// }

//
// <BrowserRouter>
// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="users" element={<Users />}>
//     <Route path="me" element={<OwnUserProfile />} />
//     <Route path=":id" element={<UserProfile />} />
//   </Route>
// </Routes>
// </BrowserRouter>

//          <Route path="*" component={PageNotFound} />

const App = () => {
  return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element ={<Home />} />
          <Route path="/source-code" element={<Source />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
        <Foot/>
      </div>
  );
}

export default App;
