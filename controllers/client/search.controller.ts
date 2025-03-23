import { Request, Response } from "express";
import Song from "../../models/song.model";


//[GET] /search/result
export const result = async (req: Request, res: Response) => {
    const keyword: string | any = req.query.keyword;

    let newSongs: any = [];

    if(keyword){
        const keywordRegex = new RegExp(keyword, "i");
        const songs = await Song.find({
            title: keywordRegex
        });
        console.log(songs)
    }

    

    res.render("client/pages/search/result", {
        pageTitle: "Kết quả: " + keyword,
        keyword: keyword,
        songs: newSongs
    });
};