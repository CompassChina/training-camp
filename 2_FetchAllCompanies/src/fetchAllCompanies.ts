import { OwnCompanies, Companies } from "./typings";

async function fetchOwnCompanies(): Promise<OwnCompanies> {
  return {
    us_associations: [{ associationId: "111" }],
    cn_associations: [{ orgId: "222" }],
    jp_associations: [{ orgId: "333" }],
    brokerages: [{ orgId: "444" }]
  };
}

async function fetchCompanies(): Promise<Companies> {
  return {
    us_associations: [{ id: "123", title: "US123" }],
    cn_associations: [{ id: "222", title: "CN222" }],
    jp_associations: [{ id: "377", title: "JP377" }],
    brokerages: [{ id: "444", title: "BROKER444" }]
  };
}

export const fetchAllCompanies = async () => {
  const ownCompanies = await fetchOwnCompanies();

  const data = await fetchCompanies();

  const usCompanies = data.us_associations.map((x: any) => {
    x.org_kind = "US";
    return x;
  });

  const cnCompanies = data.cn_associations.map((x: any) => {
    x.org_kind = "CN";
    return x;
  });

  const jpCompanies = data.jp_associations.map(
    (x: any) => {
      x.org_kind = "JP";
      return x;
    }
  );

  const brokerageCompanies = data.brokerages.map((x: any) => {
    x.org_kind = "BROKERAGE";
    return x;
  });

  const allCompanies = usCompanies
    .concat(cnCompanies, jpCompanies, brokerageCompanies)
    .map((assoc: any) => {
      const isVerified =
        ownCompanies.us_associations.some(
          (a: any) => a.associationId === assoc.id
        ) ||
        ownCompanies.cn_associations.some(
          (a: any) => a.orgId === assoc.id
        ) ||
        ownCompanies.jp_associations.some(
          (a: any) => a.orgId === assoc.id
        ) ||
        ownCompanies.brokerages.some(
          (a: any) => a.orgId === assoc.id
        );
      return {
        ...assoc,
        isVerified
      };
    })
    .sort((a: any, b: any) => {
      return a.title.localeCompare(b.title);
    });

  return allCompanies;
};
