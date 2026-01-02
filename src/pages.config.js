import AddressExplorer from './pages/AddressExplorer';
import Admin from './pages/Admin';
import Browser from './pages/Browser';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import History from './pages/History';
import Home from './pages/Home';
import Learn from './pages/Learn';
import NFTGallery from './pages/NFTGallery';
import Settings from './pages/Settings';
import Swap from './pages/Swap';
import TokenStats from './pages/TokenStats';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AddressExplorer": AddressExplorer,
    "Admin": Admin,
    "Browser": Browser,
    "Dashboard": Dashboard,
    "Explorer": Explorer,
    "History": History,
    "Home": Home,
    "Learn": Learn,
    "NFTGallery": NFTGallery,
    "Settings": Settings,
    "Swap": Swap,
    "TokenStats": TokenStats,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};