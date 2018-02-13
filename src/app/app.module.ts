import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppRouteModule} from './app.route.module';

import {SocialLoginModule,AuthServiceConfig} from 'angular4-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angular4-social-login';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { ProductFilterPipe } from './library/product-filter.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostProductComponent } from './post-product/post-product.component';
import { OnlyNumberDirective } from './library/only-number.directive';
import { CardNumberDirective } from './library/card-number.directive';

let config = new AuthServiceConfig([
  {
    id:GoogleLoginProvider.PROVIDER_ID,
    provider:new GoogleLoginProvider('374570808622-697kuueufh6in17sharsu1tmbhc09j2i.apps.googleusercontent.com')
  },
  {
    id:FacebookLoginProvider.PROVIDER_ID,
    provider:new FacebookLoginProvider('696511580484139')
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CategoriaComponent,
    HomeComponent,
    ProductComponent,
    SearchComponent,
    ProductFilterPipe,
    ProductDetailComponent,
    PostProductComponent,
    OnlyNumberDirective,
    CardNumberDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouteModule,
    FormsModule,
    NgxPaginationModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
