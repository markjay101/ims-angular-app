export interface InternetPlan {
  id: string;
  name: string;
  description: string;
  speedMbps: number;
  price: number;
  subscriberCount: number;
}

export interface CreateInternetPlanDto {
  name: string;
  description: string;
  speedMbps: number;
  price: number;
}
