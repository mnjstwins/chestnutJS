import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './containers/catalog-page/catalog-page.component';
import { catalogRoutes } from './catalog.routing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CatalogEffects } from './state/catalog.effect';
import { SharedModule } from '@shared/shared.module';
import { reducer } from './state/catalog.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(catalogRoutes),
    EffectsModule.forFeature([CatalogEffects]),
    StoreModule.forFeature('catalog', reducer)
  ],
  declarations: [CatalogPageComponent]
})
export class CatalogModule { }