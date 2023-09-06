import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
    if(!file) return;

    const fileUploaded = await storage.createFile(
        "64f4194cd176c24c1d5a",
        ID.unique(),
        file
    );

    return fileUploaded;
};

export default uploadImage;