export interface InternetPlan {
  id: string;
  name: string;
  description: string;
  speedMbps: number;
  price: number;
}

export interface CreateInternetPlanDto {
  name: string;
  description: string;
  speedMbps: number;
  price: number;
}
