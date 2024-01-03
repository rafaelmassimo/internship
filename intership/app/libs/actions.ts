import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addLinkedInProfile = async (idCompany: string, formData: FormData) => {
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
