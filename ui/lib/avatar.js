import {publicKeyToIndex} from "../logic/identity";

const roomAvatar = (info, room) => {

    if(room.userDisplay?.randomIdentities) {
        const avatarIndex = publicKeyToIndex(info.id, room.userDisplay.randomIdentities.length);
        return room.userDisplay.randomIdentities[avatarIndex].avatar;
    } else if(room.userDisplay?.randomAvatars) {
        const avatarIndex = publicKeyToIndex(info.id, room.userDisplay.randomAvatars.length);
        return room.userDisplay.randomAvatars[avatarIndex];
    } else {
        return `/img/avatar-default.png`;
    }
}

const roomDisplayName = (info, room) => {

    if(room.userDisplay?.randomIdentities) {
        const avatarIndex = publicKeyToIndex(info.id, room.userDisplay.randomIdentities.length);
        return room.userDisplay.randomIdentities[avatarIndex].name;
    } else if(room.userDisplay?.randomNames) {
        const avatarIndex = publicKeyToIndex(info.id, room.userDisplay.randomNames.length);
        return room.userDisplay.randomNames[avatarIndex];
    } else {
        return `/img/avatar-default.png`;
    }
}


export const avatarUrl = (info, room) => {
    if(info.avatar && (! room.access?.lockedIdentities)) {
        return info.avatar
    } else {
        return roomAvatar(info, room)
    }
};

export const displayName = (info, room) => {
    if(info.displayName && (! room.access?.lockedIdentities)) {
        return info.displayName
    } else {
        return roomDisplayName(info, room)
    }
}
