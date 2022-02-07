const FolderModel = require('../models/Folder')

class FodelControllers {

    async getFolders(id) {
        try {
            const folders = await FolderModel.find({ownerId: id})
            return folders 
        } catch(e) {
            throw new Error(`there was an error getting folder of user ${id}`, e)
        }
    }

    async getFolder(id) {
        try {
            const folder = await FolderModel.findById(id)
            return folder
        } catch(e) {
            throw new Error(`there was an error getting the folder ${id}`, e)
        }
    }
    
    async searchFolder(search) {
        try {

            const folders = await FolderModel.find({ $or: [
                { title: { $regex: `.*${search}.*` } },
                { description: { $regex: `.*${search}.*` } }
            ]})
            return folders

        } catch(e) {
            throw new Error(``, e)
        }
    }

    async createFolder(data) {
        try {
            const folder = new FolderModel({
                ...data
            })
            const createdFolder = await folder.save()
            return createdFolder            

        } catch(e) {
            throw new Error(`there was an error creating the folder`, e)
        }
    }

    async updateFolder({id, data}) {
        try {
            const updatedData = await FolderModel.findOneAndUpdate(
                { _id: id },
                { $set: {...data} }
            )
            console.log("*** folder updated ***", updatedData)
            return updatedData
        } catch(e) {
            throw new Error(`there was an error updating the folder: ${id}`, e)
        }
    }

    async deleteFolder(id) {
        try {
            const deleteFolder = await FolderModel.deleteOnde({_id: id})
            return deleteFolder
        } catch(e) {
            throw new Error(`there was an erro deleting the folder: ${id}`, e)
        }
    }
}

const folderController = new FodelControllers()
module.export = folderController
