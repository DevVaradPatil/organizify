import Board from "@/components/Board";
import Header from "@/components/Header";
import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser();
  if(!user) return redirect('/sign-in');
  console.log(user);
  const firstname = user.firstName;
  const lastname = user.lastName;
  const name = `${firstname} ${lastname}`;
  return (
    <main>
      {/* {Header} */}
      <Header userImg={user.profileImageUrl} userName={name}/>
      {/* {Board} */}
      <Board/>
    </main>
  );
}
