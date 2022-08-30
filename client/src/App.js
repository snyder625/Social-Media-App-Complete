import "./App.css"
import Home from "../src/Pages/Home/Home";
import Profile from '../src/Pages/Profile/Profile'
import Auth from '../src/Pages/Auth/Auth'

function App() {
  return (
    <div className="App">
        <div className="blur" style={{ top: '-18%', right:'0'}}></div>
        <div className="blur" style={{ top: '36%', left:'-8 rem'}}></div>
        {/*<Home />*/}
        {/* <Profile /> */}
        <Auth />
    </div>
  );
}

export default App;
