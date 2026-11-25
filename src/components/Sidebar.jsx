import logo from "../assets/focusflow-icon.svg";
import floral from "../assets/floral-decoration.png";
import { NavLink } from "react-router-dom";
function Sidebar(){
  return(
    <aside className="sidebar">
     
     {/*logo*/}
     <div className="logo-section">
      <img src={logo} alt="FocusFlow Logo"/>
      <h2>FocusFlow</h2>
      <p>Focus • Plan • Achieve</p>
     </div>

     {/*navigation*/}
     <nav className="sidebar-nav">

     <NavLink to="/" className="sidebar-link">
           <span className="material-symbols-outlined">
              home
          </span>
             Dashboard
         </NavLink>

      <NavLink to="/timer" className="sidebar-link">
            <span className="material-symbols-outlined">
            timer
          </span>
           Timer
      </NavLink>

      <NavLink to="/history" className="sidebar-link">
    <span className="material-symbols-outlined">
    history
   </span>
  History
</NavLink>

      <NavLink to="/settings" className="sidebar-link">
  <span className="material-symbols-outlined">
    settings
  </span>
  Settings
</NavLink>

     </nav>

     {/* Quote */}
      <div className="sidebar-quote">

  {/* Floral illustration */}
  <img
    src={floral}
    alt="Floral decoration"
    className="quote-floral"
  />

  <p>
    Small steps...
    <br />
    Big Results! ♡
  </p>

  <span className="quote-underline"></span>

</div>

    </aside>
  );
}
export default Sidebar;