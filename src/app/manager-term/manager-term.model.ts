export interface TermInfo {
  _id?: string;
  createdBy?: string;
  regulationName?: string;
  content?: string;
  status?: boolean;
}

export interface InitTermInfoResponse {
  InitTermInfo?: TermInfo[];
}
export interface InitTermInfoPayload {
  landorId?: string;
}
export interface DeleteTermInfoResponse {
  status?: boolean;
}
export interface DeleteTermInfoPayload {
  _id?: string;
}
