"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

interface Props {
  userImg: string | null;
  userName: string | null;
}

function Header({ userImg, userName }: Props) {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  const trimmedUserName =
    userName!.length > 12 ? `${userName!.slice(0, 12)}...` : userName;

  const toggleDialog = () => {
    var dialog = document.getElementById("user-dialog");
    dialog?.classList.toggle("hidden");
  };

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 z-[-50]" />
        <div className="flex items-center pb-5 md:pb-0">
        <img
          src="https://cloud.appwrite.io/v1/storage/buckets/64f4194cd176c24c1d5a/files/64fc01b3ea5d9bd648fe/view?project=64f4165fc92e110bea14&mode=admin"
          alt="logo"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full"
        />
        <h1 className="font-bold text-4xl md:text-5xl pl-3 text-[#2A3956]">Organizify</h1>
        </div>
        <div className="flex items-center space-x-4 justify-center md:justify-end w-full">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer items-center text-light-1 hover:text-primary-500 hover:bg-slate-600 mr-2 p-2 rounded-full transform duration-300">
                <ArrowLeftOnRectangleIcon
                  className="w-10 h-10"
                  name="Sign Out"
                  color="white"
                />
              </div>
            </SignOutButton>
          </SignedIn>
          {/* Search Box */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md  md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none p-2 w-[125px] md:w-full"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* Avatar */}
          {userImg ? (
            <div className="relative inline-block">
              <Image
                src={userImg}
                alt="User Image"
                width={50}
                height={50}
                className="rounded-full cursor-pointer"
                id="user-image"
                onClick={toggleDialog}
              />
              <div
                className="hidden absolute bottom-[-100%] w-[200px] left-[-100%] transform -translate-x-1/2 bg-slate-100 text-black p-2 rounded mt-2"
                id="user-dialog"
              >
                Signed in as {trimmedUserName}
              </div>
            </div>
          ) : (
            <Avatar name="X" round size="50" color="#0055D1" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center text-sm p-5 font-normal pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
