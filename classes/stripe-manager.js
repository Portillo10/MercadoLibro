let sessionList = [];

setInterval(() => {
  let sessions = [...sessionList]
  sessions.forEach((session) => {
    if (session.expires_at < new Date()) {
      StripeManager.removeSession(session.id)
    }
  });
}, 200000);


class StripeManager {
  constructor() {}

  static addToQueue(session) {
    sessionList.push(session);
    return sessionList;
  }

  static removeSession(sessionId) {
    let removedSession = this.getSession(sessionId);
    sessionList = sessionList.filter((session) => session.id !== sessionId);
    return removedSession;
  }

  static getSession(sessionId) {
    return sessionList.find((session) => session.id == sessionId);
  }

  static getAllSessions(){
    return sessionList
  }

  static clearSessionList(){
    sessionList = []
  }
}

module.exports = StripeManager;
