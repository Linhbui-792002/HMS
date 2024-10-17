export interface FurnituresInfo {
  _id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  purchaseDate?: string;
  quantityUse?: number;
}

export interface InitFurnituresResponse {
  initFurnituresInfo?: FurnituresInfo[];
}
export interface DeleteFurnituresResponse {
  status?: boolean;
}
export interface DeleteFurnituresPayload {
  _id?: string;
}
