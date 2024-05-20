"use strict";

const { getAllUsers, getUser, addUser } = require("../api/api")

const { getBodyParams, getQueryParams } = require("../utils");

const router = require("find-my-way")({
    defaultRoute: (request, response) => {
      response.statusCode = 404;
      response.end("Metodo inesistente");
    },
});

function setHeader(response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Request-Method", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, DELETE"
    );
    response.setHeader("Access-Control-Allow-Headers", "*");
  }

function registerRoutes() {
    router.on("GET","/", async (req, res) => {
        setHeader(res);
        res.end("HEYYYY")
    });

    router.on("POST","/signup", async (req, res) => {

        setHeader(res);
        res.statusCode = 201;
        const body = await getBodyParams(req);
        const { name, email, password } = body;
        const newUser = await addUser(name, email, password)
        res.end(JSON.stringify(newUser))
    });

    return router;
}

function lookup(req, res) {
    router.lookup(req, res);
}

module.exports = {
    registerRoutes,
    lookup,
};