import nookies from "nookies";


const TOKEN = "TOKEN_DO_USUARIO";

export const tokenService = {
    save(token, ctx=null) {
        nookies.set(ctx, TOKEN, token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
        });

    },
    
    get(ctx=null){
        const cookies = nookies.get(ctx);
        return cookies[TOKEN] || ""
    },

    delete(ctx=null) {
        nookies.destroy(ctx, TOKEN, {
            path: "/",
        });
    }
}
