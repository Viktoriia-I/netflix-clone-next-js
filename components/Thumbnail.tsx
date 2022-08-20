import Image from "next/image";
import { Movie } from "../typings";
import { useRecoilState } from "recoil";
import { DocumentData } from "firebase/firestore";

import { modalState, movieState } from "../atoms/modalAtom";

interface MovieProps {
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: MovieProps) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  const handleModalOpen = () => {
    setCurrentMovie(movie);
    setShowModal(true)
  }

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h36 md:min-w-[260px] md:hover:scale-105"
      onClick={handleModalOpen}
    >
      <Image src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail;