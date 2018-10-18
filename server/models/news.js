const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var singleNewsSchema = new Schema({
    mediaType: {
        type: String,
        required: true,
        default: "news",
        trim: true
    },
    sourceId: {
        type: String
    },
    sourceName: {
        type: String
    },
    author: {
        type: String
    },
    title:{
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    urlToImage: {
        type: String
    },
    publishedAt: {
        type: Date
    },
    content: {
        type: String
    }
});

var newsShema = new Schema({
    topUsNews: [singleNewsSchema],
    topCnNews: [singleNewsSchema],
    topInNews: [singleNewsSchema],
    topCaNews: [singleNewsSchema],
    topGeneralNews: [singleNewsSchema],
    topTechNews: [singleNewsSchema],
    topBusNews: [singleNewsSchema],
    topSportNews: [singleNewsSchema],
    topEntertainmentNews: [singleNewsSchema],
    topScienceNews: [singleNewsSchema],
    trumpNews: [singleNewsSchema],
    chinaNews: [singleNewsSchema]
});


var News = mongoose.model('News', newsShema);

module.exports = {News};