import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EventAppComponent } from './event-app.component';
import { EventListComponent } from './events/event-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventService } from './events/shared/events.service';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { appRoutes } from './routes';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './error/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    EventAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState,
    },
  ],
  bootstrap: [EventAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  return true;
}
