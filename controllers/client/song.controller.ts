import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { ObjectId } from "mongoose";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

interface Topic {
    id: ObjectId,
    title: string,
    avatar: string,
    description: string,
    status: string,
    slug: string,
    deleted: boolean,
}

interface Singer{
    _id: ObjectId,
    fullName: string,
    avatar: string,
    status: string,
    slug: string,
}

interface Song{
    avatar: string,
    title: string,
    slug: string,
    singerId: string,
    like: number,
    infoSinger?: Singer | null
}


//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    try {
        const topic:Topic | null = await Topic.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        })
    
        if(topic){
            const songs: Song[] | null = await Song.find({
                topicId: topic.id,
                status: "active",
                deleted: false
            }).select("avatar title slug singerId like");

            for (const song of songs) {
                const infoSinger:Singer|null = await Singer.findOne({
                    _id: song.singerId,
                    deleted: false,
                    status: "active"
                }).select("-deleted")
                
                song.infoSinger = infoSinger;
            }
            
            res.render("client/pages/songs/list", {
                pageTitle: topic.title,
                songs: songs
            });
        }
    } catch (error) {
        res.redirect("/");
    }
}