import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import {ProductDetailComponent} from './product-detail/product-detail.component'
import { PostProductComponent } from './post-product/post-product.component';


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
         path: 'postproduct/:id_customer',
         component:PostProductComponent,
    },    
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouteModule { }