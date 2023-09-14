from app.api.v1.articles.models import Article
from app.api.v1.articles.schemas import ArticleCreate, ArticleInDB


async def article_exists(article_id: int) -> bool:

    return await Article.filter(id=article_id).exists()


async def get_all_articles(skip: int = 0, limit: int = 10):

    articles = await Article.all().offset(skip * limit).limit(limit)

    total = await Article.all().count()
    return articles, total


async def get_article_by_id(article_id: int):

    return await Article.get(id=article_id)


async def create_article(article: ArticleCreate):

    return await Article.create(**article.dict())


async def update_article(article: ArticleInDB):

    db_article = await Article.get(id=article.id)
    for field, value in article.dict().items():
        setattr(db_article, field, value)
    await db_article.save()
    return db_article


async def delete_article(article_id: int):

    await Article.filter(id=article_id).delete()