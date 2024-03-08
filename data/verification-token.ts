import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByName = async (user_name: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { user_name },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
