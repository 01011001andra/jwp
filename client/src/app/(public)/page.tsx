"use client";

import BlurFade from "@/components/BlurFade";
import NumberTicker from "@/components/NumberTicket";
import TextRevealByWord from "@/components/TextRevealByWord";
import useGetBuku from "@/hooks/buku/useGetBuku";
import React from "react";

export default function Home() {
  const [search, setSearch] = React.useState("");

  const { data, isLoading } = useGetBuku({
    limit: 999999,
    page: 1,
    search: search,
  });
  console.log(data?.data);
  return (
    <div className="w-full h-full">
      <div
        id="home"
        className="w-full min-h-[70vh] relative bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: 'url("/images/hero.avif")' }}
      >
        <div className="h-full min-h-[70vh] max-w-screen-2xl mx-auto lg:px-0 px-4 z-50 flex items-center justify-center flex-col gap-4 ">
          <BlurFade delay={0.25} inView>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white text-center ">
                Lebih dari <NumberTicker value={100} /> buku ada disini
              </h2>
            </div>
          </BlurFade>
          <div className="flex flex-col w-full gap-1 ">
            <div className="flex items-center flex-col gap-2 justify-center w-full">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                value={search}
                className="w-full py-3 lg:py-4 px-4 lg:px-5 rounded-full"
                placeholder="Cari buku favoritmu"
              />
              {search ? (
                <div className="relative w-full">
                  <div className="flex flex-col w-full z-50 absolute bg-white rounded-b-xl max-h-52 overflow-y-scroll">
                    {data?.data?.map((item: any) => {
                      return (
                        <div className="border-b w-full p-2 cursor-pointer hover:bg-black/10">
                          {item.nama}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="tentang-kami" className="w-full h-full">
        <div className="z-10 flex flex-col min-h-[16rem] items-center justify-center rounded-lg  bg-white dark:bg-black">
          <TextRevealByWord text="Selamat datang di E-Borrow, platform peminjaman buku yang memudahkan Anda untuk menemukan, meminjam, dan menikmati berbagai buku dari koleksi kami." />
        </div>
      </div>
    </div>
  );
}
