

export default async function fetchBack<T = unknown>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: unknown
): Promise<T> {
    const options: RequestInit = {
        method: method ?? "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        ...(method !== "GET" && data ? { body: JSON.stringify(data) } : {}),
    };

    try {
        const resp = await fetch(`${process.env.REACT_APP_BACK_URL}/${endpoint}`, options);
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        
        const text = await resp.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
