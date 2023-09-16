import { userService } from "@/_services/user.service";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = userService.currentUserValue;
    if (currentUser && currentUser.access_token) {
        return { 
            Authorization: `Bearer ${currentUser.access_token}`,
            'Content-Type': 'application/json'
        };
    } else {
        return {
            Authorization: ``,
            'Content-Type': 'application/json'
        };
    }
}

