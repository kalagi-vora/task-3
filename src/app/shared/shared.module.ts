import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent} from '../layouts/loading-spinner/spinner.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FooterComponent
  ],

  imports: [FormsModule, ReactiveFormsModule],

  exports:[LoadingSpinnerComponent, FooterComponent, FormsModule, ReactiveFormsModule],
})

export class SharedModule {}
