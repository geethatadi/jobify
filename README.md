# serverless-app

### API DEFINITIONS

API = https://kxk775by94.execute-api.us-west-2.amazonaws.com

STAGE = testing

## Resources

* CREATE POST 
 ```
   API: "/posts/create_post"
   Type: POST
   Params: post_id, author, role, company_name, post_description, package
 ```

*  UPDATE POST 
  
  ``` 
  API: "/posts/update_post"
  Type: POST
  Params: {post_id, <params to be updated> }
  ```
*  ADD COMMENT TO POST 
  ```
  API: "/posts/add_comment_to_post"
     Type: POST
  Params: post_id, comment, author
  ```
  
*  GET COMMENTS FOR POST 
  ```
  API: "/posts/get_comments_for_post"
  Type: GET
  Params: post_id
  ```
  
*  DELETE COMMENT 
   ``` 
   API: "/posts/delete_comment"
   Type: GET
   Params: post_id, comment_id
   ```
*  LIKE POST 
 ```
 API: "/posts/like_post"
 Type: GET
 Params: post_id, user_name
 ```
 
*  DISLIKE POST 
  ```
  API: "/posts/dislike_post"
  Type: GET
  Params: post_id, user_id
  ```
*  DELETE POST
   ```
   API = "/posts/delete_post"
   Type: GET
   Params: post_id
   ```
*  GET SINGLE POST 
  ```
  API = "/posts/get_single_post"
  Type: GET
  Params: post_id
  ```
*  GET ALL POSTS 
    ```
    API: "/posts/get_all_posts"
    Type: GET
    Params: 
       ```
*  GET USER INTERESTED POSTS
     ```
     API: "/posts/get_user_interested_posts"
     Type: GET
     Params: user_name
     ```
     
*  GET POSTS BY COMPANY NAME
     ```
     API: "/posts/get_posts_by_company_name"
     Type: GET
     QueryParams: company_name
     ```
*  GET_ALL_COMPANY_NAMES:
   ```
   API: "/posts/get_all_company_names"
   Type: GET
   ```

*  CREATE_USER
    ```
    API: "/users/create_user"
       Type: POST
    Params: user_name, "email", "roll_no", "current_company", "password"
    ```
*  GET_USER 
   ```
   API: "/users/get_user"
   Type: GET
   QueryParams: user_name
    ```
*  IS_AUTHENTICATED 
    ```
    API: "/users/is_authenticated"
    Type: GET
    QueryParams: user_name
    ```
*  UPDATE_USER 
    ```
    API: "/users/update_user"
       Type: POST
    Params: user_name, <fields to be updated>
    
*  ADD_TO_USER_INTERESTS
  ```
  API: "/users/add_to_user_interests"
  Type: POST
  Params: company_name
  ```

*  LOGIN 
   ```
   API: "/login"
   Type: GET,
   Params: user_name, password
   ```
   
*  LOGOUT
    ```
    API: "/logout"
    Type: GET
    QueryParams: user_name
    ```

