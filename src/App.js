import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import store from './configStore';
import HomePage from './view/HomePage/HomePage';
import Profile from './view/Profile/Profile';

function App() {
  
  return (
    <Router>
   
<Switch>
  <Route exact path ="/" component={HomePage} />
  <Route path="/profile" component={Profile}/>
</Switch>


    </Router>
       
  );
}

export default App;
