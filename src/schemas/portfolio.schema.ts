import mongoose, { Document, Schema } from 'mongoose';

const PortfolioSchema: Schema = new Schema({
    check: [{
        type: Schema.Types.ObjectId,
        ref: 'CheckStatus',
        unique: true,
        index: true,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        index: true,
    },
});

export default mongoose.model('Portfolio', PortfolioSchema);
