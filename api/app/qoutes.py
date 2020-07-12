from app import app
from flask_restful import Resource, Api

api = Api(app)

class Quotes(Resource):
    def get(self):
        return {
            'William Shakespeare': {
                'quote': ['Love all,trust a few,do wrong to none',
                'Some are born great, some achieve greatness, and some greatness thrust upon them.']
        },
        'Linus': {
            'quote': ['Talk is cheap. Show me the code.']
            }
        }

api.add_resource(Quotes, '/qoutes')

if __name__ == '__main__':
    app.run(debug=True)