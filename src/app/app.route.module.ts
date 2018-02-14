import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import {ProductDetailComponent} from './product-detail/product-detail.component'
import { PostProductComponent } from './post-product/post-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'category-product/:type/:value',
        component:ProductComponent
    },
    {
        path: 'detail-product/:type/:value',
        component:ProductDetailComponent
    },
    {
         path: 'post-product/:id_customer/:id_product',
         component:PostProductComponent,
    },
    {
        path: 'user-profile/:id_customer',
        component: UserProfileComponent
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouteModule { }