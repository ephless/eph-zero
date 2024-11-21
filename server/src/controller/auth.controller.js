import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			await User.create({
				clerkId: id,
				fullName: `${firstName || ""} ${lastName || ""}`.trim(),
				imageUrl,
			});
		}

res.status(200).json({ success: true, message: user ? "User already exists" : "User created successfully" });	} catch (error) {
console.error("Error in auth callback:", error);		next(error);
	}
};
