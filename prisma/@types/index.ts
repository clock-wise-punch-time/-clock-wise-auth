export interface Root {
  models: Model[];
  enums: Enum[];
  relationships: Relationship[];
}

export interface Model {
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type?: string;
  relation?: RelationDetails;
}

export interface RelationDetails {
  fields: string[];
  references: string[];
  onDelete?: string;
  onUpdate?: string;
}

export interface Enum {
  name: string;
  values: string[];
}

export interface Relationship {
  model: string;
  relations: Array<{ name: string; relation: string }>;
}
