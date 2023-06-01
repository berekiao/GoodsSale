import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout";
import Dashboard from '../components/admin/Dashboard'
import Profile from '../components/admin/Profile'
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Home from "../components/frontend/collections/Home";
import FrontLayouts from "../layouts/frontend/FrontLayout";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Category from "../components/admin/Category/Category";
import ViewCategory from "../components/admin/Category/ViewCategory";
import EditCategory from "../components/admin/Category/EditCategory";
import Moderator from "../components/admin/Moderator/Moderator";
import ViewModerator from "../components/admin/Moderator/ViewModerator";
import EditModerator from "../components/admin/Moderator/EditModerator";
import ListGoods from "../components/admin/Goods/ListsGoods";
import UpdateGoods from "../components/admin/Goods/UpdateGoods";
import GoodDetails from "../components/frontend/collections/GoodDetails";
import DashboardSeller from "../components/admin/seller/DashboardSeller";
import AddGood from "../components/admin/seller/AddGoods";
import ViewsGoods from "../components/admin/seller/ViewGoods";
import EditGoods from "../components/admin/seller/EditGoods";
import Publish from "../components/admin/seller/GoodsPublish";
import DashboardModerator from "../components/admin/Goods/DashboardModerator";
import RequestGoods from "../components/admin/Goods/ListRequest";
import ViewSeller from "../components/admin/Goods/ListSeller";
import Proposal from "../components/frontend/collections/Proposition";
import ListProposal from "../components/admin/seller/listProposal";
import Conversations from "../components/admin/seller/Conversations";
import Discussion from "../components/admin/seller/Discussions";
import ConversationBuyer from "../components/frontend/collections/ConversationBuyer";
import DiscussionBuyer from "../components/frontend/collections/DiscussionBuyer";
import LikeGood from "../components/frontend/collections/likesGood";

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
            {
                path:'dashboardSeller',
                element : <DashboardSeller/>
            },
            {
                path: 'dashboardSeller/add-goods',
                element : <AddGood/>
            },
            {
                path: 'dashboardSeller/views-goods',
                element : <ViewsGoods />
            },
            {
                path: 'dashboardSeller/edit-goods/:id',
                element: <EditGoods />
            },
            {
                path: 'dashboardSeller/publish-goods',
                element : <Publish />
            },
            {
                path:'dashboardModerator',
                element : <DashboardModerator />
            },
            {
                path: 'list-request',
                element: <RequestGoods />
            },
            {
                path: 'list-seller',
                element: <ViewSeller />
            },
            {
                path: 'list-proposal',
                element: <ListProposal />
            },
            {
                path: 'conversations',
                element: <Conversations />
            },
            {
                path: 'conversations/:id',
                element: <Discussion />
            }

            
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
                path: 'Page403',
                element: <Page403 />
            },
            {
                path: 'Page404',
                element: <Page404 />
            },
            {
                path: '/goods/:id',
                element: <GoodDetails />
            },
            {
                path: '/achats',
                element: <Proposal />
            },
            {
                path: 'conversations',
                element: <ConversationBuyer />
            },
            {
                path: 'conversations/:id',
                element: <DiscussionBuyer />
            },
            {
                path: 'GoodLikes',
                element: <LikeGood />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    
        
    
])

export default router