import { authService } from "./authService";
import { tokenService } from "./tokenService";

export function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
    
      if(session.usuarioInfo) {
        const modifiedCtx = {
          ...ctx,
          req: {
            ...ctx.req,
            session,
          }
        }
        return funcao(modifiedCtx)
      } else {
        return ctx.redirect("/?error=401");
      }


    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}

export function posts(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      console.log("SessionUser2: ", session);
      if(session.usuarioInfo) {
        const posts = await authService.getPosts(ctx);
        const modifiedCtx = {
          ...ctx,
          req: {
            ...ctx.req,
            session,
            posts,
          }
        }
        return funcao(modifiedCtx)
      } else {
        return ctx.redirect("/?error=401");
      }

    } catch (error) {
      console.log(error);
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}
