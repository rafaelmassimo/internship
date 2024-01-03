import React from "react";
import { fetchCompaniesFromServer } from "../libs/fetchAPI";
import { Company } from "../libs/modals";
import NewLinkedIn from "./NewLinkedIn";
import DeleteProfile from "./DeleteProfile";

export default async function Company() {
	const companiesData = await fetchCompaniesFromServer();

	return (
		<div>
			{companiesData &&
				companiesData.map((obj: Company) => (
					<div key={obj.id} className="border rounded-lg m-4 p-6">
						<h2>Company: {obj.companyName}</h2>
						<NewLinkedIn idCompany={obj.id.toString()} />
						<div className="my-3">
							<h3>LinkedIn:</h3>
						</div>
						<div className="collapse bg-base-200">
							<input type="checkbox" />
							<div className="collapse-title text-md font-medium">Show profiles</div>
							<div className="collapse-content">
								<ul>
									{obj.linkedin?.map((link, index) => (
										<div className="flex">
											<li className="flex flex-row items-center w-full my-3" key={index}>
												<a href={link} target="_blank" rel="noopener noreferrer" className="mr-4">
													{link}
												</a>
												<DeleteProfile idCompany={obj.id.toString()} index={index} />
											</li>
										</div>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
