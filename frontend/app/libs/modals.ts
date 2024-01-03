export type Company = {
	id: number;
	companyName: string;
	linkedin: string[];
	comments: string;
};

export type CompaniesData = Company[];
// {
// map(arg0: (obj: Company) => import("react").JSX.Element): import("react").ReactNode;
// companies: Company[];
// };

export interface NewLinkedInProps {
	idCompany: string;
}

export interface DeleteProps {
	idCompany: string;
	index: number;
}
