export interface SendEmailRequest {
    email?: string;
}

export interface SignupRequest {
    email?: string;
    password?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dob?: string;
    gender?: boolean;
    city?: string;
    districtOrCounty?: string;
    communeOrWard?: string;
    streetAddress?: string;
}
export interface SignupResponse {
    message?: string;
    status?: number;
    metadata: {
        _id?: string;
        email?: string;
        role?: string;
        isVerified?: boolean;
        userInfoId?: string
    }
    option?:{};
    resultCd?: number
}

export interface signupFailureReponse {
    status?: number;
    type?: string;
    resultCd?: number;
    stack?: string;
    message?: string;
}

