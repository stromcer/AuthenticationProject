"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api', __name__)


@api.route('/singup', methods=['POST'])
def new_user():
    user_data = request.json

    temp_data = User(
        email = user_data["email"],
        password = user_data["password"],
        is_active = user_data["is_active"]
    )

    db.session.add(temp_data)
    db.session.commit()
    return jsonify({"msg":"user succesfully created with email " + user_data["email"]})


@api.route('/login', methods=['POST'])
def get_token():
    new_body = request.json

    try:
        target_mail = new_body["email"]
        validation = User.query.filter_by(email=target_mail).first()
        
        if validation.checkPassword() != new_body["password"] :
            return jsonify({"msg":"Password is incorrect"})
            
        access_token = create_access_token(identity=validation.serialize(), expires_delta=False )
        return jsonify(access_token)
    except:
        return jsonify("Not Correct")


@api.route('/private', methods=['GET'])
@jwt_required()
def get_private():
    token = get_jwt_identity()
    identity = User.query.get_or_404(token["id"])
    print(token)
    return identity.serialize()