export interface UserResponse {
  data: string[];
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  avatar?: string;
}

export interface RendOtpRequest {
  otp: number;
}

export interface ProductItemResponse {
  data: {
    id: number;
    user_id: string;
    category_id: string;
    item_name: string;
    description: string;
    country: string;
    state: string;
    area: string;
    item_condition: string;
    brand: string;
    price: number;
    has_defect: string;
    defect_reason: string | null;
    listed: string;
    item_media: string[];
  }[];
}

export interface upLoadFileApiPayload {
  payload: {
    'file[0]': string;
    'file[1]': string;
    'file[2]': string;
    'file[3]': string;
    path: string;
  };
}

export interface editProfilePayload {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}
