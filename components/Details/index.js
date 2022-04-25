import React from "react";
import Image from "next/image";

function Details({ song }) {
  return (
    <div className="flex flex-row justify-self-start">
      <div>
        <Image src={song.songImage} width={100} height={100} alt={song.name} />
      </div>
      <div className="flex flex-col pl-4 mt-2">
        <h3 className="pb-2 text-xl font-bold">{song.name}</h3>
        <h4>{song.songUser.name}</h4>
      </div>
    </div>
  );
}

export default Details;
