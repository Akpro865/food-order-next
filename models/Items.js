import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 60
	},
	desc: {
		type: String,
		required: true,
		maxlength: 100
	},
	img: {
		type: String,
		required: true,
	},
	prices: {
		type: [Number],
		required: true
	},
	extras: {
		type: [
			{
				text: {type: String, required: true},
				price: {type: Number, required: true},
			}
		]
	}
}, {
	timestamps: true
})

export default mongoose.models.Items || mongoose.model("Items", ItemSchema)