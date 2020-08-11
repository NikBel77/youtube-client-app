import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ColorByTimeDirective } from './directives/color-by-time.directive';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { CardsColectionService } from './services/cards-colection.service';
import { FilterSettingsService } from './services/filter-settings.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    SearchItemComponent,
    FilterComponent,
    StatisticsComponent,
    ColorByTimeDirective,
    FilterCardsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    CardsColectionService,
    FilterSettingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
