import Constants from "../constants/constants";

const url = Constants.API_URL;

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
        
        console.log("postMessage returned: ", res.status);
        return res.status;

    } catch (error) {
        console.error(error.message);
        return 0;
    }
}

export async function getChats(user_id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(url + `/user/${encodeURIComponent(user_id)}/chats`, {
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
        console.log("getChats data: ", data);

        const chats = [];

        for (const index in data) {
            if (data[index].message_text === null || data[index].status === 'closed') {
                continue;
            }
            chats.push({
                other: data[index].name,
                request_id: data[index].request_id,
                title: data[index].title,
                lastMessage: data[index].message_text,
                status: data[index].status
            });
        }

        console.log("chats: ", chats);

        return chats;

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

export async function getTitle(request_id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(url + `/request/${encodeURIComponent(request_id)}`, {
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

        return data.title;

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Request timed out');
            return 408
        }
        else {
            console.error(error.message);
            return 0;
        }
    }

}


export async function getMessages(request_id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
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

export async function getPartner(request_id, uid) {
    const controller = new AbortController();
    try {
        // fetch id

        let timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url + `/request/${encodeURIComponent(request_id)}`, {
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
        const other_id = data.user_id == uid ? data.helper_id : data.user_id;

        // fetch name

        timeoutId = setTimeout(() => controller.abort(), 5000);

        const res_user = await fetch(url + `/user/${encodeURIComponent(other_id)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res_user.status !== 200) {
            return res_user.status;
        }

        const data_user = await res_user.json();

        return data_user.name;
    
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
