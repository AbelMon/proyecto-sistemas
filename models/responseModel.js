const userCreated = {
    status: 201,
    title: "Éxito",
    message: "Se ha suscrito al servicio de M/A Tech"
};


const userAlreadyExist = {
    status: 409,
    title: "Error",
    message: "El email ya está registrado"
}

class responseMessages {
    static getUserCreatedMsg() {
        return userCreated;
    }

    static getUserExistErrorMsg() {
        return userAlreadyExist;
    }
}

module.exports = responseMessages;
