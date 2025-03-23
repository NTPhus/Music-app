import { ObjectId } from "mongoose";

interface TopicInterface {
    id: ObjectId,
    title: string,
    avatar: string,
    description: string,
    status: string,
    slug: string,
    deleted: boolean,
}

export default TopicInterface;