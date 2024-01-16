import prisma from "@/lib/prisma"
import Image from "next/image";

export default async function UsersPage() {
  const users = await prisma.users.findMany({
    skip: 10, // page number
    take: 30, // page size
    where: {
     approved: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="py-6 px-4 md:px-6 xl:px-7.5">
      <h4 className="text-xl font-semibold text-black dark:text-white">
        Top Users
      </h4>
    </div>

    <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-2 flex items-center">
        <p className="font-medium">Name</p>
      </div>
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="font-medium">Email</p>
      </div>
      <div className="col-span-2 flex items-center">
        <p className="font-medium">Phone</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Gender</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Id Number</p>
      </div>
    </div>

    {users.map((user, key) => (
      <div
        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        key={key}
      >
        <div className="col-span-2 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image
                src={user.image??"https://dummyimage.com/201x100.png/ff4444/ffffff"}
                width={60}
                height={50}
                alt="Product"
              />
            </div>
            <p className="text-sm text-black dark:text-white">
              {user.name}
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm text-black dark:text-white">
            {user.email}
          </p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm text-black dark:text-white">
            ${user.phone}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">{user.gender}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-meta-3">${user.idNumber}</p>
        </div>
      </div>
    ))}
  </div>
  )
}
