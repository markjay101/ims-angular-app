import { Component, inject, signal } from '@angular/core';
import { ApplicationForm } from './components/application-form/application-form';
import { LucideAngularModule } from 'lucide-angular';
import { StepsGuide } from './components/steps-guide/steps-guide';
import { CreateApplicationDto } from '../../../shared/models/application';
import { ApplicationService } from '../../../core/services/application-service';

@Component({
  selector: 'app-application',
  imports: [ApplicationForm, LucideAngularModule, StepsGuide],
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class Application {
  private applicationService = inject(ApplicationService);

  isSaving = signal<boolean>(false);

  handleSubmit(data: CreateApplicationDto) {
    this.isSaving.set(true);
    this.applicationService.createpplication(data).subscribe({
      next: (res) => {
        if (res.succeeded) this.isSaving.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isSaving.set(false);
      },
    });
  }
}
