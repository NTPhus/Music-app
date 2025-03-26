"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favourite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favourite_song_model_1 = __importDefault(require("../../models/favourite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        });
        if (topic) {
            const songs = yield song_model_1.default.find({
                topicId: topic.id,
                status: "active",
                deleted: false
            }).select("avatar title slug singerId like");
            for (const song of songs) {
                const infoSinger = yield singer_model_1.default.findOne({
                    _id: song.singerId,
                    deleted: false,
                    status: "active"
                }).select("-deleted");
                song.infoSinger = infoSinger;
            }
            res.render("client/pages/songs/list", {
                pageTitle: topic.title,
                songs: songs
            });
        }
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        status: "active",
        slug: slugSong,
        deleted: false
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song === null || song === void 0 ? void 0 : song.singerId,
        deleted: false,
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song === null || song === void 0 ? void 0 : song.topicId,
        deleted: false,
    });
    const favouriteSong = yield favourite_song_model_1.default.findOne({
        songId: song === null || song === void 0 ? void 0 : song.id
    });
    if (song)
        song.isFavouriteSong = favouriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    if (song) {
        const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            like: newLike
        });
        res.json({
            code: 200,
            message: "thành công",
            like: newLike
        });
    }
    else {
        res.json({
            code: 400,
            message: "Không thành công"
        });
    }
});
exports.like = like;
const favourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavourite = req.params.typeFavourite;
    switch (typeFavourite) {
        case "favourite":
            const exisiFavouriteSong = yield favourite_song_model_1.default.findOne({
                songId: idSong
            });
            if (!exisiFavouriteSong) {
                const record = new favourite_song_model_1.default({
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "unfavourite":
            yield favourite_song_model_1.default.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thành công"
    });
});
exports.favourite = favourite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    });
    if (song) {
        const listen = (song === null || song === void 0 ? void 0 : song.listen) + 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            listen: listen
        });
        const songNew = yield song_model_1.default.findOne({
            _id: idSong
        });
        res.json({
            code: 200,
            message: "Thành công",
            listen: songNew === null || songNew === void 0 ? void 0 : songNew.listen
        });
    }
    else {
        res.json({
            code: 400,
            message: "Không thành công"
        });
    }
});
exports.listen = listen;
