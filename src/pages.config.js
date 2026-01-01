import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import Swap from './pages/Swap';
import NFTGallery from './pages/NFTGallery';
import History from './pages/History';
import Settings from './pages/Settings';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "Explorer": Explorer,
    "Swap": Swap,
    "NFTGallery": NFTGallery,
    "History": History,
    "Settings": Settings,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};