export async function validation(dto) {
    const username = validationUsername(dto.username);
    const id = validationId(dto.id);
    const password = validationPassword(dto.password);

    return {"username": username, "id": id, "password": password};
}

function validationUsername(username) {
    if (username.length >= 2
        && username.length <= 4) {
        return username;
    }
    return false;
}

function validationId(id) {
    if (id.length >= 4 && id.length <= 12) {
        return id;
    }
    return false;
}

function validationPassword(password) {
    if (password.length >= 4 && password.length <= 10) {
        return password;
    }
    return false;
}
