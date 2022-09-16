import { writable, derived } from "svelte/store";
import Airtable from "airtable";

const base = new Airtable({ apiKey: "keycC9XfHbK0Esewa" }).base(
  "appH9R8fMHzMrQA8z"
);
// export const mainTable = base("tbliwQjVfECiSHGAb");
const departmentsTableID = "tblCKDpubPux5jjwS";

const departmentsTable = await base(departmentsTableID).select().all();
console.log("API CALL");

export const departmentsList = departmentsTable.map((record) => {
  return {
    departmentName: record.fields.departments,
    departmentRoles: record.fields.roles,
  };
});

export const locations = [
  "United States",
  "Canada",
  "Australia",
  "New Zealand",
  "United Kingdom",
  "Singapore",
];

export let currentLocation = writable(locations[0]);
export let currentCurrency = derived(currentLocation, ($currentLocation) => {
  let currency = "";

  switch ($currentLocation) {
    case "United Kingdom":
      currency = "gbp";
      break;
    case "Canada":
      currency = "cad";
      break;
    case "Australia":
      currency = "aud";
      break;
    case "Singapore":
      currency = "sgd";
      break;
    case "New Zealand":
      currency = "nzd";
      break;
    default:
      currency = "usd";
  }

  return currency;
});

export let isWorkFromHome = writable(true);
export let selectedWorkOption = derived(isWorkFromHome, ($isWorkFromHome) =>
  $isWorkFromHome ? "Work From Home" : "Office"
);

export default locations;
