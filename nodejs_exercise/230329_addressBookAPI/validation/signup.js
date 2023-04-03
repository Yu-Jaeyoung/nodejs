export async function signUpValidation(dto) {
  const username = validationUsername(dto.username);
  const id = validationId(dto.id);
  const password = validationPassword(dto.password);

  return {username, id, password};
}

function validationUsername(username) {
  if (username.length >= 2
    && username.length <= 4) {
    return true;
  }
  return false;
}

function validationId(id) {
  if (id.length >= 4 && id.length <= 12) {
    return true;
  }
  return false;
}

function validationPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}