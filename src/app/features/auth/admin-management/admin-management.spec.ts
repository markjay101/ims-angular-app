import { ICONS } from '@shared/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminManagement } from './admin-management';
import { UserService } from '@services/user-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LucideAngularModule } from 'lucide-angular';
import { of } from 'rxjs';
import { vi } from 'vitest'; // Import Vitest utilities

describe('AdminManagement', () => {
  let component: AdminManagement;
  let fixture: ComponentFixture<AdminManagement>;

  const mockUserService = {
    getAdmins: vi.fn().mockReturnValue(of({ data: { items: [], totalCount: 0 } })),
    getAdminStats: vi.fn().mockReturnValue(of({ data: { totalAdmins: 0, totalSuperAdmins: 0 } })),
    createAdmin: vi.fn().mockReturnValue(of({ message: 'Success' })),
    updateAdmin: vi.fn().mockReturnValue(of({ message: 'Success' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagement, LucideAngularModule.pick(ICONS)],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load admins on init', () => {
    expect(mockUserService.getAdmins).toHaveBeenCalled();
  });
});
