export type Guideline = {
  id: string;
  title: string;
  description: string;
  type:
    | 'PRIVACY_POLICY'
    | 'TERMS_OF_USE'
    | 'LABOR_COMPLIANCE'
    | 'COOKIE_POLICY';
  version: number;
  status: boolean;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
};
