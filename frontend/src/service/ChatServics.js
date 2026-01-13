import Constants from "../constants/constants";

const url = Constants.API_URL;

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

export async function postMessage(request_id, user_id, message_text) {
    try {
        const payload = {
            request_id: request_id,
            user_id: user_id,
            message_text: message_text,
        };
        const res = await fetch(url + "/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        /*
        if (res.status !== 201) {
            if (res.status === 404) {
                return 404;
            } else {
                return 0;
            }
        }
        */
        console.log("postMessage returned: ", res.status);
        return res.status;

    } catch (error) {
        console.error(error.message);
        return 0;
    }
}

export async function getMessages(request_id) {
    try {
        const res = await fetch(url + `/messages/${encodeURIComponent(request_id)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (res.status !== 200) {
            return res.status;
        }

        const data = await res.json();

        const messages = [];

        for (const index in data) {
            messages.push({
                message_id: data[index].message_id,
                user_id: data[index].user_id,
                message_text: data[index].message_text,
                date_time: data[index].date_time,
            });
        }

        return messages;

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Request timed out');
            return 408
        } else {
            console.error('Fetch error: ', error.message);
            return 0;
        }
    }
}
