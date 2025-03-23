import { Request, Response } from "express"
import FavouriteSong from "../../models/favourite-song.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

//[GET] /favourite-songs/
export const index = async (req: Request, res: Response) => {
    const favouriteSongs:any = await FavouriteSong.find({
        // userId: "",
        deleted: false
    });

    for(const item of favouriteSongs){
        const infoSong = await Song.findOne({
            _id: item.songId
        });

        const infoSinger = await Singer.findOne({
            _id: infoSong?.singerId
        })

        item.infoSong = infoSong;
        item.infoSinger = infoSinger;
    }

    res.render("client/pages/favourite-songs/index", {
        pageTitle: "Bài hát yêu thích",
        favouriteSongs: favouriteSongs
    });
}