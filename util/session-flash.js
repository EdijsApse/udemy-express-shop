function flashDataToSession(req, data, action) {
    req.session.flashedData = data;
    req.session.save(action)
}

function getSessionData(req) {
    let data = req.session.flashedData;

    req.session.flashedData = null;

    return data;
}

module.exports = {
    flashDataToSession: flashDataToSession,
    getSessionData: getSessionData
}