
import './App.css';
import Home from './components/HomeDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DairyDataTable from './components/UserDashboard';
import ProductDashboard from './components/ProductDashboard';
import MainSpinDashboard from './components/MainDashboard';
import AllUsers from './components/AllUsers';
import TransactionTable from './components/TransactionTable';
import ApprovedTransaction from './components/ApprovedTransation';
import WeeklyTransactionTable from './components/WeeklyTransaction';
import DailyTransactionTable from './components/DailyTransaction';
import PendingTransaction from './components/PendingTransaction';
import LastUsers from './components/WeeklyUsers';
import ColorRajaDashboard from './components/ColorRajaDashboard';
import DragonTigerDashboard from './components/DragonTigerDashboard';
import HistoryTrans from './components/HistoryTrans';
import UPIManager from './components/GetUpi';
import ColorEntry from './components/ColorEntry';
import DragonEntry from './components/DragonEntry';
import WinDragonEntry from './components/WinningDragonEntry';
import WinSpinEntry from './components/WinSpinEntry';
import LuckyEntry from './components/SpinEntry';
import WinColorEntry from './components/winColorEntry';
import AviatorEntry from './components/AviatorEntry';
import WinAviatorEntry from './components/WinAviatorEntry';
import BannerManager from './components/GetBanner';
import ReferredDetails from './components/ReferredDetails';
import DepositTable from './components/DepositTransaction';
import WithdrawTable from './components/WithdrawTransaction';
import AviatorBets from './components/AviatorBets';
import DragonBets from './components/DragonBets';
import LuckyBets from './components/LuckyBets';
import ColorBets from './components/ColorBets';
import MinesBets from './components/MinesBets';
import ColorNewEntry from './components/ColorNewEntry';
import LevelManager from './components/GetLevel';
import PendingDepositTable from './components/PendingDepositTransaction';
import Plinko from './components/ShowPlinko';
import './tailwind.css';
import Tournament from './components/Tournament';

function App() {
  return (
        <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/history/:phone" element={<HistoryTrans/>}></Route>
        <Route path="/approved" element={<ApprovedTransaction />} />
        <Route path="/transaction" element={<TransactionTable />} />
        <Route path="/week" element={<WeeklyTransactionTable />} />
        <Route path="/pending" element={<PendingTransaction />} />
        <Route path="/daily" element={<DailyTransactionTable />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/weeklyUsers" element={<LastUsers/>} />
        <Route path="/products" element={<ProductDashboard/>}/>
        <Route path="/main" element={<MainSpinDashboard/>}/>
        <Route path="/colorRaja" element={<ColorRajaDashboard/>}/>
        <Route path="/dragonTiger" element={<DragonTigerDashboard/>}/>
        <Route path="/upi" element={<UPIManager/>}/>
        <Route path="/colorEntry" element={<ColorEntry/>}/>
        <Route path="/winColorEntry" element={<WinColorEntry/>}/>
        <Route path="/dragonEntry" element={<DragonEntry/>}/>
        <Route path="/winDragonEntry" element={<WinDragonEntry/>}/>
        <Route path="/winSpinEntry" element={<WinSpinEntry/>}/>
        <Route path="/spinEntry" element={<LuckyEntry/>}/>
        <Route path="/aviatorEntry" element={<AviatorEntry/>}/>
        <Route path="/winAviatorEntry" element={<WinAviatorEntry/>}/>
        <Route path="/upi" element={<UPIManager/>}/>
        <Route path="/banner" element={<BannerManager/>}/>
        <Route path="/referred/:phone" element={<ReferredDetails/>}/>
        <Route path="/deposit" element={<DepositTable/>}/>
        <Route path="/withdraw" element={<WithdrawTable/>}/>
        <Route path="/aviatorBets/:phone" element={<AviatorBets/>}/>
        <Route path="/luckyBets/:phone" element={<LuckyBets/>}/>
        <Route path="/dragonBets/:phone" element={<DragonBets/>}/>
        <Route path="/colorBets/:phone" element={<ColorBets/>}/>
        <Route path="/minesBets/:phone" element={<MinesBets/>}/>
        <Route path="/colorNewEntry/:phone" element={<ColorNewEntry/>}/>
        <Route path="/level" element={<LevelManager/>}/>
        <Route path="/pendingDeposit" element={<PendingDepositTable/>}/>
        <Route path="/plinko" element={<Plinko/>}/>
        <Route path="/tournament"  element={<Tournament/>}/>
      </Routes>
    </Router>
  );
}

export default App;
