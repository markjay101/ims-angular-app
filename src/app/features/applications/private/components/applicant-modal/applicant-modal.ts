import { ApplicationStatusNumberMap } from './../../../../../core/constants/application-status';
import { Component, inject, model, OnInit, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Application } from '../../../../../shared/models/application';
import { ApplicationStatus } from '../../../../../core/constants/application-status';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { InternetPlan } from '../../../../../shared/models/internet-plan';
import { InternetPlanService } from '../../../../../core/services/internet-plan-service';
import { ApplicationService } from '../../../../../core/services/application-service';

@Component({
  selector: 'app-applicant-modal',
  imports: [LucideAngularModule, CurrencyPipe, UpperCasePipe, DatePipe],
  templateUrl: './applicant-modal.html',
  styleUrl: './applicant-modal.css',
})
export class ApplicantModal implements OnInit {
  private interPlanService = inject(InternetPlanService);
  private applicationService = inject(ApplicationService);

  closeModal = output<void>();
  applicant = model.required<Application>();
  isPlanLoading = signal<boolean>(false);
  applicantPlan = signal<InternetPlan | null>(null);

  applicationStatus = ApplicationStatus;

  statusChanged = output<void>();

  ngOnInit(): void {
    this.loadApplicantPlan();
  }

  handleStatusChange(status: ApplicationStatus.Approved | ApplicationStatus.Rejected) {
    const statusNumber = ApplicationStatusNumberMap[status];

    this.applicationService.updateApplicationStatus(this.applicant().id, statusNumber).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.applicant.update((curr) => ({ ...curr, status }));
          this.statusChanged.emit();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private loadApplicantPlan() {
    this.isPlanLoading.set(true);
    this.interPlanService.getInternetPlanById(this.applicant().internetPlanId).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.applicantPlan.set(res.data);
        this.isPlanLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isPlanLoading.set(false);
      },
    });
  }

  protected getStatusClass(status: string): string {
    switch (status as ApplicationStatus) {
      case ApplicationStatus.Pending:
        return 'bg-[#fffbeb] text-[#d97706] border-[#d97706]';
      case ApplicationStatus.Approved:
        return 'bg-[#ecfdf5] text-[#047857] border-[#047857]';
      case ApplicationStatus.Rejected:
        return 'bg-[#fff1f2] text-[#be123c] border-[#be123c]';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  }
}
