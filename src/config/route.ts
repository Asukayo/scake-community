import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/user', component: User },
    {path: '/search', component: SearchPage },
    {path: '/user/edit', component: UserEdit },
    {path: '/user/list', component: SearchResultPage },
]


export default routes;