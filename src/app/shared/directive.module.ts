import { NgModule } from "@angular/core";

import { HighlightPipe } from "./directives/highlight.directive";

const SHARED_DIRECTIVES = [HighlightPipe];

@NgModule({
  declarations: [...SHARED_DIRECTIVES],
  exports: [...SHARED_DIRECTIVES]
})
export class DirectiveModule {}
