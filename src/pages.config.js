import AddressExplorer from './pages/AddressExplorer';
import Admin from './pages/Admin';
import Browser from './pages/Browser';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import History from './pages/History';
import NFTGallery from './pages/NFTGallery';
import Settings from './pages/Settings';
import Swap from './pages/Swap';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AddressExplorer": AddressExplorer,
    "Admin": Admin,
    "Browser": Browser,
    "Dashboard": Dashboard,
    "Explorer": Explorer,
    "History": History,
    "NFTGallery": NFTGallery,
    "Settings": Settings,
    "Swap": Swap,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};