export type OwnCompany = {
  associationId?: string;
  orgId?: string;
}

export type OwnCompanies = {
  us_associations: OwnCompany[];
  cn_associations: OwnCompany[];
  jp_associations: OwnCompany[];
  brokerages: OwnCompany[];
}

export type Company = {
  id: string;
  title: string;
}

export type Companies = {
  us_associations: Company[];
  cn_associations: Company[];
  jp_associations: Company[];
  brokerages: Company[];
}
