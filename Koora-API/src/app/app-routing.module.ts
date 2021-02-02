import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AffichageTeamsComponent } from './affichage-teams/affichage-teams.component';
import { NavMatchComponent } from './AffichageMatch/nav-match/nav-match.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoreNewsComponent } from './more-news/more-news.component';
import { MorePlayersComponent } from './more-players/more-players.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistreComponent } from './registre/registre.component';

const routes: Routes = [
   {
     component: HomeComponent,
     path: 'home',
     pathMatch: 'full'
   },
   {
     component: RegistreComponent,
     path: 'registre',
     pathMatch: 'full'
   }
   ,
   {
     component: LoginComponent,
     path: 'login',
     pathMatch: 'full'
   },
   {
     component: HomeComponent,
     path: '',
     pathMatch: 'full'
   },
   {
     component: BlogComponent,
     path: 'blog',
     pathMatch: 'full'
   },
   {
     component: AboutComponent,
     path: 'about',
     pathMatch: 'full'
   },
   {
     component: DashBoardComponent,
     path: 'dashBoard',
     pathMatch: 'full'
   },
   {
     component: AffichageTeamsComponent,
     path: 'team',
     pathMatch: 'full'
   },
   {
     component: NavMatchComponent,
     path: 'match',
     pathMatch: 'full'
   },
   {
    component: ContactComponent,
    path: 'contact',
    pathMatch: 'full'
  },
  {
    component: PageNotFoundComponent,
    path: 'notFound',
    pathMatch: 'full'
  },
   {
     component: MoreNewsComponent,
     path: 'more/:id'
   },
   {
     component: MorePlayersComponent,
     path: 'moreplayers/:id'
   },
   {
    component: PageNotFoundComponent,
    path: '**',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
