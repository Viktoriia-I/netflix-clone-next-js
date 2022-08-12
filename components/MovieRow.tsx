import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface MovieRowProps {
  title: string
  movies: Movie[]
}

function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (direction: string) => {
    setIsScrolled(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }


  return (
    <div className="h-40 space-y-0.5">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`arrowIcon left-2 ${!isScrolled && 'hidden'}`}
          onClick={() => handleScroll('left')}
        />
        <div ref={rowRef} className="scrollbar-hide flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {movies?.map(movie => <Thumbnail key={movie.id} movie={movie} />)}
        </div>
        <ChevronRightIcon
          className="arrowIcon right-2"
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  )
}

export default MovieRow;