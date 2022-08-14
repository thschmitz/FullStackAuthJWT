import nookies from "nookies";


const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export const tokenService = {
    saveAccessToken(token, ctx=null) {
        nookies.set(ctx, ACCESS_TOKEN, token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
        });

    },

    saveRefreshToken(token, ctx=null) {
        nookies.set(ctx, REFRESH_TOKEN, token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
        });
    },
    
    getAccessToken(ctx=null){
        const cookies = nookies.get(ctx);
        return cookies[ACCESS_TOKEN] || ""
    },

    getRefreshToken(ctx=null) {
        const cookies = nookies.get(ctx);
        return cookies[REFRESH_TOKEN] || ""
    },

    deleteAccessToken(ctx=null) {
        nookies.destroy(ctx, ACCESS_TOKEN, {
            path: "/",
        });
    },

    deleteRefreshToken(ctx=null)  {
        nookies.destroy(ctx, REFRESH_TOKEN, {
            path: "/",
        });
    }
}
