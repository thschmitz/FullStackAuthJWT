import {Login, Session, CreateAccount, CreatePost} from "../infra/HttpClient.js";
import {tokenService} from "./tokenService.js"

export const authService = {
    async login(body) {
        return await Login(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/login`, {
            method: "POST",
            body: body
        }).then(respostaDoServidor => {
            console.log("respostaLogin: ", respostaDoServidor)

            const user = respostaDoServidor.usuario;
            tokenService.save(respostaDoServidor.token);

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
        const token = tokenService.get(ctx);
        
        console.log("tokenFront: ", token)
        try {
            return await Session(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/session`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              })
              .then((response) => {
                  console.log("authService: ", response)
                  tokenService.save(response);
                  return response;
              })
        } catch(erro) {
            console.log("erro: ", erro)
            return null;
        }

    },
    
    async getPosts(ctx=null) {
        const token = tokenService.get(ctx);

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
        const token = tokenService.get();
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
    }
}