import { ObjectId } from "mongoose";

interface SingerInterface{
    _id: ObjectId,
    fullName: string,
    avatar: string,
    status: string,
    slug: string,
}

export default SingerInterface;