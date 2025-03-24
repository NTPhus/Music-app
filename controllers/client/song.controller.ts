import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavouriteSong from "../../models/favourite-song.model";
import TopicInterface from "../../interfaces/topic.interface";
import SingerInterface from "../../interfaces/singer.interface";
import SongInterface from "../../interfaces/song.interface";


//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    try {
        const topic:TopicInterface | null = await Topic.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        })
    
        if(topic){
            const songs: SongInterface[] | null = await Song.find({
                topicId: topic.id,
                status: "active",
                deleted: false
            }).select("avatar title slug singerId like");

            for (const song of songs) {
                const infoSinger:SingerInterface|null = await Singer.findOne({
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

    const song:SongInterface|null = await Song.findOne({
        status: "active",
        slug: slugSong,
        deleted: false
    });

    const singer:SingerInterface|null = await Singer.findOne({
        _id: song?.singerId,
        deleted: false,
    }).select("fullName");

    const topic:TopicInterface|null = await Topic.findOne({
        _id: song?.topicId,
        deleted: false,
    });

    const favouriteSong = await FavouriteSong.findOne({
        songId: song?.id
    });

    if(song)
        song.isFavouriteSong = favouriteSong ? true: false;

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

    const song:SongInterface|null = await Song.findOne({
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

//[PATCH] /favourite/:typeFavourite/:idSong
export const favourite = async (req: Request, res: Response) => {
    const idSong:string = req.params.idSong;
    const typeFavourite:string = req.params.typeFavourite;

    switch(typeFavourite){
        case "favourite":
            const exisiFavouriteSong = await FavouriteSong.findOne({
                songId: idSong
            });
            if(!exisiFavouriteSong){
                const record = new FavouriteSong({
                    // userId: "",
                    songId: idSong
                });
                await record.save();
            }
            break;
        case "unfavourite":
            await FavouriteSong.deleteOne({
                songId: idSong
            });
            break;
        default:

            break;
    }

    res.json({
        code: 200,
        message: "Thành công"
    })
}

//[PATCH] /listem/:idSong
export const listen = async (req:Request, res:Response) => {
    const idSong:string = req.params.idSong;

    const song:SongInterface|null = await Song.findOne({
        _id: idSong
    });

    if(song){
        const listen: number = song?.listen + 1;

        await Song.updateOne({
            _id: idSong
        }, {
            listen: listen
        })

        const songNew:SongInterface|null = await Song.findOne({
            _id: idSong
        })

        res.json({
            code: 200,
            message: "Thành công",
            listen: songNew?.listen
        })

        
    }else{
        res.json({
            code: 400,
            message: "Không thành công"
        })
    }
}