import { fetchAllCompanies } from "./fetchAllCompanies";

async function main() {
  const allCompanies = await fetchAllCompanies();
  console.log(allCompanies);
}

main();
