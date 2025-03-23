import Singer from "./singer.interface";

interface SongInterface{
    id: string,
    avatar: string,
    title: string,
    slug: string,
    singerId: string,
    like: number,
    topicId: string,
    description: string,
    lyrics: string,
    infoSinger?: Singer | null,
    isFavouriteSong?: boolean
}

export default SongInterface;