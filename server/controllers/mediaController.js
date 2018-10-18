const router = require('express').Router();
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('163856c44aa64be5af7b7b54f0f15ada');

var {mongoose} = require('./../db/mongoose');
var {News} = require('./../models/news');

const newsTypes = {
    topUsNews: {
        language: 'en',
        country: 'us'
    },
    topCnNews: {
        country: 'cn'
    },
    topInNews: {
        language: 'en',
        country: 'in'
    },
    topCaNews: {
        language: 'en',
        country: 'ca'
    },
    topGeneralNews: {
        sources: 'abc-news,al-jazeera-english,associated-press,axios,bbc-news,breitbart-news,cbc-news,cbs-news,cnn,fox-news,independent,metro,msnbc,national-review,nbc-news,news24,reuters,time',
        language: 'en'
    },
    topTechNews: {
        sources: 'ars-technica,crypto-coins-news,engadget,hacker-news,recode,techcrunch,techcrunch-cn,techradar,the-next-web,the-verge,wired',
        language: 'en'
    },
    topBusNews: {
        sources: 'bloomberg,business-insider,cnbc,financial-times,fortune,the-economist,the-wall-street-journal',
        language: 'en'
    },
    topGamingNews: {
        sources: 'ign,polygon',
        language: 'en'
    },
    topSportNews: {
        sources: 'bbc-sport,espn,fox-sports,four-four-two,nfl-news,nhl-news,talksport,the-sport-bible',
        language: 'en'
    },
    topEntertainmentNews: {
        sources: 'buzzfeed,daily-mail,entertainment-weekly,mashable,mtv-news,the-lad-bible',
        language: 'en'
    },
    topScienceNews: {
        sources: 'national-geographic,new-scientist,next-big-future',
        language: 'en'
    },
    trumpNews: {
        q: 'trump',
        language: 'en'
    },
    chinaNews: {
        q: 'china',
        language: 'en'
    }
};



const getNews = () => {
    let promiseArr = Object.keys(newsTypes).map((key) => {
        return newsapi.v2.topHeadlines(newsTypes[key])
            .then((data) => {
                if(data.status === 'ok') {
                    let articles = data.articles.map((article) => {
                        return {
                            sourceId: article.source.id,
                            sourceName: article.source.name,
                            author: article.author,
                            description: article.description,
                            title: article.title,
                            url: article.url,
                            urlToImage: article.urlToImage,
                            publishedAt: new Date(article.publishedAt),
                            content: article.content
                        }
                    });
                    return {
                        key,
                        articles
                    };
                } else {
                    console.error("Error retrieving news " + key);
                }
            });
    });

    return Promise.all(promiseArr);
};

router.post('/news', (req, res) => {
    getNews()
        .then((sources) => {
            let sourcesObj = {};
            for (source of sources) {
                sourcesObj[source['key']] = source['articles'];
            }
            return sourcesObj;
        })
        .then((sourcesObj) => {
            let news = new News(sourcesObj);
            news.save()
                .then(() => {
                    res.status(201).send(JSON.stringify({status: 1}));
                });
        })
        .catch(e => {
            console.error("Error getting and saving news " + e);
            res.status(417).send({status: 0, error: e});
        });
});

router.get('/news', (req, res) => {
    let queryParameter = req.query.s;
    if(Object.keys(newsTypes).includes(queryParameter)) {
        News.find({})
            .then((docs) => {
                return docs.map((doc) => {
                    return doc[queryParameter]
                });
            })
            .then((docsArr) => {
                res.status(200).send({status: 1, articles: docsArr});
            })
            .catch(e => {
                console.error(e);
                res.status(417).send({status: 0, error: e});
            });
    } else {
        console.log("Invalid query parameter");
        res.status(404).send({status: 0, error: "Invalid query parameter"});
    }
})

module.exports = router;