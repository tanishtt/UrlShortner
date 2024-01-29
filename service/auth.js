const mapSessionIdToUser= new Map();


function setUserToSessionId(id, user){
    mapSessionIdToUser.set(id, user);
}

function getUserFromSessionId(id){
    return mapSessionIdToUser.get(id);  
}

module.exports={
    setUserToSessionId,
    getUserFromSessionId
}