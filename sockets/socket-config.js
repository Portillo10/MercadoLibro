const { io } = require("../models/server");
const ChatManager = require("../classes/chat-manager");
const { validateSocketJWT } = require("../helpers/generate-jwt");

io.on("connection", async (client) => {

  const {id} = client

  const token = client.handshake.headers["token"]

  const user = await validateSocketJWT(token)

  if(!user){
    return client.disconnect()
  }

  client.join(client.id)

  console.log(id);

  // ChatManager.joinToChat({})

});
