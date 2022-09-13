import { PencilSimple } from "phosphor-react"

export interface PetsProps {
  name: string,
  image: string
}

export function Pets({ name, image }: PetsProps) {
  return (
    <div className="flex flex-col text-center">
      <button className="rounded-full w-20 h-20 bg-red-200 bg-opacity-60 hover:bg-red-200 hover:bg-opacity-80 flex justify-end items-end">
        <img className=" h-14 m-auto" src={image} />
        <PencilSimple className="fixed bg-sky-800 p-1 rounded-full" size={24} color={"#ffffff"} />
      </button>
      <label>{name}</label>
    </div>
  )
}