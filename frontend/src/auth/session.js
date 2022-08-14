import { authService } from "./authService";
import { tokenService } from "./tokenService";

export function withSession(funcao) {
  return async (ctx) => {
    try {
      console.log("CTX: ", ctx.resolvedUrl);
      const session = await authService.getSession(ctx);
      console.log("SessionUser: ", session);
      if (session.erro === "jwt expired") {
        tokenService.deleteAccessToken(ctx);
        tokenService.deleteRefreshToken(ctx);
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      if (session.erro === "jwt malformed") {
        tokenService.deleteAccessToken(ctx);
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      return funcao(session);
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

export function posts(funcao) {
  return async (ctx) => {
    try {
      console.log("CTX: ", ctx.resolvedUrl);
      const session = await authService.getSession(ctx);
      console.log("SessionUser: ", session);
      if (session.erro === "jwt expired") {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      if (session.erro === "jwt malformed") {
        tokenService.deleteAccessToken(ctx);
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      const posts = await authService.getPosts(ctx);

      const data = {
        session,
        posts,
      };

      return funcao(data);
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
