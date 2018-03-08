import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppRouteModule} from './app.route.module';
import {HashLocationStrategy, LocationStrategy } from '@angular/common';

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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TermAndConditionComponent } from './term-and-condition/term-and-condition.component';

let config = new AuthServiceConfig([
  {
    id:GoogleLoginProvider.PROVIDER_ID,
    provider:new GoogleLoginProvider('15050891962-dkrp681flf6frpl37emb57pe31tlu8ju.apps.googleusercontent.com')
  },
  {
    id:FacebookLoginProvider.PROVIDER_ID,
    provider:new FacebookLoginProvider('1506383982784965')
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
    CardNumberDirective,
    UserProfileComponent,
    TermAndConditionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouteModule,
    FormsModule,
    NgxPaginationModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { } 
