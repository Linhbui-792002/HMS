import { provinces, districts, wards } from './vn-api.js';

// Hàm lấy danh sách quận/huyện theo mã tỉnh (provinceCode)
export function getDistrictsByProvince(provinceCode: string) {
  return districts.data.data.filter(district => district.parent_code === provinceCode);
}

// Hàm lấy danh sách xã/phường theo mã quận/huyện (districtCode)
export function getCommunesByDistrict(districtCode: string) {
  return wards.data.data.filter(ward => ward.parent_code === districtCode);
}

export function getProvinces() {
  return provinces.data.data;
}
