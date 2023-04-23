const userApi = process.env.REACT_APP_USERDATA_API;

async function GetUserProfile(userData) {
    console.log('GetUserProfile', userData);

    const res = await fetch(`${userApi}/get-user`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return await res.json();
}

async function SaveUser(data) {
    console.log('SaveUser', data);
    const res = await fetch(`${userApi}/create-user`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function UpdateUser(data) {
    console.log('UpdateUser', data);

    const res = await fetch(`${userApi}/update-user/${data.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    await res.json();
}

export { GetUserProfile, SaveUser, UpdateUser };