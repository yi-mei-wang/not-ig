import os

import boto3
import botocore
from flask import current_app


class ImageUploader:
    def __init__(self, img):
        self.s3_client = None
        self.img = img
        self.path = None
        self.errors = []

    def run(self):
        self._check_file()
        self._set_up_client()
        self._upload_to_s3()

        return (self.path, self.errors)

    def _check_file(self):
        if not self.img or not self.img.filename:
            self.errors.append('Please select a file')

        elif not '.' in self.img.filename and \
            self.img.filename.rsplit('.', 1)[1].lower() in [
                'png', 'jpg', 'jpeg', 'gif']:
            self.errors.append("Invalid file type")

    def _set_up_client(self):
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=current_app.config.get('S3_KEY'),
            aws_secret_access_key=current_app.config.get('S3_SECRET')
        )

    def _upload_to_s3(self, acl="public-read"):
        try:
            self.s3_client.upload_fileobj(
                self.img,
                current_app.config.get('S3_BUCKET'),
                self.img.filename,
                ExtraArgs={
                    "ACL": acl,
                    "ContentType": self.img.content_type
                }
            )

            self.path = self.img.filename

        except Exception as e:
            self.errors.append(e)
