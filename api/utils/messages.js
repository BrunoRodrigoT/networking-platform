const Messages = {
  unalthorized: {
    message: "Unauthorized",
    status: 401,
  },
  internalServerError: {
    message: "Houve um problema ao contactar servidor",
    status: 500,
  },

  notFound: {
    message: "Recurso não encontrado",
    status: 404,
  },

  badRequest: {
    message: "Requisição inválida",
    status: 400,
  },
  invalidEmail: {
    message: "Email inválido",
    status: 400,
  },

  invalidPassword: {
    message: "Senha inválida",
    status: 400,
  },
  userNotFound: {
    message: "Usuário não encontrado",
    status: 404,
  },
  invalidDate: {
    message: "Data inválida",
    status: 400,
  },
  emailAlreadyExists: {
    message: "Email ja cadastrado",
    status: 400,
  },
  invalidEmailOrPass: {
    message: "Email ou senha inválidos",
    status: 401,
  },
  favoriteNotFound: {
    message: "Publicação não encontrada",
    status: 400,
  },
};

module.exports = Messages;
