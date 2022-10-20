import dbConnect from '../../../db/db'
import Items from '../../../models/Items'

export default async function handler(req, res) {
    const { method } = req;

    dbConnect()

    if (method === 'GET') {
        try {
            const items = await Items.find()
            res.status(200).json(items)
        } catch(err) {
            res.status(500).json(err)
        }
    	
    }
    if (method === 'POST') {
        try {
            const item = await Items.create(req.body)
            res.status(200).json(item)
        } catch(err) {
            res.status(500).json(err)
        }    	
    }  
}
