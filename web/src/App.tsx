import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg'
import { MagnifyingGlassPlus } from 'phosphor-react';

interface Game {
  name: string;
  announcements: number;
  imgSrc: string;
}

const games: Game[] = [
  { name: "Dota 2", announcements: 2, imgSrc: "/game-dota2.png" },
  { name: "Counter-Strike", announcements: 100, imgSrc: "/game-csgo.png" },
  { name: "World of Warcraft", announcements: 4, imgSrc: "/game-wow.png" },
]

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <a key={game.name} href="" className="relative rounded-lg overflow-hidden">
            <img src={game.imgSrc} alt={`${game.name} Cover Art`} />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">{game.name}</strong>
              <span className="text-zinc-300 text-sm block">{game.announcements} anúncios</span>
            </div>
          </a>
        ))}
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
