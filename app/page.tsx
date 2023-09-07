import Board from "@/components/Board";
import Header from "@/components/Header";
import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser();
  if(!user) return redirect('/sign-in');
  
  return (
    <main>
      {/* {Header} */}
      <Header userImg={user.profileImageUrl}/>
      {/* {Board} */}
      <Board/>
    </main>
  );
}
