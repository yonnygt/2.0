"use server";

import { createSupabaseServer } from "@/lib/supabase/server";

export const verifyOtp = async (data: {
	email: string;
	otp: string;
	type: string;
}) => {
	const supabase = createSupabaseServer();

	try {
		const { error } = await supabase.auth.verifyOtp({
			email: data.email,
			token: data.otp,
			type: "signup",
		});

		if (error) {
			console.error("Error en la verificación OTP:", error);
			return JSON.stringify({ error: error.message });
		}

		return JSON.stringify({ success: true });
	} catch (e) {
		console.error("Error inesperado en verifyOtp:", e);
		return JSON.stringify({ error: "Ocurrió un error inesperado" });
	}
};
