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
    topicId: string,
    description: string,
    lyrics: string,
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

//[GET] /songs/detai/:slugSong
export const detail = async (req: Request, res: Response) => {
    const slugSong = req.params.slugSong;

    const song:Song|null = await Song.findOne({
        status: "active",
        slug: slugSong,
        deleted: false
    });

    const singer:Singer|null = await Singer.findOne({
        _id: song?.singerId,
        deleted: false,
    }).select("fullName");

    const topic:Topic|null = await Topic.findOne({
        _id: song?.topicId,
        deleted: false,
    });

    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    })
}

//[PATCH] /like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    const idSong:string = req.params.idSong;
    const typeLike:string = req.params.typeLike;

    const song:Song|null = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });

    if(song){
        const newLike:number = typeLike == "like" ? song.like + 1 : song.like - 1;

        await Song.updateOne({
            _id: idSong
        },{
            like: newLike
        })
        res.json({
            code: 200,
            message: "thành công",
            like: newLike
        });
    }else{
        res.json({
            code: 400,
            message: "Không thành công"
        });
    }
}