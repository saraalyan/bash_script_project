import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navbb(){

return <>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item"><Link className="nav-link" to="/">home</Link> </li>
      <li className="nav-item"><Link className="nav-link" to="/register">register</Link> </li>
      <li className="nav-item"><Link className="nav-link" to="/login">login</Link> </li>
      <li className="nav-item"><Link className="nav-link" to="/Portfolio">Portfolio</Link> </li>
      <li className="nav-item"><Link className="nav-link" to="/Movies">Movies</Link> </li>
      
    </ul>
    
  </div>
</nav>


</>

}
export default Navbb;
