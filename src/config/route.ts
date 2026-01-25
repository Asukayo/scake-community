import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";


const routes = [
    { path: '/', component: IndexPage },
    { path: '/team', component: TeamPage },
    { path: '/user', component: UserPage },
    {path:"/user/update", component: UserUpdatePage },
    {path:"/user/team/join",component: UserTeamJoinPage},
    {path:"/user/team/create", component: UserTeamCreatePage},
    {path: '/search', component: SearchPage },
    {path: '/user/edit', component: UserEditPage },
    {path: '/user/list', component: SearchResultPage },
    {path: '/user/login', component: UserLoginPage },
    {path: '/team/add', component: TeamAddPage },
    {path: '/team/update', component: TeamUpdatePage },

]


export default routes;