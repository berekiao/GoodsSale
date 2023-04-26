import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout";
import Dashboard from '../components/admin/Dashboard'
import Profile from '../components/admin/Profile'
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Home from "../components/frontend/Home";
import FrontLayouts from "../layouts/frontend/FrontLayouts";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Category from "../components/admin/Category/Category";
import ViewCategory from "../components/admin/Category/ViewCategory";
import EditCategory from "../components/admin/Category/EditCategory";
import Moderator from "../components/admin/Moderator/Moderator";
import ViewModerator from "../components/admin/Moderator/ViewModerator";
import EditModerator from "../components/admin/Moderator/EditModerator";
import DashboardSeller from "../components/frontend/DashboardSeller";
import AddGood from "../components/frontend/sellers/AddGoods";
import ViewsGoods from "../components/frontend/sellers/ViewsGoods";
import ListGoods from "../components/admin/Goods/ListsGoods";
import EditGoods from "../components/frontend/sellers/EditGoods";
import UpdateGoods from "../components/admin/Goods/UpdateGoods";
import VueCategory from "../components/frontend/collections/VueCategory";
import GoodDetails from "../components/frontend/collections/GoodDetails";


const router = createBrowserRouter([
    {
        path: '/admin',
        element : <MasterLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'add-category',
                element: <Category />
            },
            {
                path: 'view-category',
                element: <ViewCategory />
            },
            {
                path: 'edit-category/:id',
                element: <EditCategory />
            },
            {
                path: 'add-moderator',
                element: <Moderator />
            },
            {
                path: 'view-moderator',
                element: <ViewModerator />
            },
            {
                path: 'edit-moderator/:id',
                element: <EditModerator />
            },
            {
                path: 'list-goods',
                element: <ListGoods />
            },
            {
                path: 'edit-goods/:id',
                element: <UpdateGoods />
            },
        ]
    },
    {
        path: '/',
        element : <FrontLayouts />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'Page403',
                element: <Page403 />
            },
            {
                path: 'Page404',
                element: <Page404 />
            },
            {
                path: '/dashboardSeller',
                element: <DashboardSeller />
            },
            {
                path: '/dashboardSeller/add-goods',
                element: <AddGood />
            },
            {
                path: '/dashboardSeller/view-goods',
                element: <ViewsGoods />
            },
            {
                path: '/dashboardSeller/edit-goods/:id',
                element: <EditGoods />
            },
            {
                path: '/goods',
                element: <VueCategory />
            },
            {
                path: '/goods/:name',
                element: <GoodDetails />
            },
        ]
    },
    
        
    
])

export default router