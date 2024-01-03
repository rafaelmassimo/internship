import { revalidatePath } from "next/cache";
import React from "react";
import { NewLinkedInProps } from "../libs/modals";
import { redirect } from "next/navigation";

export default async function NewLinkedIn({ idCompany }: NewLinkedInProps) {
	const addLinkedInProfile = async (formData: FormData) => {
		"use server";

		const response = await fetch(`http://localhost:4000/companies/${idCompany}`);
		const existingData = await response.json();
		const existingLinkedIn = existingData.linkedin;

		const newLinkedin = formData.get("linkedin");
		formData.set("linkedin", "");

		existingLinkedIn.push(newLinkedin);

		const updatedData = {
			...existingData,
			linkedin: existingLinkedIn,
		};

		fetch(`http://localhost:4000/companies/${idCompany}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => {
				if (response.ok) {
					console.log("LinkedIn link added successfully");

					// Clear the LinkedIn input field
					formData.set("linkedin", "");
				} else {
					console.log("Failed to add LinkedIn link");
				}
			})
			.catch((err) => {
				console.error("Error:", err);
			});
		revalidatePath("/");
		redirect("/");
	};
	return (
		<div className="my-4">
			<form id="linkedin" action={addLinkedInProfile}>
				<div className="flex">
					<div className="flex flex-row mr-3">
						<label>LinkedIn Profile:</label>
					</div>
					<input type="text" name="linkedin" />
				</div>

				<div className="my-4">
					<button
						className="btn btn-ghost"
						style={{ border: "2px solid black", borderRadius: "10px", padding: "10px" }}
						type="submit"
					>
						Add new Profile
					</button>
				</div>
			</form>
		</div>
	);
}
