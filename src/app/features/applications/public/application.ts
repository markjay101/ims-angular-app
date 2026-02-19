import { Component, inject, signal, viewChild } from '@angular/core';
import { ApplicationForm } from './components/application-form/application-form';
import { LucideAngularModule } from 'lucide-angular';
import { StepsGuide } from './components/steps-guide/steps-guide';
import { CreateApplicationDto } from '@shared/models/application';
import { ApplicationService } from '@services/application-service';
import { ToastService } from '@services/toast-service';
import { Toast } from '@shared/components/toast/toast';

@Component({
  selector: 'app-application',
  imports: [ApplicationForm, LucideAngularModule, StepsGuide, Toast],
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class Application {
  applicationForm = viewChild<ApplicationForm>('applicationForm');

  private applicationService = inject(ApplicationService);
  private toast = inject(ToastService);

  isSaving = signal<boolean>(false);

  handleSubmit(data: CreateApplicationDto) {
    this.isSaving.set(true);
    this.applicationService.createpplication(data).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.toast.show(res.message, 'success');
        this.applicationForm()?.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.isSaving.set(false);
      },
    });
  }
}
