'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { UserCircleIcon, MagnifyingGlassIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import fetchSuggestion from '@/lib/fetchSuggestion'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'

interface Props{
    userImg: string | null;
}

function Header({userImg}: Props) {
    const [board,searchString, setSearchString] = useBoardStore((state) => [state.board,state.searchString,state.setSearchString]);

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>("");

    useEffect(() => {
        if(board.columns.size === 0) return;
        setLoading(true);

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        }

        // fetchSuggestionFunc();
    }, [board])
    

  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
            <div 
                className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 z-[-50]'
            />
        <Image
            src="https://links.papareact.com/c2cdd5"
            alt='Trello logo'
            width={300}
            height={100}
            className='w-44 md:w-56 pb-5 md:pb-0 object-contain'
        />
        <div className='flex items-center space-x-4 flex-1 justify-center md:justify-end w-full'>
        <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer items-center text-light-1 hover:text-primary-500 mr-2'>
                <ArrowLeftOnRectangleIcon className='w-10 h-10' name='Sign Out' color='white'/>
              </div>
            </SignOutButton>
          </SignedIn>
            {/* Search Box */}
            <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
                <input type="text" placeholder='Search' className='outline-none p-2' value={searchString} onChange={e => setSearchString(e.target.value)}/>
                <button type='submit' hidden>Search</button>
            </form>

            {/* Avatar */}
            {userImg ? (
            <Image src={userImg} alt='User Image' width={50} height={50} className='rounded-full'/>
            ) : (
                <Avatar name='X' round size='50' color='#0055D1' /> 
            )}
        </div>
        </div>
        <div className='flex items-center justify-center px-5 py-2 md:py-5'>
            <p className='flex items-center text-sm p-5 font-normal pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]'>
                <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-spin"}`}/>
                {suggestion && !loading 
                    ? suggestion : "GPT is summarising your tasks for the day..."}
            </p>
        </div>
    </header>
  )
}

export default Header