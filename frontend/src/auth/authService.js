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
        const refresh = tokenService.getRefreshToken(ctx);
        
        try {
            return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/session`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
            })
            .then(async (response) => {
                if(response.erro === "jwt expired") {
                    tokenService.deleteAccessToken(ctx);
                    tokenService.deleteRefreshToken(ctx);
                    
                    return await AtualizaToken(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/atualiza_token`, {
                        body: {
                            refresh_token: refresh
                        }
                    }).then(async (res) => {
                        console.log("Teste: ", res)
                        
                        tokenService.saveAccessToken(res.access_token, ctx);
                        tokenService.saveRefreshToken(res.refresh_token, ctx);
                        return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/session`, {
                            method: 'GET',
                            headers: {
                              'Authorization': `Bearer ${res.access_token}`
                            },
                        }).then(respostaLogin => {
                            console.log("respostaRelogin: ", respostaLogin)
                            return respostaLogin;
                        })
                    })
                }
                return response;
            })
        } catch(erro) {
            console.log("erro: ", erro)
            return erro;
        }

    },
    
    async getPosts(ctx=null) {
        const token = tokenService.getAccessToken(ctx);

        console.log("Token: ", token)

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
        }).then(async(respostaDoServidor) => {
            console.log("respostaSession: ", respostaDoServidor)
            return respostaDoServidor;
        })
    },
}