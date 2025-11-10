export type Role = 'ADMIN' | 'USER' | 'SUPERADMIN';

export type Status = 'ACTIVE' | 'DISACTIVE';
export type verifiedUser = 'VERIFIED' | 'FALSE';

export interface userType {
  id: string;
  email: string;
  role: Role;
  password: string;
  confirm_password?: string;
  image_url?: string;
  username: string;
  isVerified: verifiedUser;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface tokenData {
  id: string;
  email: string;
  role: string;
}
