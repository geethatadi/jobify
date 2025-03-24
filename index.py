# Databases import 
from database.redshift_client_helper import RedshiftClient

# Utils import
from utils.response import ResponseBuilder

# Models import
from models.post import Post
from models.user import User
from models.likes import Likes
from models.comments import Comments

#Constants Import
from constants.api_configs import APIConfigs

# library imports
import json

# Database objects
redshift_client = RedshiftClient()

# Utility Objects
response_builder = ResponseBuilder()

# Model objects
post = Post(redshift_client, response_builder)
user = User(redshift_client, response_builder)
likes = Likes(redshift_client)
comments = Comments(redshift_client, response_builder)

def lambda_handler(event, context):
    path = event["path"]
    body = event["body"]
    queryStringParameters = event["queryStringParameters"]

    if path == APIConfigs.CREATE_POST:
        response = post.create_post(json.loads(event["body"]))
    
    if path == APIConfigs.UPDATE_POST:
        response = post.update_post(json.loads(event["body"]))

    if path == APIConfigs.ADD_COMMENT_TO_POST:
        response = post.add_comment_to_post(json.loads(event["body"]))

    if path == APIConfigs.GET_COMMENTS_FOR_POST:
        response = comments.get_comments_for_post(queryStringParameters)

    if path == APIConfigs.DELETE_COMMENT:
        response = post.delete_comment(queryStringParameters)
    
    if path == APIConfigs.LIKE_POST:
        response = post.like_post(queryStringParameters)
    
    if path == APIConfigs.DISLIKE_POST:
        response = post.dislike_post(queryStringParameters)

    if path == APIConfigs.DELETE_POST:
        response = post.delete_post(queryStringParameters)
    
    if path == APIConfigs.GET_SINGLE_POST:
        response = post.get_single_post(queryStringParameters)

    if path == APIConfigs.GET_ALL_POSTS:
        response = post.get_all_posts()

    if path == APIConfigs.GET_USER_INTERESTED_POSTS:
        user_interests = user.get_user_interests(queryStringParameters)
        response = post.get_user_interested_posts(queryStringParameters, user_interests)

    if path == APIConfigs.GET_POSTS_BY_COMPANY_NAME:
        response = post.get_posts_by_company_name(queryStringParameters)

    if path == APIConfigs.GET_ALL_COMPANY_NAMES:
        response = post.get_all_company_names()

    if path == APIConfigs.CREATE_USER:
        response = user.create_user(json.loads(event["body"]))
    
    if path == APIConfigs.GET_USER:
        response = response_builder.build_response(200, {
            "user_data": user.get_user(queryStringParameters),
            "user_posts": post.get_posts_by_user(queryStringParameters)
        })

    if path == APIConfigs.ADD_TO_USER_INTERESTS:
        response = user.add_to_user_interests(json.loads(event["body"]))

    if path == APIConfigs.IS_AUTHENTICATED:
        response = user.is_user_authenticated(queryStringParameters)

    if path == APIConfigs.UPDATE_USER:
        response = user.update_user(json.loads(event["body"]))

    if path == APIConfigs.LOGIN:
        response = user.login(json.loads(event["body"]))

    if path == APIConfigs.LOGOUT:
        response = user.logout(queryStringParameters)

    return response    
