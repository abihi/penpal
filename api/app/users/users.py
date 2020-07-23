from app import app
from flask_restful import reqparse, Resource, Api

api = Api(app)
parser = reqparse.RequestParser()

class Users(Resource):
    #def get(self):
        # get all users from db

    def post(self):
        parser.add_argument('username', type=str, location='form')
        parser.add_argument('email', type=str, location='form')
        parser.add_argument('password', type=str, location='form')

api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(debug=True)