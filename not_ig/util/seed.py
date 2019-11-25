from werkzeug.security import generate_password_hash

# from models.image import Image
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

    db.session.add_all(queries)
    db.session.commit()


def run():
    insert_users(
        [
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
    )
