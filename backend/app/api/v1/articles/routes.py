from fastapi import Query, Depends, APIRouter


router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("/")
async def list_articles():

    return {}


@router.get("/{article_id}",)
async def retrieve_article():

    return {}


@router.post("/")
async def create_new_article():

    return {}


@router.put("/{article_id}")
async def update_existing_article():

    return {}


@router.delete("/{article_id}")
async def remove_article():

    return {}
