import { prisma } from "@/app/lib/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { account, email, signedToken } = await req.json();

    const user = await prisma.user.upsert({
      where: { account },
      update: { signedToken },
      create: {
        account, // 생략가능
        email,
        signedToken,
      },
      // 특정정보만 골라서 내리기
      select: {
        account: true,
        email: true,
        nickname: true,
        signedToken: true,
      },
    });

    return NextResponse.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};
