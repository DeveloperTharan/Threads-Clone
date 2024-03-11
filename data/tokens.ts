import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  // expire the token in 15 min, It will calculate the no.of milliseconds in 15 min
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
