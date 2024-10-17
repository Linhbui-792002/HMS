export interface BuildingInfo {
  _id: string;
  name?: string;
  floorNumber?: number;
  address?: string;
  createAt?: string;
  updateAt?: string;
}
export interface RoomInfo {
  _id: string;
  buildingId?: string;
  floor?: number;
  roomNumber?: string;
  area?: number;
  price?: number;
  status?: boolean;
}

export interface InitBuildingInfo {
  resultCd?: number;
  message?: string;
  metadata?: BuildingInfo[];
}

export interface TabBuilding {
  _id?: string;
  name?: string;
}

export interface FloorDropDownData {
  id?: number;
  name?: string
}
