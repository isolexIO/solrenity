import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import History from './pages/History';
import NFTGallery from './pages/NFTGallery';
import Settings from './pages/Settings';
import Swap from './pages/Swap';
import Browser from './pages/Browser';
import AddressExplorer from './pages/AddressExplorer';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Dashboard": Dashboard,
    "Explorer": Explorer,
    "History": History,
    "NFTGallery": NFTGallery,
    "Settings": Settings,
    "Swap": Swap,
    "Browser": Browser,
    "AddressExplorer": AddressExplorer,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};