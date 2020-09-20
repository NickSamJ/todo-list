import SignUp from "../components/Authorisation/SignUp";
import LogIn from "../components/Authorisation/LogIn";
import Dictionary from "../pages/Dictionary";
import Blog from "../pages/Blog/Blog";
import BlogRouter from "../pages/Blog/BlogRouter";

const { default: Home } = require("../pages/Home");
const { default: About } = require("../pages/About");
const { default: QuestionConstructor } = require("../pages/QuestionConstructor");


const TOPMENU = [
    {path: '/', displayName: 'Home', component: Home, exact: true},
    {path: '/about', displayName: 'About', component: About, exact: true},
    {path: '/js-polls', displayName: 'Polls', component: '', exact: true},
    {path: '/add-question', displayName: 'Manage questions', component: QuestionConstructor, exact: true},
    {path: '/dictionary', displayName: 'Dictionary', component: Dictionary, exact: true},
    {path: '/posts', displayName: 'Blog', component: BlogRouter, exact: false},
    
    // {path: '/reset-password', displayName: 'ResetPa', component: SignUp},
    // {path: '/login', displayName: 'Login', component: LogIn},

    // {path: '/', displayName: 'Home', component: Home},
]

export default TOPMENU