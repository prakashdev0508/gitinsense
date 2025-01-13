import { auth, clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { db } from "@/server/db";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div>Not logged in </div>;
  }

  const client = await clerkClient();
  const userDetails = await client.users.getUser(userId);

  await db.user.upsert({
    where: {
      email: userDetails?.emailAddresses[0]?.emailAddress,
    },
    create: {
      name: userDetails?.fullName,
      imageUrl: userDetails?.imageUrl,
      email: userDetails?.emailAddresses[0]?.emailAddress ?? "",
    },
    update: {
      imageUrl: userDetails?.imageUrl,
      name: userDetails?.fullName,
    },
  });

  return <div className=" h-96 flex justify-center align-middle ">Sync-user </div>;
};

export default page;
