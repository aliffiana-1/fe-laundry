import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Owner from './pages/Owner';
import Outlet from './pages/Outlet';
import Paket from './pages/Paket';
import Transaksi from './pages/Transaksi';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/owner" component={Owner} />
        <Route path="/outlet" component={Outlet} />
        <Route path="/paket" component={Paket} />
        <Route path="/transaksi" component={Transaksi} />
        
      </Switch>
      
    </div>
  );
}

export default App;
