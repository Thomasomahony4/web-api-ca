export const getUsers = async () => {
    const  res = await fetch(
        `http://localhost:8080/api/users`
    )
        return res.json();
};

export const addUser = async(data) => {
    const res = await fetch(
        `http://localhost:8080/api/users?action=register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};

export const loginUser = async(data) => {
    const res = await fetch(
        `http://localhost:8080/api/users`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};

export const deleteUser = async (id) => {
    const res =  fetch(
        `http://localhost:8080/api/users/${id}`,
        {
            method: 'DELETE'
        }
    )
    return res;
};

export const updateTask = async (data) => {
    const res = await fetch(
        `http://localhost:8080/api/users/${data._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};
