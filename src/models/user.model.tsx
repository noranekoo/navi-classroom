export class UserLogin {
    email: string;
    mat_khau: string;
    loai: boolean;
    // loai: number;
    constructor(email: string, password: string, type: boolean) {
        this.email = email;
        this.mat_khau = password;
        this.loai = type;
    }
}

export interface UserInformation {
    _id:string;
    ho: string;
    ten: string;
    anh_dai_dien: string;
    mat_khau: string;
    email: string;
    ngay_sinh:  Date;
    loai: boolean;
    updatedAt:  Date;
    nguoi_tao_id: string;
    createdAt: Date;
    fullName: string;
    ly_do:string;
    isLoading: boolean;
}


export interface TokenInformation {
    user_info: TokenInfo;
    token: string;
    success: boolean;
}

interface TokenInfo {
    id: string;
    email: string;
}