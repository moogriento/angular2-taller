import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ExampleComponent} from './example/example.component';

import { RouteExampleComponent } from './route-example/route-example.component';
import { RouteComponent } from './route-example/route.component';
import { RouteItemComponent } from './route-item-example/route-item-example.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './shared/can-activate.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'example', component: ExampleComponent},
  // { path: 'products', component: RouteExampleComponent},
  // { path: 'products/:id', component: RouteItemComponent}
  {
    path: 'products',
    component: RouteComponent,
    canActivate: [CanActivateAuthGuard],
    canActivateChild: [CanActivateAuthGuard],
    children: [{
      path: '', component: RouteExampleComponent, pathMatch: 'full'
    }, {
      path: ':id', component: RouteItemComponent
    }]
  },
  { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(routes);
