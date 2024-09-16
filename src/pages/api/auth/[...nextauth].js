import { useUser } from "@/context/userContext";
import { connectDB } from "@/utils/dbConnect";
import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import { signIn } from "next-auth/react";

//npm i next-auth

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: "https://kauth.kakao.com/oauth/authorize",
      token: "https://kauth.kakao.com/oauth/token",
      userinfo: "https://kapi.kakao.com/v2/user/me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.properties.nickname,
        };
      },
      scope: "profile_nickname",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const client = await connectDB;
        const db = client.db("todayEatTeamProject");
        const userCollection = db.collection("users");
        //사용자 id로 기존 사용자 확인
        const existingUser = await userCollection.findOne({ id: user.id });

        //기존 사용자가 없으면 새 사용자 추가
        if (!existingUser) {
          await userCollection.insertOne({
            id: user.id,
            name: user.name,
            createAt: new Date(),
          });
        }
        return true;
      } catch (error) {
        console.error("로그인 접속 후 디비 연결 에러 : ", error);
        return false;
      }
    },
    //세션 생성 시 호출되는 콜백 함수
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    //jwt 토큰 생성 시 호출되는 콜백 함수
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
