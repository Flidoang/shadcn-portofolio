export interface EmailPayload {
    name: string;
    email: string;
    message: string;
}

// GANTI DENGAN ACCESS KEY DARI WEB3FORMS ANDA
export const WEB3FORMS_ACCESS_KEY = "8d585f1a-63c4-4bea-94c0-7a1e172b12bf";

/**
 * Mengirimkan pesan formulir ke API Web3Forms.
 * @param payload - Objek berisi name, email, dan message.
 * @returns Promise<boolean> - True jika pengiriman berhasil.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            ...payload,
        }),
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Gagal mengirim pesan.");
    }

    return true;
}
