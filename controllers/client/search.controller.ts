import { Request, Response } from "express";
import Song from "../../models/song.model";
import SongInterface from "../../interfaces/song.interface";
import Singer from "../../models/singer.model";
import SingerInterface from "../../interfaces/singer.interface";
import { convertToSlug } from "../../helpers/convertToSlug";


//[GET] /search/:type
export const result = async (req: Request, res: Response) => {
    const type:string = req.params.type;
    const keyword: string | any = req.query.keyword;

    let newSongs: any = [];

    if(keyword){
        const keywordRegex = new RegExp(keyword, "i");

        //Tạo ra slug không dấu, dấu - ngăn cách
        const stringSlug = convertToSlug(keyword);

        const stringSlugRegex = new RegExp(stringSlug, "i");

        const songs:SongInterface[] = await Song.find({
            $or: [
                {title: keywordRegex},
                {slug: stringSlugRegex}
            ]
        });

        for (const item of songs) {
            const infoSinger:SingerInterface|null = await Singer.findOne({
                _id: item.singerId
            });

            // item.infoSinger = infoSinger;
            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger?.fullName
                }
            })
        }

        // newSongs = songs;
    }

    switch (type) {
        case "result":
            res.render("client/pages/search/result", {
                pageTitle: "Kết quả: " + keyword,
                keyword: keyword,
                songs: newSongs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành công",
                songs: newSongs
            })
            break;
        default:
            break;
    }
   
};