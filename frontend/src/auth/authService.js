import { AtualizaToken, CreateAccount, CreatePost, Login, Session } from "../infra/HttpClient.js";
import { tokenService } from "./tokenService.js";

export const authService = {
    async login(body) {
        return await Login(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/login`, {
            method: "POST",
            body: body
        }).then(respostaDoServidor => {
            console.log("respostaLogin: ", respostaDoServidor)

            const user = respostaDoServidor.usuario;
            tokenService.saveAccessToken(respostaDoServidor.token);
            tokenService.saveRefreshToken(respostaDoServidor.refreshToken);
            return user;
        })
    },

    async criar(body) {
        console.log(body)
        return await CreateAccount(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario`, {
            method: "POST",
            body: body,
        }).then(respostaDoServidor => {
            console.log("respostaSession: ", respostaDoServidor)
            return respostaDoServidor;
        })
    },

    async getSession(ctx = null) {
        const token = tokenService.getAccessToken(ctx);
        
        console.log("tokenFront: ", token)
        try {
            return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/session`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
            })
            .then(async (response) => {
                console.log("authService: ", response)
                if(response.erro === "jwt expired") {
                    const refresh = tokenService.getRefreshToken(ctx);
                    tokenService.deleteAccessToken(ctx);
                    tokenService.deleteRefreshToken(ctx);
                    return await AtualizaToken(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/atualizaToken`, {
                        method: 'POST',
                        body: {
                            refresh_token: refresh
                        }
                    }).then(async (response) => {
                        console.log("authServiceNew: ", response)
                        return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/session`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        })
                    })
                }
                return response;
            })
        } catch(erro) {
            console.log("erro: ", erro)
            return null;
        }

    },
    
    async getPosts(ctx=null) {
        const token = tokenService.getAccessToken(ctx);

        return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {
            console.log("authService: ", response)
            const posts = response;
            return posts;
        })
    },
    
    async createPost(body) {
        const token = tokenService.getAccessToken();
        console.log("TokenAuthService: ", token)
        console.log("authServicebody: ", body)
        return await CreatePost(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
            method: "POST",
            body: body,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(respostaDoServidor => {
            console.log("respostaSession: ", respostaDoServidor)
            return respostaDoServidor;
        })
    },
}