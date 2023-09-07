interface GameData {
  images: Record<string, string>;
  words: string[];
}

const host = 'https://team-hugh-laurie.github.io';
const absolutize = (path: string) => new URL(path, host).href
export async function loadGameData(): Promise<GameData> {
  const res = await fetch(absolutize('/images/manifest.json'));
  if (!res.ok) {
    throw new Error('non-200');
  }
  const data: GameData = await res.json();
  return {
    images: Object.fromEntries(Object.entries(data.images).map(([w, path]) => [w, absolutize(path)])),
    words: data.words.map(w => w.toLowerCase()),
  };
} 
