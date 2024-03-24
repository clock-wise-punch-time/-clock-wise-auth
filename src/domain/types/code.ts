export type Code = {
  id: string;
  user_id: string;
  code: string;
  type: 'EMAIL_VERIFY' | 'EMAIL_RESET' | 'PASSWORD_RESET';
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
