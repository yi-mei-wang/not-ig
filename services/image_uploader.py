import os

import boto3
import botocore
from flask import current_app


class ImageUploader(img):
    def __init__(self, img):
        self.s3_client = None
        self.img = img
        self.errors = []

    def run(self):
        self._check_file(self)
        self._set_up_client(self)

    def _check_file(self):
        if not self.img or not self.img.filename:
            self.errors.append('Please select a file')

        elif not '.' in self.img.filename and \
            self.img.filename.rsplit('.', 1)[1].lower() in [
                'png', 'jpg', 'jpeg', 'gif']:
            self.errors.append("Invalid file type")

    def _set_up_client(self):
        if self.errors:
            raise

        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=current_app.config.S3_KEY,
            aws_secret_access_key=current_app.config.S3_SECRET
        )
