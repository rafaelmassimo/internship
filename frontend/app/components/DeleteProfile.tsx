import React from "react";
import { DeleteProps } from "../libs/modals";
import { revalidatePath } from "next/cache";
import { TiDeleteOutline } from "react-icons/ti";

export default async function DeleteProfile({ idCompany, index }: DeleteProps) {
	const handleRemoveProfile = async () => {
		"use server";
		const response = await fetch(`http://localhost:4000/companies/${idCompany}`, {
			cache: "no-cache",
		});
		const existingData = await response.json();
		const existingLinkedIn = existingData.linkedin;
		const newProfilesArray = [...existingLinkedIn];
		newProfilesArray.splice(index, 1);

		const updatedData = {
			...existingData,
			linkedin: newProfilesArray,
		};
		console.log(newProfilesArray);

		fetch(`http://localhost:4000/companies/${idCompany}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => {
				if (response.ok) {
					console.log("LinkedIn update successfully");
				} else {
					console.log("Failed to remove LinkedIn link");
				}
			})
			.catch((err) => {
				console.error("Error:", err);
			});
		revalidatePath("/");
	};

	return (
		<form action={handleRemoveProfile}>
			<div >
				<button className="mt-2" type="submit">
					<TiDeleteOutline className=" hover:text-red-600 active:text-red-400 active:translate-y-1" />
				</button>
			</div>
		</form>
	);
}
