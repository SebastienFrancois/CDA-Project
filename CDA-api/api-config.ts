export const PORT = process.env.SERVER_PORT

type IEvironnementVariables = {
  serverURL: string
  dbString: string
}

interface IEnvironnement {
  [key: string]: IEvironnementVariables
}

export const environment: IEnvironnement = {
  dev: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/test?retryWrites=true&w=majority`,
  },
  prod: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/simpleplan?retryWrites=true&w=majority`,
  },
  test: {
    serverURL: '',
    dbString: 'mongodb://mongodb:27017/localTest',
  }
}
