import {generateResourceId} from '../utils/generate-resource-id';
import {decode, JWT_EXPIRES_IN, JWT_SECRET, sign} from '../utils/jwt';
import {wait} from '../utils/wait';
import {coreApi} from "../config";

const users = [
    {
        id: '5e86809283e28b96d2d38537',
        avatarUrl: '/static/user-chen_simmons.png',
        email: 'demo@devias.io',
        fullName: 'Kate Heida',
        password: 'Password123!'
    }
];

class AuthApi {
    async login({email, password}) {

        try {
            const response = await fetch(coreApi.authUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: email, password: password})
            });
            const json = await response.json();
            const {accessToken} = json;
            return accessToken;
        } catch (error) {
            throw new Error('Please check your email and password')
        }
    }

    async register({email, name, password}) {
        await wait(1000);

        return new Promise((resolve, reject) => {
            try {
                // Check if a user already exists
                let user = users.find((_user) => _user.email === email);

                if (user) {
                    reject(new Error('User already exists'));
                    return;
                }

                user = {
                    id: generateResourceId(),
                    avatar: null,
                    email,
                    name,
                    password
                };

                users.push(user);

                const accessToken = sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

                resolve(accessToken);
            } catch (err) {
                console.error('[Auth Api]: ', err);
                reject(new Error('Internal server error'));
            }
        });
    }

    async me(accessToken) {
        // Decode access token

        const decodedToken = decode(accessToken);

        const userId = decodedToken.sub;

        try {
            const url = `${coreApi.usersUrl}/${userId}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const user = await response.json();
            console.log(user);
            return {
                id: user.id,
                avatar: user.avatarUrl,
                email: user.email,
                name: user.fullName
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unsuccessful response from the server")
        }

    }
}

export const authApi = new AuthApi();
