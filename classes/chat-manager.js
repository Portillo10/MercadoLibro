
let activeUsers = []

class ChatManager{

  static joinToChat(user){
    activeUsers.push(user)
    return activeUsers
  }

  static getUser(userId){
    return activeUsers.find(user => user.id === userId)
  }

  static leaveChat(userId){
    let removedUser = activeUsers.find(user => user.id === userId)
    activeUsers = activeUsers.filter(user => user.id !== userId)
    return removedUser
  }

  static getAllUsers(){
    return activeUsers
  }
}

module.exports = ChatManager