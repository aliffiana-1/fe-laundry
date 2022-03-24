import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import LoginOwner from './pages/LoginOwner';
import Outlet from './pages/Outlet';
import Paket from './pages/Paket';
import Transaksi from './pages/Transaksi';
import Login from './pages/Login';
import LoggedAs from './pages/LoggedAs';


import OwnerDashboard from './pages/OwnerSite/Dashboard';
import OwnerAdmin from './pages/OwnerSite/Petugas';
import OwnerOutlet from './pages/OwnerSite/Outlet';


function App() {
  return (
    <div>
      <Switch>
        {/* ADMIN SITE */}
        <Route exact path="/" component={Dashboard} />
        <Route path="/loginAdmin" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/loginowner" component={LoginOwner} />
        <Route path="/outlet" component={Outlet} />
        <Route path="/paket" component={Paket} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/loggedAs" component={LoggedAs} />
        

        {/* OWNER SITE */}
        <Route path="/OwnerDashboard" component={OwnerDashboard} />
        <Route path="/OwnerAdmin" component={OwnerAdmin} />
        <Route path="/OwnerOutlet" component={OwnerOutlet} />
      </Switch>
      
    </div>
  );
}

export default App;
