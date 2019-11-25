from werkzeug.security import generate_password_hash

from not_ig.extensions import db


def insert_users(users):
    from models.user import User

    queries = []
    for index, user in enumerate(users):
        new_user = User(
            id=user['id'],
            username=user['username'],
            profile_image=user['profileImage'],
            email=f'something{index}@mail.com',
            password=generate_password_hash('12345678')
        )
        queries.append(new_user)

    return queries


def insert_images(images):
    from models.image import Image

    queries = []
    for index, img in enumerate(images):
        new_img = Image(
            path=img,
            user_id=index+1)
        queries.append(new_img)

    return queries


def run():
    user_queries = insert_users(users)
    image_queries = insert_images(images)

    db.session.add_all(user_queries + image_queries)
    db.session.commit()


users = [
    {
        "id": 1,
        "username": "blake",
        "profileImage": "http://next-curriculum-instagram.s3.amazonaws.com/idol2-blake.jpg"
    },
    {
        "id": 2,
        "username": "ryanG",
        "profileImage": "http://next-curriculum-instagram.s3.amazonaws.com/idol1-ryan.jpg"
    },
    {
        "id": 3,
        "username": "bigfan",
        "profileImage": "http://next-curriculum-instagram.s3.amazonaws.com/bigfan-9AE7468E-4C35-41D1-AA68-31939891B5E1.png"
    }
]


images = [
    "http://next-curriculum-instagram.s3.amazonaws.com/1-paris2.jpeg",
    "http://next-curriculum-instagram.s3.amazonaws.com/1-paris3.jpeg",
    "http://next-curriculum-instagram.s3.amazonaws.com/1-paris4.jpg"]
