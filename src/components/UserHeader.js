export default function UserHeader({ userInformation }) {
  return (
    <div className="flex gap-2 items-end p-2 w-full dark:bg-neutral-800 dark:text-neutral-50">
      <img
        alt=""
        src={userInformation.profile_picture}
        className="min-w-fit h-16 rounded-full border-2 border-neutral-900 dark:border-orange-300"
      ></img>
      <h1 className="font-mono font-bold text-2xl">
        {userInformation.username}
      </h1>
    </div>
  );
}
