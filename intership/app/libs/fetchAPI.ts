import { CompaniesData } from "./modals";

export const fetchCompaniesFromServer = async (): Promise<CompaniesData> => {
	const url = "http://localhost:4000/companies";
	const response = await fetch(url, {
		cache: "no-cache",
	});
	const data = await response.json();

	if (!response.ok) {
		throw new Error(`An error happened during the fetching`);
	}
	return data;
};
