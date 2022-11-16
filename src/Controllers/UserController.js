const users = [
    {
      id: 1,
      name: "Aroldo da Silva",
      email: "aroldo@dasilva.com.br",
      password: "teste123"
    },
    {
      id: 2,
      name: "Ana Caroline",
      email: "ana@caroline.com.br",
      password: "@#$%1235teste"
    }
  ];
  
  
  function anyUser(name, email, password) {
    let index = users.findIndex(item => item.email == email);
  
    if (index < 0) {
      console.log("Usuario Gravado com Sucesso");
      return true;
    } else {
      console.log("Usuario existe");
      return false;
    }
  }
  
  module.exports = {
    async index(req, res) {
      try {
        return res.json(users);
      } catch (ex) {
        res.status(500).json({ error: "Internal routes ERROR" });
        console.log(ex);
        throw ex;
      }
    },
    async indexById(req, res) {
      try {
        const { id } = req.params;
  
        let user = users.filter(item => {
          return item.id == id;
        });
  
        if (user.length > 0) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User Not Found" });
        }
      } catch (ex) {
        res.status(500).json({ error: "Internal server ERROR" });
        console.log(ex);
        throw ex;
      }
    },
    async create(req, res) {
      try {
        console.log(req.body);
        const { name, email, password } = req.body;
        let newID = 0;
  
        const { id } = users[users.length - 1];
        newID = id + 1;
  
        if (anyUser(name, email, password)) {
          if (users.length == 0) {
            users.push({
              id: newID,
              name,
              email,
              password
            });
          } else {
            users.push({
              id: newID,
              name,
              email,
              password
            });
          }
  
          res.status(201).json(users);
        } else {
          res
            .status(409)
            .json({ message: "Email already registered, use a new email" });
        }
      } catch (ex) {
        res.status(500).json({ error: "Internal server ERROR" });
        console.log(ex);
        throw ex;
      }
    },
    async update(req, res) {
      try {
        const { index } = req.params;
        const { name, email, password } = req.body;
  
        users[index].name = name;
        users[index].email = email;
        users[index].password = password;
  
        res.status(200).json(users);
      } catch (ex) {
        res.status(500).json({ error: "Internal server ERROR, " });
        console.log(ex);
        throw ex;
      }
    },
    async delete(req, res) {
      try {
        const { id } = req.params;
  
        users.splice({
          id
        });
  
        return res.status(200).send();
      } catch (ex) {
        res.status(500).json({ error: "Internal server ERROR, " });
        console.log(ex);
        throw ex;
      }
    },
    checkUserExists(req, res, next) {
      if(!req.body.name) {
        return res.status(400).json({ error: "User name is required" })
      }
      if(!req.body.email) {
        return res.status(400).json({ error: "Email is required" })
      }
      if(!req.body.password) {
        return res.status(400).json({ error: "Password is required" })
      }
    
      return next();
    }
    
  };