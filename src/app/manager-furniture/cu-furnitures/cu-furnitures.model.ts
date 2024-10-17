export interface RegistFurnituresResponse {
  status?: boolean;
}
export interface RegistFurnituresPayload {
  buildingId?:string;
  _id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  purchaseDate?: string;
}

export interface UpdateFurnituresResponse {
  status?: boolean;
}
