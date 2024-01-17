import argon2 from "argon2";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body.data
  console.log('body', body.data)

  if(!name || !email || !password){
    return new NextResponse("Missing name, email or password", { status: 400})
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email : email
    }
  })

  if(userExist){
    return new NextResponse("User already exist", {status : 400})
  }

  let passwordHash = null
  try{
    passwordHash = await argon2.hash(password);
  }catch(e){
    return new NextResponse("Error" + e, {status : 500})
  }

  console.log(password, passwordHash)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password : passwordHash,
    }
  })

  console.log("user", user)

  return NextResponse.json(user)
}