import dbConnect from '../../../db/db'
import Items from '../../../models/Items'

export default async function handler(req, res) {
    const { 
        method,
        query: { id }
     } = req;

    dbConnect()

    if (method === 'GET') {
        try {
            const item = await Items.findById(id);
            res.status(200).json(item)    
        } catch(err) {
            res.status(500).json(err)
        }
    	
    }
    if (method === 'PUT') {
        try {
            const item = await Items.findByIdAndUpdate(id, req.body, {
            new: true
          })
          res.status(200).json(item)    
        } catch(err) {
            res.status(500).json(err)
        }
    	
    }
    if (method === 'DELETE') {
        try {
            await Items.findByIdAndDelete(id)
            res.status(200).json('item deleted successfully.') 
        } catch(err) {
            res.status(500).json(err)
        }
        
    }
}
