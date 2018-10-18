const router = require('express').Router();
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');
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
        language: 'en',
        category: 'general'
    },
    topTechNews: {
        language: 'en',
        category: 'technology'
    },
    topBusNews: {
        language: 'en',
        category: 'business'
    },
    topSportNews: {
        language: 'en',
        category: 'sports'
    },
    topEntertainmentNews: {
        language: 'en',
        category: 'entertainment'
    },
    topScienceNews: {
        language: 'en',
        category: 'science'
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
            console.error("Error getting and saving news");

        })

});

module.exports = router;